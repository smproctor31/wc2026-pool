import { useState, useEffect, useCallback, useRef } from 'react'
import {
  INITIAL_STATE, loadLocal, saveLocal, clearLocal,
  loadFromSupabase, saveToSupabase, createPool, subscribeToPool,
  applyPickTeam,
} from './state.js'
import { PLAYER_COLORS } from './data.js'
import { isConfigured } from './supabase.js'

import Header from './components/Header.jsx'
import SetupPage from './components/SetupPage.jsx'
import DraftTab from './components/DraftTab.jsx'
import StandingsTab from './components/StandingsTab.jsx'
import MatchTracker from './components/MatchTracker.jsx'
import GroupStandings from './components/GroupStandings.jsx'

export default function App() {
  const [state, setState] = useState(() => loadLocal() || { ...INITIAL_STATE })
  const [poolId, setPoolId] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('pool') || localStorage.getItem('wc2026_pool_id') || null
  })
  const [activeTab, setActiveTab] = useState('draft')
  const [saving, setSaving] = useState(false)
  const [commissionerPin, setCommissionerPin] = useState(() => localStorage.getItem('wc2026_pin') || '')
  const [loading, setLoading] = useState(true)
  const channelRef = useRef(null)

  // ── Initial load ────────────────────────────────────────────────────────
  useEffect(() => {
    async function init() {
      const params = new URLSearchParams(window.location.search)
      const urlPoolId = params.get('pool')

      if (urlPoolId && isConfigured()) {
        const remoteState = await loadFromSupabase(urlPoolId)
        if (remoteState) {
          setState(remoteState)
          saveLocal(remoteState)
          setPoolId(urlPoolId)
          localStorage.setItem('wc2026_pool_id', urlPoolId)
          if (remoteState.phase === 'tournament' || remoteState.phase === 'complete') setActiveTab('standings')
        }
      } else {
        const local = loadLocal()
        if (local) {
          setState(local)
          if (local.phase === 'tournament' || local.phase === 'complete') setActiveTab('standings')
        }
      }
      setLoading(false)
    }
    init()
  }, [])

  // ── Real-time subscription ───────────────────────────────────────────────
  useEffect(() => {
    if (!poolId || !isConfigured()) return
    if (channelRef.current) channelRef.current.unsubscribe()
    channelRef.current = subscribeToPool(poolId, (remoteState) => {
      setState(remoteState)
      saveLocal(remoteState)
    })
    return () => { if (channelRef.current) channelRef.current.unsubscribe() }
  }, [poolId])

  // ── Save to Supabase whenever state changes ──────────────────────────────
  const saveTimeoutRef = useRef(null)
  useEffect(() => {
    if (!poolId || !isConfigured()) return
    clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(async () => {
      setSaving(true)
      await saveToSupabase(poolId, state)
      setSaving(false)
    }, 800)
    return () => clearTimeout(saveTimeoutRef.current)
  }, [state, poolId])

  // ── Handlers ────────────────────────────────────────────────────────────
  async function handleStart(newState, pin) {
    if (pin) { setCommissionerPin(pin); localStorage.setItem('wc2026_pin', pin) }
    setState(newState)
    saveLocal(newState)
    setActiveTab('draft')

    if (isConfigured()) {
      setSaving(true)
      const id = await createPool(newState)
      if (id) {
        setPoolId(id)
        localStorage.setItem('wc2026_pool_id', id)
        window.history.replaceState({}, '', `${window.location.pathname}?pool=${id}`)
      }
      setSaving(false)
    }
  }

  function handlePick(teamId) {
    setState(prev => {
      const next = applyPickTeam(prev, teamId)
      saveLocal(next)
      if (next.phase === 'tournament') setActiveTab('standings')
      return next
    })
  }

  function handleUpdate(newState) {
    setState(newState)
    saveLocal(newState)
  }

  function handleReset() {
    clearLocal()
    localStorage.removeItem('wc2026_pool_id')
    setState({ ...INITIAL_STATE })
    setPoolId(null)
    setActiveTab('draft')
    window.history.replaceState({}, '', window.location.pathname)
  }

  // ── Tabs ────────────────────────────────────────────────────────────────
  const { phase } = state
  const tabs = phase === 'draft'
    ? [{ id:'draft', label:'📋 Draft' }, { id:'standings', label:'👥 Standings' }]
    : [
        { id:'standings', label:'👥 Standings' },
        { id:'groups',    label:'📊 Groups' },
        { id:'tracker',   label:'⚽ Matches' },
      ]

  if (loading) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', color:'#7fdfaf', fontSize:18, fontFamily:"'Barlow Condensed',sans-serif" }}>
        Loading pool… ⚽
      </div>
    )
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f0f4f8' }}>
      <Header state={state} poolId={poolId} onReset={handleReset} saving={saving} commissionerPin={commissionerPin} />

      {phase === 'setup' ? (
        <SetupPage onStart={handleStart} />
      ) : (
        <>
          <nav style={nav.bar}>
            {tabs.map(tab => (
              <button key={tab.id} style={{ ...nav.tab, ...(activeTab===tab.id ? nav.tabActive : {}) }}
                onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </nav>

          {activeTab === 'draft'     && phase === 'draft'      && <DraftTab state={state} onPick={handlePick} />}
          {activeTab === 'standings'                            && <StandingsTab state={state} />}
          {activeTab === 'groups'    && phase !== 'draft'       && <GroupStandings state={state} />}
          {activeTab === 'tracker'   && phase !== 'draft'       && <MatchTracker state={state} onUpdate={handleUpdate} commissionerPin={commissionerPin} />}
        </>
      )}
    </div>
  )
}

const nav = {
  bar: { display:'flex', background:'#f0f4f8', borderBottom:'1px solid #1a2040', padding:'0 16px', position:'sticky', top:60, zIndex:90 },
  tab: { padding:'12px 22px', background:'transparent', border:'none', borderBottom:'2px solid transparent', color:'#6a7a9a', cursor:'pointer', fontSize:14, fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:0.5, transition:'all 0.15s' },
  tabActive: { color:'#1a4db5', borderBottom:'2px solid #1a4db5' },
}
