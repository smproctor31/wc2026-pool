import { ALL_TEAMS } from '../data.js'
import { getPlayerTeams, getPlayerChampion, getTournamentWinner } from '../state.js'

export default function StandingsTab({ state }) {
  const { players, picks, teamStatus } = state
  const winner = getTournamentWinner(picks, teamStatus, players)

  return (
    <div style={s.page}>
      {winner && (
        <div style={s.winnerBanner}>
          🏆 <strong style={{ color: winner.player.color }}>{winner.player.name}</strong> wins the pool! &nbsp;
          {winner.team.flag} <em>{winner.team.name}</em> are World Champions!
        </div>
      )}

      <div style={s.grid}>
        {players.map(p => {
          const myTeams = getPlayerTeams(picks, p.id)
          const champ = getPlayerChampion(picks, teamStatus, p.id)
          const active = myTeams.filter(t => teamStatus[t.id] === 'active')
          const eliminated = myTeams.filter(t => teamStatus[t.id] === 'eliminated')

          return (
            <div key={p.id} style={{ ...s.card, borderColor: p.color }}>
              <div style={{ ...s.cardHeader, background: p.color }}>
                <span style={s.cardName}>{p.name}</span>
                <div style={s.cardStats}>
                  <span style={s.badge}>{active.length} active</span>
                  <span style={{ ...s.badge, opacity: 0.7 }}>{eliminated.length} out</span>
                </div>
              </div>

              {champ && (
                <div style={s.champRow}>
                  🏆 {champ.flag} <strong>{champ.name}</strong> — World Champion!
                </div>
              )}

              <div style={s.teamList}>
                {myTeams.length === 0 ? (
                  <div style={s.empty}>Draft in progress…</div>
                ) : (
                  myTeams.map(t => {
                    const status = teamStatus[t.id]
                    return (
                      <div key={t.id} style={{
                        ...s.teamRow,
                        ...(status === 'eliminated' ? s.rowElim : {}),
                        ...(status === 'champion' ? s.rowChamp : {}),
                      }}>
                        <span style={s.flag}>{t.flag}</span>
                        <span style={s.tName}>{t.name}</span>
                        <span style={s.tGroup}>Grp {t.group || '—'}</span>
                        <span style={s.tRank}>#{t.fifaRank}</span>
                        <span style={s.tStatus}>
                          {status === 'champion'   ? '🏆' :
                           status === 'eliminated' ? '❌' : '✅'}
                        </span>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const s = {
  page: { padding: '20px 16px', maxWidth: 960, margin: '0 auto', background: '#f0f4f8', minHeight: '100%' },
  winnerBanner: {
    background: 'linear-gradient(135deg,#1a0a00,#3a1000)', border: '2px solid #ffd700',
    borderRadius: 12, padding: '16px 20px', textAlign: 'center', fontSize: 20,
    color: '#ffd700', marginBottom: 20, fontFamily: "'Barlow Condensed',sans-serif",
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 },
  card: { background: '#ffffff', border: '2px solid', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderRadius: 14, overflow: 'hidden' },
  cardHeader: { padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardName: { fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: "'Barlow Condensed',sans-serif" },
  cardStats: { display: 'flex', gap: 6 },
  badge: { background: 'rgba(0,0,0,0.25)', borderRadius: 4, padding: '2px 8px', fontSize: 11, color: '#fff' },
  champRow: { padding: '8px 14px', background: '#1a1500', borderBottom: '1px solid #3a3000', fontSize: 14, color: '#ffd700' },
  teamList: { padding: '6px 12px 10px', background: '#ffffff' },
  empty: { color: '#9aa5b8', fontSize: 13, padding: '8px 0', fontStyle: 'italic' },
  teamRow: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '5px 2px', borderBottom: '1px solid #1a1e2a', fontSize: 14,
  },
  rowElim: { opacity: 0.35, background: '#fafafa' },
  rowChamp: { background: '#1a1500', borderRadius: 6, padding: '5px 6px', marginBottom: 2 },
  flag: { fontSize: 18, flexShrink: 0 },
  tName: { flex: 1, color: '#1a2050', fontFamily: "'Barlow Condensed',sans-serif", fontSize: 15 },
  tGroup: { fontSize: 11, color: '#8a95a8', flexShrink: 0 },
  tRank: { fontSize: 11, color: '#9aa5b8', flexShrink: 0 },
  tStatus: { fontSize: 14, flexShrink: 0 },
}
