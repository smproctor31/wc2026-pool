import { useState } from 'react'
import { PLAYER_COLORS } from '../data.js'
import { applyStartDraft } from '../state.js'

export default function SetupPage({ onStart }) {
  const [names, setNames] = useState(['', '', '', ''])
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  function handleStart() {
    const trimmed = names.map(n => n.trim())
    if (trimmed.some(n => !n)) { setError('All 4 player names are required.'); return }
    if (new Set(trimmed).size < 4) { setError('Each player must have a unique name.'); return }
    if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) { setError('Commissioner PIN must be exactly 4 digits.'); return }
    setError('')
    onStart(applyStartDraft(trimmed, PLAYER_COLORS), pin)
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.hero}>
          <div style={s.bigEmoji}>⚽</div>
          <h1 style={s.title}>World Cup Pool 2026</h1>
          <p style={s.sub}>USA · Canada · Mexico · June–July 2026</p>
        </div>
        <div style={s.rules}>
          <div style={s.rule}><span>📋</span><span><strong>Draft:</strong> Teams grouped by FIFA ranking. Each player picks one per group — 13 rounds, 13 teams each.</span></div>
          <div style={s.rule}><span>🔄</span><span><strong>Order:</strong> Rotates each round — the first picker moves to last next round.</span></div>
          <div style={s.rule}><span>⚽</span><span><strong>Track:</strong> All 104 matches are pre-loaded. Just tap the winning team after each game.</span></div>
          <div style={s.rule}><span>🔗</span><span><strong>Live sync:</strong> All players see the same standings in real time via the share link.</span></div>
          <div style={s.rule}><span>🏆</span><span><strong>Win:</strong> Whoever owns the World Cup winning team wins the pool.</span></div>
        </div>
        <div style={s.inputs}>
          {[0,1,2,3].map(i => (
            <div key={i} style={s.row}>
              <div style={{ ...s.dot, background: PLAYER_COLORS[i] }}>{i+1}</div>
              <input style={s.input} placeholder={`Player ${i+1} name`} value={names[i]} maxLength={24}
                onChange={e => { const n=[...names]; n[i]=e.target.value; setNames(n); setError('') }}
                onKeyDown={e => { if (e.key==='Enter') { if (i<3) document.getElementById(`pi-${i+1}`)?.focus(); else handleStart() }}}
                id={`pi-${i}`} />
            </div>
          ))}
        </div>
        <div style={s.pinSection}>
          <div style={s.pinLabel}>🔒 Set Commissioner PIN</div>
          <div style={s.pinHint}>Only the commissioner (you) can enter match results. Choose a 4-digit PIN and keep it private.</div>
          <input style={s.pinInput} type="password" inputMode="numeric" maxLength={4}
            placeholder="4-digit PIN (e.g. 1234)"
            value={pin} onChange={e => { setPin(e.target.value); setError('') }} />
        </div>
        {error && <div style={s.error}>{error}</div>}
        <button style={s.startBtn} className="btn-primary" onClick={handleStart}>Start Draft →</button>
      </div>
    </div>
  )
}

const s = {
  page: { display:'flex', justifyContent:'center', padding:'40px 20px' },
  card: { background:'#ffffff', border:'1px solid #2a2f3e', borderRadius:16, padding:'36px 32px', maxWidth:480, width:'100%' },
  hero: { textAlign:'center', marginBottom:24 },
  bigEmoji: { fontSize:56, marginBottom:8, lineHeight:1 },
  title: { fontSize:28, fontWeight:800, color:'#fff', letterSpacing:1, fontFamily:"'Barlow Condensed',sans-serif", margin:'0 0 8px' },
  sub: { color:'#adc8ff', fontSize:13, letterSpacing:2, textTransform:'uppercase' },
  rules: { background:'#f7f9fc', borderRadius:10, padding:'14px 16px', marginBottom:24, display:'flex', flexDirection:'column', gap:8 },
  rule: { display:'flex', gap:10, fontSize:14, color:'#4a5580', lineHeight:1.55 },
  inputs: { display:'flex', flexDirection:'column', gap:12, marginBottom:16 },
  row: { display:'flex', alignItems:'center', gap:12 },
  dot: { width:34, height:34, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:16, flexShrink:0 },
  input: { flex:1, background:'#f0f4f8', border:'1px solid #2a2f3e', borderRadius:8, padding:'11px 14px', color:'#1a1f36', fontSize:16, outline:'none' },
  error: { color:'#e63946', fontSize:13, marginBottom:12, textAlign:'center', padding:'8px', background:'rgba(230,57,70,0.1)', borderRadius:6 },
  pinSection: { background:'#f7f9fc', borderRadius:10, padding:'14px 16px', marginBottom:16, border:'1px solid #2a3050' },
  pinLabel: { fontSize:15, fontWeight:700, color:'#adc8ff', marginBottom:6, fontFamily:"'Barlow Condensed',sans-serif" },
  pinHint: { fontSize:13, color:'#8a95a8', marginBottom:10, lineHeight:1.5 },
  pinInput: { width:'100%', background:'#f7f9fc', border:'2px solid #2a3050', borderRadius:8, padding:'10px 14px', color:'#fff', fontSize:22, textAlign:'center', letterSpacing:8, outline:'none', boxSizing:'border-box' },
  startBtn: { width:'100%', background:'linear-gradient(135deg,#1a2a7a,#cc2200)', border:'none', color:'#fff', padding:'14px 0', borderRadius:10, fontSize:18, fontWeight:700, cursor:'pointer', letterSpacing:1, fontFamily:"'Barlow Condensed',sans-serif" },
}
