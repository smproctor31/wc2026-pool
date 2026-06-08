import { supabase, isConfigured } from './supabase.js'
import { ALL_TEAMS, STORAGE_KEY, SCHEDULE } from './data.js'

export const INITIAL_STATE = {
  phase: "setup",
  players: [],
  draftBaseOrder: [0, 1, 2, 3],
  currentRound: 0,
  currentPickInRound: 0,
  picks: {},
  teamStatus: {},
  matchResults: {},   // { matchNum: { winner, loser, draw, date } }
  poolId: null,
}

// ── Local storage ─────────────────────────────────────────────────────────────
export function loadLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function saveLocal(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch {}
}

export function clearLocal() {
  try { localStorage.removeItem(STORAGE_KEY) } catch {}
}

// ── Supabase helpers ──────────────────────────────────────────────────────────
export async function loadFromSupabase(poolId) {
  if (!isConfigured() || !poolId) return null
  try {
    const { data, error } = await supabase
      .from('pools').select('state').eq('id', poolId).single()
    if (error) return null
    return data?.state || null
  } catch { return null }
}

export async function saveToSupabase(poolId, state) {
  if (!isConfigured() || !poolId) return false
  try {
    const { error } = await supabase
      .from('pools').upsert({ id: poolId, state, updated_at: new Date().toISOString() })
    return !error
  } catch { return false }
}

export async function createPool(state) {
  if (!isConfigured()) return null
  try {
    const poolId = crypto.randomUUID()
    const { error } = await supabase
      .from('pools').insert({ id: poolId, state, updated_at: new Date().toISOString() })
    if (error) return null
    return poolId
  } catch { return null }
}

export function subscribeToPool(poolId, callback) {
  if (!isConfigured() || !poolId) return null
  return supabase
    .channel(`pool-${poolId}`)
    .on('postgres_changes', {
      event: 'UPDATE', schema: 'public', table: 'pools',
      filter: `id=eq.${poolId}`,
    }, payload => { if (payload.new?.state) callback(payload.new.state) })
    .subscribe()
}

// ── Draft helpers ─────────────────────────────────────────────────────────────
export function getDraftOrderForRound(baseOrder, roundIndex) {
  const shift = roundIndex % 4
  return [...baseOrder.slice(shift), ...baseOrder.slice(0, shift)]
}

export function getTeamsForDraftRound(roundIndex) {
  const start = roundIndex * 4
  return ALL_TEAMS.slice(start, start + 4)
}

export function getCurrentPickerIndex(state) {
  const order = getDraftOrderForRound(state.draftBaseOrder, state.currentRound)
  return order[state.currentPickInRound]
}

// ── Determine if a match is in the group stage ────────────────────────────────
function isGroupStageMatch(matchNum) {
  const match = SCHEDULE.find(m => m.matchNum === matchNum)
  return match?.stage?.startsWith('Group') || false
}

// ── State transitions ─────────────────────────────────────────────────────────
export function applyStartDraft(playerNames, colors) {
  return {
    ...INITIAL_STATE,
    phase: "draft",
    players: playerNames.map((name, i) => ({ id: i, name: name.trim(), color: colors[i] })),
    draftBaseOrder: [0, 1, 2, 3],
    currentRound: 0,
    currentPickInRound: 0,
    picks: {},
    teamStatus: Object.fromEntries(ALL_TEAMS.map(t => [t.id, "active"])),
    matchResults: {},
  }
}

export function applyPickTeam(prev, teamId) {
  const next = { ...prev, picks: { ...prev.picks, [teamId]: getCurrentPickerIndex(prev) } }
  let nextPickInRound = prev.currentPickInRound + 1
  let nextRound = prev.currentRound
  if (nextPickInRound >= 4) { nextPickInRound = 0; nextRound++ }
  if (nextRound >= 13) {
    next.phase = "tournament"
    next.currentRound = 13
    next.currentPickInRound = 0
  } else {
    next.currentRound = nextRound
    next.currentPickInRound = nextPickInRound
  }
  return next
}

