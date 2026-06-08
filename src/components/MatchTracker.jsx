import { useState, useMemo } from 'react'
import { SCHEDULE, ALL_TEAMS } from '../data.js'
import { applyMatchResult, applyUndoMatch } from '../state.js'

// ── PIN Gate ─────────────────────────────────────────────────────────────────
function PinGate({ commissionerPin, onUnlock }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  function handleSubmit() {
    if (pin === commissionerPin) {
      onUnlock()
    } else {
      setError('Incorrect PIN. Try again.')
      setPin('')
    }
  }

  return (
    <div style={pg.banner}>
      <div style={pg.lockIcon}>🔒</div>
      <div style={pg.label}>Commissioner PIN required to enter match results</div>
      <div style={pg.row}>
        <input
          style={{ ...pg.input, ...(error ? pg.inputError : {}) }}
          type="password"
          inputMode="numeric"
          maxLength={4}
          placeholder="PIN"
          value={pin}
          onChange={e => { setPin(e.target.value); setError('') }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          autoFocus
        />
        <button style={pg.btn} onClick={handleSubmit}>Unlock →</button>
      </div>
      {error && <div style={pg.error}>{error}</div>}
      <div style={pg.hint}>
        Other players can view the schedule and standings freely — only the commissioner can enter results.
      </div>
    </div>
  )
}

const pg = {
  banner: { margin: '16px', background: '#ffffff', border: '1px solid #2a3050', borderRadius: 12, padding: '24px 20px', textAlign: 'center' },
  lockIcon: { fontSize: 36, marginBottom: 10 },
  label: { fontSize: 15, color: '#1a3070', marginBottom: 16, fontFamily: "'Barlow Condensed', sans-serif" },
  row: { display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 },
  input: { background: '#f0f4f8', border: '2px solid #2a3050', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 22, textAlign: 'center', letterSpacing: 6, width: 130, outline: 'none' },
  inputError: { borderColor: '#cc2200' },
  btn: { background: '#1a4db5', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontSize: 15, fontFamily: 'inherit', fontWeight: 600 },
  error: { color: '#e63946', fontSize: 13, marginBottom: 6 },
  hint: { fontSize: 12, color: '#9aa5b8', marginTop: 10, maxWidth: 340, margin: '10px auto 0' },
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getUniqueDates(schedule) {
  const dates = [...new Set(schedule.map(m => m.date))]
  return dates.sort()
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function MatchTracker({ state, onUpdate, commissionerPin }) {
  const [unlocked, setUnlocked] = useState(false)
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split('T')[0]
    const dates = getUniqueDates(SCHEDULE)
    return dates.includes(today) ? today : dates[0]
  })
  const [pendingMatch, setPendingMatch] = useState(null)

  const { players, picks, teamStatus, matchResults } = state
  const isLocked = !unlocked

  const allDates = useMemo(() => getUniqueDates(SCHEDULE), [])
  const matchesForDate = useMemo(() =>
    SCHEDULE.filter(m => m.date === selectedDate).sort((a, b) => a.matchNum - b.matchNum),
    [selectedDate]
  )

  const activeTeams = ALL_TEAMS.filter(t => teamStatus[t.id] === 'active')
  const completedCount = Object.keys(matchResults).length

  function getTeamByName(name) {
    return ALL_TEAMS.find(t => t.name === name)
  }

  function getOwner(teamName) {
    const t = getTeamByName(teamName)
    if (!t) return null
    const pid = picks[t.id]
    return pid !== undefined ? players[pid] : null
  }

  const isGroupStage = (stage) => stage?.startsWith('Group')

  function handlePickWinner(match, winnerName) {
    const loserName = winnerName === match.team1 ? match.team2 : match.team1
    onUpdate(applyMatchResult(state, match.matchNum, winnerName, loserName, false))
    setPendingMatch(null)
  }

  function handleDraw(match) {
    // For draws, team1 is stored as "winner" and team2 as "loser" but draw=true
    onUpdate(applyMatchResult(state, match.matchNum, match.team1, match.team2, true))
    setPendingMatch(null)
  }

  function handleUndo(matchNum) {
    onUpdate(applyUndoMatch(state, matchNum))
  }

  function getMatchStatus(match) {
    const result = matchResults[match.matchNum]
    if (result) return { done: true, ...result }
    return { done: false }
  }

  function completedOnDate(date) {
    const matchNums = SCHEDULE.filter(m => m.date === date).map(m => m.matchNum)
    return matchNums.filter(n => matchResults[n]).length
  }

  return (
    <div style={s.page}>

      {/* PIN gate */}
      {isLocked && (
        <PinGate commissionerPin={commissionerPin} onUnlock={() => setUnlocked(true)} />
      )}

      {/* Date bar */}
      <div style={s.dateBar}>
        {allDates.map(date => {
          const done = completedOnDate(date)
          const total = SCHEDULE.filter(m => m.date === date).length
          const isActive = selectedDate === date
          const allDone = done === total
          return (
            <button key={date}
              style={{
                ...s.dateBtn,
                ...(isActive ? s.dateBtnActive : {}),
                ...(allDone && !isActive ? s.dateBtnDone : {}),
              }}
              onClick={() => setSelectedDate(date)}>
              <div style={s.dateBtnDay}>{formatDateShort(date)}</div>
              <div style={s.dateBtnCount}>{done}/{total}</div>
            </button>
          )
        })}
      </div>

      {/* Date header */}
      <div style={s.dateHeader}>
        <span style={s.dateHeaderText}>{formatDate(selectedDate)}</span>
        <span style={s.dateHeaderSub}>
          {matchesForDate.length} match{matchesForDate.length !== 1 ? 'es' : ''} · {completedCount} of 104 total completed
        </span>
      </div>

      {/* Match list */}
      <div style={s.matchList}>
        {matchesForDate.map(match => {
          const status = getMatchStatus(match)
          const isTBD = match.team1 === 'TBD'
          const isPending = pendingMatch?.matchNum === match.matchNum
          const t1 = getTeamByName(match.team1)
          const t2 = getTeamByName(match.team2)
          const owner1 = getOwner(match.team1)
          const owner2 = getOwner(match.team2)

          return (
            <div key={match.matchNum} style={{
              ...s.matchCard,
              ...(status.done ? s.matchCardDone : {}),
              ...(isPending ? s.matchCardPending : {}),
            }}>
              {/* Match header */}
              <div style={s.matchHeader}>
                <span style={s.matchStage}>{match.stage}</span>
                <span style={s.matchTime}>{match.time}</span>
                <span style={s.matchCity}>📍 {match.city}</span>
                <span style={s.matchNum}>#{match.matchNum}</span>
              </div>

              {/* Group stage: two clickable team buttons */}
              {!isTBD ? (
                <div>
                  <div style={s.teamsRow}>
                    <TeamButton
                      team={t1} owner={owner1}
                      isWinner={status.done && !status.draw && status.winner === match.team1}
                      isLoser={status.done && !status.draw && status.loser === match.team1}
                      isDraw={status.done && status.draw}
                      onClick={() => !status.done && !isLocked && handlePickWinner(match, match.team1)}
                      disabled={status.done || isLocked}
                      isLocked={isLocked}
                    />
                    <div style={s.vsCol}>
                      <div style={s.vs}>VS</div>
                      {isGroupStage(match.stage) && !status.done && !isLocked && (
                        <button style={s.drawBtn} onClick={() => handleDraw(match)} title="Record as draw">Draw</button>
                      )}
                      {status.done && !isLocked && (
                        <button style={s.undoBtn} onClick={() => handleUndo(match.matchNum)} title="Undo result">↩</button>
                      )}
                    </div>
                    <TeamButton
                      team={t2} owner={owner2}
                      isWinner={status.done && !status.draw && status.winner === match.team2}
                      isLoser={status.done && !status.draw && status.loser === match.team2}
                      isDraw={status.done && status.draw}
                      onClick={() => !status.done && !isLocked && handlePickWinner(match, match.team2)}
                      disabled={status.done || isLocked}
                      isLocked={isLocked}
                    />
                  </div>
                </div>
              ) : (
                /* Knockout TBD match */
                <div style={s.tbdRow}>
                  <span style={s.tbdLabel}>{match.tbdNote}</span>
                  {!status.done && !isPending && !isLocked && (
                    <button style={s.enterBtn} onClick={() => setPendingMatch(match)}>Enter Result →</button>
                  )}
                  {status.done && (
                    <div style={s.tbdResult}>
                      <span style={{ color: '#4a90d9' }}>✅ {getTeamByName(status.winner)?.flag} {status.winner}</span>
                      <span style={{ color: '#555', margin: '0 6px' }}>beat</span>
                      <span style={{ color: '#555', textDecoration: 'line-through' }}>{getTeamByName(status.loser)?.flag} {status.loser}</span>
                      {!isLocked && (
                        <button style={s.undoBtn} onClick={() => handleUndo(match.matchNum)} title="Undo">↩</button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TBD picker step 1: pick winner */}
              {isPending && !pendingMatch.selectedWinner && (
                <TBDPicker
                  label="Select the winning team:"
                  teams={activeTeams}
                  players={players}
                  picks={picks}
                  onPick={t => setPendingMatch({ ...match, selectedWinner: t.name })}
                  onCancel={() => setPendingMatch(null)}
                />
              )}

              {/* TBD picker step 2: pick loser */}
              {isPending && pendingMatch.selectedWinner && (
                <TBDPicker
                  label={`Winner: ${getTeamByName(pendingMatch.selectedWinner)?.flag} ${pendingMatch.selectedWinner} — Select the team they beat:`}
                  teams={activeTeams.filter(t => t.name !== pendingMatch.selectedWinner)}
                  players={players}
                  picks={picks}
                  onPick={t => {
                    onUpdate(applyMatchResult(state, match.matchNum, pendingMatch.selectedWinner, t.name))
                    setPendingMatch(null)
                  }}
                  onCancel={() => setPendingMatch(null)}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────
function TeamButton({ team, owner, isWinner, isLoser, isDraw, onClick, disabled, isLocked }) {
  if (!team) return <div style={{ flex: 1 }} />
  return (
    <button
      style={{
        ...s.teamBtn,
        ...(isWinner ? s.teamBtnWinner : {}),
        ...(isLoser ? s.teamBtnLoser : {}),
        ...(isDraw ? s.teamBtnDraw : {}),
        ...(disabled && !isWinner && !isLoser && !isDraw ? s.teamBtnDisabled : {}),
        borderColor: owner?.color || '#c8d4e8',
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <div style={s.teamFlag}>{team.flag}</div>
      <div style={s.teamName}>{team.name}</div>
      {owner && <div style={{ ...s.ownerPill, background: owner.color }}>{owner.name}</div>}
      {isWinner && <div style={s.winnerBadge}>✅ Winner</div>}
      {isLoser  && <div style={s.loserBadge}>❌ Out</div>}
      {isDraw   && <div style={s.drawBadge}>🤝 Draw</div>}
      {!disabled && !isLocked && <div style={s.tapHint}>Tap to pick winner</div>}
    </button>
  )
}

function TBDPicker({ label, teams, players, picks, onPick, onCancel }) {
  return (
    <div style={s.tbdPicker}>
      <div style={s.tbdPickerLabel}>{label}</div>
      <div style={s.tbdTeamGrid}>
        {teams.map(t => {
          const owner = players[picks[t.id]]
          return (
            <button key={t.id} style={s.tbdTeamBtn} onClick={() => onPick(t)}>
              <span style={{ fontSize: 20 }}>{t.flag}</span>
              <span style={{ fontSize: 12 }}>{t.name}</span>
              {owner && <span style={{ ...s.ownerPill, background: owner.color }}>{owner.name}</span>}
            </button>
          )
        })}
      </div>
      <button style={s.cancelBtn} onClick={onCancel}>Cancel</button>
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  page: { paddingBottom: 40, background: '#f0f4f8', minHeight: '100%' },

  dateBar: {
    display: 'flex', overflowX: 'auto', gap: 4, padding: '10px 16px',
    background: '#f0f4f8', borderBottom: '1px solid #1a2040',
    position: 'sticky', top: 96, zIndex: 80, scrollbarWidth: 'none',
  },
  dateBtn: {
    flexShrink: 0, background: '#ffffff', border: '1px solid #2a3050',
    borderRadius: 8, color: '#6a7590', padding: '6px 10px', fontSize: 11,
    cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', minWidth: 56,
    transition: 'all 0.1s',
  },
  dateBtnActive: { background: '#ddeeff', borderColor: '#4a90d9', color: '#4a90d9' },
  dateBtnDone: { borderColor: '#c8d8f0', color: '#3a5080' },
  dateBtnDay: { fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 2 },
  dateBtnCount: { fontSize: 10, color: 'inherit' },

  dateHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 16px', flexWrap: 'wrap', gap: 6,
  },
  dateHeaderText: { fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: "'Barlow Condensed', sans-serif" },
  dateHeaderSub: { fontSize: 12, color: '#9aa5b8' },

  matchList: { display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px' },

  matchCard: { background: '#ffffff', border: '1px solid #1a2040', borderRadius: 12, padding: '12px 14px' },
  matchCardDone: { borderColor: '#b8d4f0', background: '#fafcff' },
  matchCardPending: { borderColor: '#1a4db5', boxShadow: '0 0 12px rgba(26,77,181,0.15)' },

  matchHeader: { display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' },
  matchStage: { fontSize: 11, color: '#1a4db5', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 0.5, textTransform: 'uppercase' },
  matchTime: { fontSize: 12, color: '#3a60c0', fontFamily: "'Barlow Condensed', sans-serif" },
  matchCity: { fontSize: 12, color: '#9aa5b8', marginLeft: 'auto' },
  matchNum: { fontSize: 11, color: '#aab5c8' },

  teamsRow: { display: 'flex', alignItems: 'center', gap: 8 },
  teamBtn: {
    flex: 1, background: '#f7f9fc', border: '2px solid', borderRadius: 10,
    padding: '10px 8px', cursor: 'pointer', textAlign: 'center',
    transition: 'all 0.15s', minWidth: 0,
  },
  teamBtnWinner: { background: '#e8f4ff', borderColor: '#1a4db5 !important' },
  teamBtnLoser: { opacity: 0.3, cursor: 'default' },
  teamBtnDisabled: { cursor: 'default' },
  teamFlag: { fontSize: 28, marginBottom: 4, lineHeight: 1 },
  teamName: { fontSize: 13, fontWeight: 600, color: '#1a2050', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 4 },
  tapHint: { fontSize: 10, color: '#aab5c8', marginTop: 4 },
  winnerBadge: { fontSize: 11, color: '#1a4db5', marginTop: 4 },
  loserBadge: { fontSize: 11, color: '#555', marginTop: 4 },

  vsCol: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 },
  vs: { fontSize: 12, color: '#aab5c8', fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif" },
  undoBtn: {
    background: 'transparent', border: '1px solid #2a3050', borderRadius: 4,
    color: '#9aa5b8', fontSize: 13, cursor: 'pointer', padding: '2px 6px',
  },

  ownerPill: {
    display: 'inline-block', borderRadius: 4, padding: '2px 6px',
    fontSize: 10, color: '#fff', fontWeight: 700, marginTop: 3,
  },

  tbdRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 },
  tbdLabel: { fontSize: 13, color: '#7a8599', fontStyle: 'italic' },
  tbdResult: { display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, flexWrap: 'wrap' },
  enterBtn: {
    background: '#eef4ff', border: '1px solid #1a4db5', borderRadius: 6,
    color: '#1a4db5', fontSize: 13, padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit',
  },

  tbdPicker: { marginTop: 12, padding: 12, background: '#f7f9fc', borderRadius: 8 },
  tbdPickerLabel: { fontSize: 13, color: '#4a5580', marginBottom: 10 },
  tbdTeamGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 6, marginBottom: 10 },
  tbdTeamBtn: {
    background: '#ffffff', border: '1px solid #2a3050', borderRadius: 8,
    padding: '8px 6px', cursor: 'pointer', display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 3, transition: 'all 0.1s', fontFamily: 'inherit',
  },
  drawBtn: {
    background: '#eeeeff', border: '1px solid #6a6aaa', borderRadius: 4,
    color: '#aaaaee', fontSize: 11, cursor: 'pointer', padding: '3px 7px',
    fontFamily: 'inherit', marginTop: 2,
  },
  teamBtnDraw: { background: '#eef0ff', opacity: 0.85 },
  drawBadge: { fontSize: 11, color: '#aaaaee', marginTop: 4 },
  cancelBtn: {
    background: 'transparent', border: '1px solid #2a3050', borderRadius: 6,
    color: '#7a8599', fontSize: 13, padding: '5px 12px', cursor: 'pointer', fontFamily: 'inherit',
  },
}
