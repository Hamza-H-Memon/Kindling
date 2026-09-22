import { useEffect, useRef, useState } from 'react'
import TimerRing from './components/TimerRing'

const START_SECONDS = 120

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

function App() {
  const [remaining, setRemaining] = useState(START_SECONDS)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) return

    intervalRef.current = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [running])

  const progress = 1 - remaining / START_SECONDS

  function handleStart() {
    setRemaining(START_SECONDS)
    setRunning(true)
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-[440px] flex-col px-5">
      <header className="flex min-h-[60px] items-center justify-between py-3">
        <span className="text-[15px] text-[var(--color-muted)]">Today</span>
      </header>

      <main className="flex flex-1 flex-col items-center py-3 pb-7">
        <p className="self-start text-[16px] text-[var(--color-muted)]">
          One thing right now
        </p>
        <h1 className="mt-1 self-start text-[32px] font-bold leading-tight tracking-tight">
          Reply to the landlord email
        </h1>

        <div className="mt-7">
          <TimerRing progress={progress}>
            <span className="text-[44px] font-bold leading-none">
              {formatTime(remaining)}
            </span>
            <span className="text-[16px] text-[var(--color-muted)]">
              {running ? 'Just this step' : '2 minutes is enough'}
            </span>
          </TimerRing>
        </div>

        <button
          type="button"
          onClick={handleStart}
          className="mt-7 min-h-[52px] rounded-full bg-[var(--color-primary)] px-7 text-[17px] font-semibold text-[var(--color-on-primary)]"
        >
          {running ? 'Restart' : 'Start'}
        </button>
      </main>

      <nav className="sticky bottom-0 grid grid-cols-3 gap-2 border-t border-[var(--color-line)] bg-[var(--color-bg)] py-2 pb-3">
        <button
          type="button"
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-2xl bg-[var(--color-surface-2)] text-[14px] font-medium text-[var(--color-text)]"
        >
          Now
        </button>
        <button
          type="button"
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-2xl text-[14px] font-medium text-[var(--color-muted)]"
        >
          Capture
        </button>
        <button
          type="button"
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-2xl text-[14px] font-medium text-[var(--color-muted)]"
        >
          Later
        </button>
      </nav>
    </div>
  )
}

export default App