export function applyMatchResult(prev, matchNum, winnerName, loserName, isDraw = false) {
  const winnerTeam = ALL_TEAMS.find(t => t.name === winnerName)
  const loserTeam  = ALL_TEAMS.find(t => t.name === loserName)
  const isGroup    = isGroupStageMatch(matchNum)
  const isFinal    = matchNum === 104

  const next = {
    ...prev,
    matchResults: {
      ...prev.matchResults,
      [matchNum]: {
        winner: winnerName,
        loser: loserName,
        draw: isDraw,
        date: new Date().toLocaleDateString()
      }
    },
    teamStatus: { ...prev.teamStatus },
  }

  // Only eliminate teams in knockout rounds (not group stage)
  if (!isGroup && !isDraw) {
    if (loserTeam) next.teamStatus[loserTeam.id] = "eliminated"
  }

  if (winnerTeam && isFinal) {
    next.teamStatus[winnerTeam.id] = "champion"
    next.phase = "complete"
  }

  return next
}

export function applyUndoMatch(prev, matchNum) {
  const result = prev.matchResults[matchNum]
  if (!result) return prev

  const loserTeam  = ALL_TEAMS.find(t => t.name === result.loser)
  const winnerTeam = ALL_TEAMS.find(t => t.name === result.winner)
  const isGroup    = isGroupStageMatch(matchNum)
  const isFinal    = matchNum === 104

  const newResults = { ...prev.matchResults }
  delete newResults[matchNum]

  return {
    ...prev,
    matchResults: newResults,
    phase: isFinal ? "tournament" : prev.phase,
    teamStatus: {
      ...prev.teamStatus,
      // Only restore active status if it was a knockout match
      ...(!isGroup && loserTeam  ? { [loserTeam.id]:  "active" } : {}),
      ...(winnerTeam && isFinal  ? { [winnerTeam.id]: "active" } : {}),
    }
  }
}

// ── Group stage stats helpers ─────────────────────────────────────────────────

// Returns { teamName: { w, d, l, gf, ga, pts } } for a given group
export function getGroupStandings(group, matchResults) {
  const groupMatches = SCHEDULE.filter(m => m.stage === `Group ${group}` && m.team1 !== 'TBD')
  const stats = {}

  // Init all teams in group
  groupMatches.forEach(m => {
    if (!stats[m.team1]) stats[m.team1] = { w: 0, d: 0, l: 0, pts: 0, played: 0 }
    if (!stats[m.team2]) stats[m.team2] = { w: 0, d: 0, l: 0, pts: 0, played: 0 }
  })

  // Apply results
  groupMatches.forEach(m => {
    const result = matchResults[m.matchNum]
    if (!result) return

    stats[m.team1].played++
    stats[m.team2].played++

    if (result.draw) {
      stats[m.team1].d++; stats[m.team1].pts += 1
      stats[m.team2].d++; stats[m.team2].pts += 1
    } else {
      stats[result.winner].w++; stats[result.winner].pts += 3
      stats[result.loser].l++
    }
  })

  // Sort: pts desc, then wins desc
  return Object.entries(stats)
    .sort((a, b) => b[1].pts - a[1].pts || b[1].w - a[1].w)
    .map(([name, s]) => ({ name, ...s }))
}

// ── Query helpers ─────────────────────────────────────────────────────────────
export function getPlayerTeams(picks, playerId) {
  return ALL_TEAMS.filter(t => picks[t.id] === playerId)
}

export function getPlayerActiveTeams(picks, teamStatus, playerId) {
  return getPlayerTeams(picks, playerId).filter(t => teamStatus[t.id] === "active")
}

export function getPlayerChampion(picks, teamStatus, playerId) {
  return getPlayerTeams(picks, playerId).find(t => teamStatus[t.id] === "champion")
}

export function getTournamentWinner(picks, teamStatus, players) {
  const champTeam = ALL_TEAMS.find(t => teamStatus[t.id] === "champion")
  if (!champTeam) return null
  const playerId = picks[champTeam.id]
  if (playerId === undefined) return null
  return { player: players[playerId], team: champTeam }
}
