import { useState } from 'react'
import NowScreen from './components/NowScreen'
import Capture from './components/Capture'
import Later from './components/Later'

type Tab = 'now' | 'capture' | 'later'

function App() {
  const [tab, setTab] = useState<Tab>('now')
  const [refreshKey, setRefreshKey] = useState(0)

  function handleAdded() {
    setRefreshKey((k) => k + 1)
    setTab('later')
  }

  function tabClass(active: boolean) {
    return `flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-2xl text-[14px] font-medium ${
      active
        ? 'bg-[var(--color-surface-2)] text-[var(--color-text)]'
        : 'text-[var(--color-muted)]'
    }`
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-[440px] flex-col px-5">
      <header className="flex min-h-[60px] items-center justify-between py-3">
        <span className="text-[15px] text-[var(--color-muted)]">Today</span>
      </header>

      {tab === 'now' && <NowScreen key={refreshKey} />}
      {tab === 'capture' && <Capture onAdded={handleAdded} />}
      {tab === 'later' && <Later key={refreshKey} />}

      <nav className="sticky bottom-0 grid grid-cols-3 gap-2 border-t border-[var(--color-line)] bg-[var(--color-bg)] py-2 pb-3">
        <button
          type="button"
          onClick={() => setTab('now')}
          className={tabClass(tab === 'now')}
        >
          Now
        </button>
        <button
          type="button"
          onClick={() => setTab('capture')}
          className={tabClass(tab === 'capture')}
        >
          Capture
        </button>
        <button
          type="button"
          onClick={() => setTab('later')}
          className={tabClass(tab === 'later')}
        >
          Later
        </button>
      </nav>
    </div>
  )
}

export default App
