import { ALL_TEAMS } from '../data.js'
import { getGroupStandings } from '../state.js'

const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L']

export default function GroupStandings({ state }) {
  const { matchResults, picks, players } = state

  return (
    <div style={s.page}>
      <div style={s.intro}>
        Group stage standings update automatically as you enter match results.
        Points: Win = 3 · Draw = 1 · Loss = 0
      </div>
      <div style={s.grid}>
        {GROUPS.map(group => {
          const rows = getGroupStandings(group, matchResults)
          return (
            <div key={group} style={s.groupCard}>
              <div style={s.groupHeader}>Group {group}</div>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={s.th}>#</th>
                    <th style={{ ...s.th, textAlign: 'left' }}>Team</th>
                    <th style={s.th}>P</th>
                    <th style={s.th}>W</th>
                    <th style={s.th}>D</th>
                    <th style={s.th}>L</th>
                    <th style={{ ...s.th, color: '#ffd700' }}>Pts</th>
                    <th style={s.th}>Pool</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => {
                    const team = ALL_TEAMS.find(t => t.name === row.name)
                    const ownerId = team ? picks[team.id] : undefined
                    const owner = ownerId !== undefined ? players[ownerId] : null
                    const isAdvancing = i < 2
                    return (
                      <tr key={row.name} style={{
                        ...s.tr,
                        ...(isAdvancing && row.played > 0 ? s.trAdvancing : {}),
                      }}>
                        <td style={s.td}>{i + 1}</td>
                        <td style={{ ...s.td, textAlign: 'left' }}>
                          <span style={s.teamFlag}>{team?.flag}</span>
                          <span style={s.teamName}>{row.name}</span>
                        </td>
                        <td style={s.td}>{row.played}</td>
                        <td style={s.td}>{row.w}</td>
                        <td style={s.td}>{row.d}</td>
                        <td style={s.td}>{row.l}</td>
                        <td style={{ ...s.td, fontWeight: 700, color: '#ffd700' }}>{row.pts}</td>
                        <td style={s.td}>
                          {owner
                            ? <span style={{ ...s.ownerPill, background: owner.color }}>{owner.name}</span>
                            : <span style={{ color: '#aab5c8' }}>—</span>
                          }
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {/* Advancement line indicator */}
              <div style={s.advanceNote}>
                <span style={s.advanceDot} /> Top 2 advance · Best 8 third-place also advance
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const s = {
  page: { padding: '16px', maxWidth: 1100, margin: '0 auto', paddingBottom: 40, background: '#f0f4f8', minHeight: '100%' },
  intro: { fontSize: 13, color: '#5a6a88', marginBottom: 16, textAlign: 'center', lineHeight: 1.6 },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 },

  groupCard: { background: '#ffffff', border: '1px solid #1a2040', borderRadius: 12, overflow: 'hidden' },
  groupHeader: {
    background: 'linear-gradient(135deg, #0a1540, #1a2a7a)',
    padding: '8px 14px', fontSize: 14, fontWeight: 700,
    color: '#adc8ff', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1,
    textTransform: 'uppercase',
  },

  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    padding: '6px 8px', fontSize: 11, color: '#6a7a9a', textAlign: 'center',
    fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, textTransform: 'uppercase',
    borderBottom: '1px solid #1a2040',
  },
  tr: { borderBottom: '1px solid #1a2040' },
  trAdvancing: { background: 'rgba(26,77,181,0.05)' },
  td: { padding: '7px 8px', fontSize: 13, color: '#1a2050', textAlign: 'center', verticalAlign: 'middle' },

  teamFlag: { fontSize: 16, marginRight: 6, verticalAlign: 'middle' },
  teamName: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, verticalAlign: 'middle' },

  ownerPill: {
    display: 'inline-block', borderRadius: 4, padding: '2px 6px',
    fontSize: 10, color: '#fff', fontWeight: 700,
  },

  advanceNote: {
    padding: '6px 14px', fontSize: 11, color: '#7a8aaa',
    display: 'flex', alignItems: 'center', gap: 6,
  },
  advanceDot: {
    display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
    background: 'rgba(74,144,217,0.4)', flexShrink: 0,
  },
}
