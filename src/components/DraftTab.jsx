import { getDraftOrderForRound, getTeamsForDraftRound, getCurrentPickerIndex, getPlayerTeams } from '../state.js'

export default function DraftTab({ state, onPick }) {
  const { players, picks, currentRound, currentPickInRound, draftBaseOrder } = state
  const teamsThisRound = getTeamsForDraftRound(currentRound)
  const pickerIndex = getCurrentPickerIndex(state)
  const picker = players[pickerIndex]
  const draftOrder = getDraftOrderForRound(draftBaseOrder, currentRound)

  return (
    <div style={s.page}>
      <div style={{ ...s.banner, borderColor: picker?.color }}>
        <div style={{ ...s.avatar, background: picker?.color }}>{picker?.name?.charAt(0).toUpperCase()}</div>
        <div>
          <div style={s.pickerName}>{picker?.name}'s Pick</div>
          <div style={s.pickerMeta}>Round {currentRound+1} of 13 · Pick {currentPickInRound+1} of 4</div>
        </div>
      </div>

      <div style={s.orderRow}>
        {draftOrder.map((pIdx, i) => (
          <div key={i} style={{ ...s.orderItem, ...(i===currentPickInRound?{...s.orderActive,borderColor:players[pIdx]?.color}:{}), ...(i<currentPickInRound?s.orderDone:{}) }}>
            <div style={{ ...s.dot, background: players[pIdx]?.color }} />
            <span>{players[pIdx]?.name}</span>
            {i < currentPickInRound && <span style={{ color:'#4caf50', marginLeft:4 }}>✓</span>}
          </div>
        ))}
      </div>

      <div style={s.groupLabel}>Ranking Group {currentRound+1} of 13 · FIFA Ranks #{currentRound*4+1}–{currentRound*4+4}</div>

      <div style={s.teamGrid}>
        {teamsThisRound.map(team => {
          const ownerId = picks[team.id]
          const isPicked = ownerId !== undefined
          const owner = isPicked ? players[ownerId] : null
          return (
            <div key={team.id}
              className={!isPicked ? 'team-card-available' : ''}
              style={{ ...s.teamCard, ...(isPicked ? { ...s.teamCardPicked, borderColor: owner?.color } : {}) }}
              onClick={() => !isPicked && onPick(team.id)}>
              <div style={s.flag}>{team.flag}</div>
              <div style={s.teamName}>{team.name}</div>
              <div style={s.teamRank}>FIFA #{team.fifaRank}</div>
              <div style={s.teamConf}>{team.confederation}</div>
              {isPicked
                ? <div style={{ ...s.pickedBadge, background: owner?.color }}>{owner?.name}</div>
                : <div style={s.pickCta}>Tap to Pick →</div>}
            </div>
          )
        })}
      </div>

      {Object.keys(picks).length > 0 && (
        <>
          <div style={s.sectionLabel}>All Picks So Far</div>
          <div style={s.picksGrid}>
            {players.map(p => (
              <div key={p.id} style={{ ...s.miniCard, borderColor: p.color }}>
                <div style={{ ...s.miniName, color: p.color }}>{p.name}</div>
                {getPlayerTeams(picks, p.id).map(t => (
                  <div key={t.id} style={s.miniTeam}>{t.flag} {t.name}</div>
                ))}
                {getPlayerTeams(picks, p.id).length === 0 && <div style={s.noTeams}>No picks yet</div>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const s = {
  page: { padding:'20px 16px', maxWidth:920, margin:'0 auto', background:'#f0f4f8', minHeight:'100%' },
  banner: { background:'#ffffff', border:'2px solid', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', borderRadius:12, padding:'14px 18px', display:'flex', alignItems:'center', gap:14, marginBottom:16 },
  avatar: { width:44, height:44, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:20, flexShrink:0 },
  pickerName: { fontSize:22, fontWeight:700, color:'#fff', fontFamily:"'Barlow Condensed',sans-serif" },
  pickerMeta: { fontSize:13, color:'#6a7590', marginTop:2 },
  orderRow: { display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' },
  orderItem: { display:'flex', alignItems:'center', gap:6, background:'#ffffff', border:'1px solid #2a2f3e', borderRadius:8, padding:'6px 12px', fontSize:13, color:'#777' },
  orderActive: { background:'#deeaff', border:'2px solid', color:'#fff' },
  orderDone: { color:'#4caf50' },
  dot: { width:10, height:10, borderRadius:'50%', flexShrink:0 },
  groupLabel: { fontSize:11, color:'#6a7a9a', letterSpacing:2, textTransform:'uppercase', marginBottom:12 },
  sectionLabel: { fontSize:11, color:'#6a7a9a', letterSpacing:2, textTransform:'uppercase', marginBottom:12, marginTop:24 },
  teamGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:12, marginBottom:8 },
  teamCard: { background:'#ffffff', border:'1px solid #2a2f3e', borderRadius:12, padding:16, cursor:'pointer', textAlign:'center', userSelect:'none' },
  teamCardPicked: { border:'2px solid', opacity:0.65, cursor:'default' },
  flag: { fontSize:38, marginBottom:6, lineHeight:1 },
  teamName: { fontSize:15, fontWeight:600, color:'#1a2050', marginBottom:4, fontFamily:"'Barlow Condensed',sans-serif" },
  teamRank: { fontSize:12, color:'#6a7590', marginBottom:2 },
  teamConf: { fontSize:11, color:'#8a95a8', marginBottom:10, textTransform:'uppercase', letterSpacing:1 },
  pickedBadge: { borderRadius:6, padding:'4px 10px', fontSize:12, fontWeight:700, color:'#fff', display:'inline-block' },
  pickCta: { color:'#1a4db5', fontSize:13, fontWeight:600 },
  picksGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(185px,1fr))', gap:12 },
  miniCard: { background:'#ffffff', border:'2px solid', boxShadow:'0 1px 4px rgba(0,0,0,0.05)', borderRadius:10, padding:'10px 12px' },
  miniName: { fontWeight:700, fontSize:14, marginBottom:8, fontFamily:"'Barlow Condensed',sans-serif" },
  miniTeam: { fontSize:13, color:'#3a4570', padding:'2px 0', display:'flex', alignItems:'center', gap:6 },
  noTeams: { fontSize:12, color:'#9aa5b8', fontStyle:'italic' },
}
