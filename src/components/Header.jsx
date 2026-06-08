import { useState } from 'react'
import { isConfigured } from '../supabase.js'

export default function Header({ state, poolId, onReset, saving, commissionerPin }) {
  const [copied, setCopied] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState('')
  const { phase, currentRound } = state

  function copyShareUrl() {
    const url = poolId
      ? `${window.location.origin}${window.location.pathname}?pool=${poolId}`
      : window.location.href
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  function handleResetConfirm() {
    if (pinInput !== commissionerPin) {
      setPinError('Incorrect PIN. Please try again.')
      setPinInput('')
      return
    }
    onReset()
    setShowReset(false)
    setPinInput('')
    setPinError('')
  }

  function handleResetCancel() {
    setShowReset(false)
    setPinInput('')
    setPinError('')
  }

  const phaseLabel = {
    setup: null,
    draft: `📋 Draft — Round ${currentRound+1} of 13`,
    tournament: '⚽ Tournament in Progress',
    complete: '🏆 Tournament Complete!',
  }[phase]

  return (
    <>
      <header style={s.header}>
        <div style={s.inner}>
          <div style={s.left}>
            <span style={s.trophy}>🏆</span>
            <div>
              <div style={s.title}>World Cup Pool 2026</div>
              <div style={s.sub}>USA · Canada · Mexico</div>
            </div>
          </div>
          {phase !== 'setup' && (
            <div style={s.actions}>
              {saving && <span style={s.savingDot}>⟳ Saving…</span>}
              {!isConfigured() && (
                <span style={s.offlineBadge} title="Supabase not configured — saves locally only">💾 Local</span>
              )}
              <button style={s.shareBtn} onClick={copyShareUrl}>
                {copied ? '✓ Copied!' : '🔗 Share Pool'}
              </button>
              <button style={s.resetBtn} onClick={() => setShowReset(true)}>↺ Reset</button>
            </div>
          )}
        </div>
        {phaseLabel && <div style={s.phase}>{phaseLabel}</div>}
      </header>

      {/* Reset modal with PIN */}
      {showReset && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <div style={s.modalTitle}>🔒 Commissioner PIN Required</div>
            <p style={s.modalBody}>
              Enter your commissioner PIN to reset the pool. This will permanently erase all draft picks and match results.
            </p>
            <input
              style={{ ...s.pinInput, ...(pinError ? s.pinInputError : {}) }}
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="Enter 4-digit PIN"
              value={pinInput}
              onChange={e => { setPinInput(e.target.value); setPinError('') }}
              onKeyDown={e => e.key === 'Enter' && handleResetConfirm()}
              autoFocus
            />
            {pinError && <div style={s.pinError}>{pinError}</div>}
            <div style={s.modalActions}>
              <button style={s.dangerBtn} onClick={handleResetConfirm}>Reset Pool</button>
              <button style={s.cancelBtn} onClick={handleResetCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const s = {
  header: { background:'linear-gradient(135deg,#0a1540 0%,#1a2a7a 40%,#8b0000 100%)', borderBottom:'3px solid #cc2200', padding:'12px 20px 6px', position:'sticky', top:0, zIndex:100 },
  inner: { display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:8 },
  left: { display:'flex', alignItems:'center', gap:12 },
  trophy: { fontSize:34, lineHeight:1 },
  title: { fontSize:22, fontWeight:800, letterSpacing:1, color:'#ffffff', fontFamily:"'Barlow Condensed',sans-serif" },
  sub: { fontSize:11, color:'#adc8ff', letterSpacing:2.5, textTransform:'uppercase' },
  actions: { display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' },
  savingDot: { fontSize:12, color:'#adc8ff' },
  offlineBadge: { fontSize:11, color:'#aaa', border:'1px solid #444', borderRadius:4, padding:'3px 8px' },
  shareBtn: { background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.5)', color:'#ffffff', padding:'6px 14px', borderRadius:6, cursor:'pointer', fontSize:13, fontFamily:'inherit' },
  resetBtn: { background:'transparent', border:'1px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.5)', padding:'6px 12px', borderRadius:6, cursor:'pointer', fontSize:12, fontFamily:'inherit' },
  phase: { textAlign:'center', fontSize:12, color:'#adc8ff', letterSpacing:1, padding:'4px 0 8px' },
  overlay: { position:'fixed', inset:0, background:'rgba(30,40,80,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:999, padding:20 },
  modal: { background:'#ffffff', border:'1px solid #2a3050', borderRadius:14, padding:'28px 24px', maxWidth:380, width:'100%' },
  modalTitle: { fontSize:20, fontWeight:700, color:'#fff', marginBottom:12, fontFamily:"'Barlow Condensed',sans-serif" },
  modalBody: { color:'#5a6580', fontSize:14, lineHeight:1.6, marginBottom:18 },
  pinInput: { width:'100%', background:'#f0f4f8', border:'2px solid #2a3050', borderRadius:8, padding:'12px 14px', color:'#fff', fontSize:22, textAlign:'center', letterSpacing:8, marginBottom:8, outline:'none', boxSizing:'border-box' },
  pinInputError: { borderColor:'#cc2200' },
  pinError: { color:'#cc1100', fontSize:13, marginBottom:12, textAlign:'center' },
  modalActions: { display:'flex', gap:10, justifyContent:'center', marginTop:8 },
  dangerBtn: { background:'#8b0000', border:'none', color:'#fff', padding:'10px 22px', borderRadius:8, cursor:'pointer', fontSize:15, fontFamily:'inherit', fontWeight:600 },
  cancelBtn: { background:'#d0daf0', border:'1px solid #2a3050', color:'#4a5580', padding:'10px 22px', borderRadius:8, cursor:'pointer', fontSize:15, fontFamily:'inherit' },
}
