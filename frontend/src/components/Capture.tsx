import { useState } from 'react'
import { sortBrainDump, createTask, type SortedTask } from '../lib/api'

type CaptureProps = {
  onAdded: () => void
}

function Capture({ onAdded }: CaptureProps) {
  const [text, setText] = useState('')
  const [sorted, setSorted] = useState<SortedTask[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  async function handleSort() {
    if (!text.trim()) return
    setLoading(true)
    setError(null)
    try {
      const result = await sortBrainDump(text)
      setSorted(result)
    } catch {
      setError('Could not sort that. Try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleAddAll() {
    setAdding(true)
    try {
      for (const task of sorted) {
        await createTask(task)
      }
      setSorted([])
      setText('')
      onAdded()
    } catch {
      setError('Could not add tasks. Try again.')
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col py-3 pb-7">
      <h1 className="text-[28px] font-bold leading-tight tracking-tight">
        Empty your head.
      </h1>
      <p className="mt-2 text-[16px] text-[var(--color-muted)]">
        Type or paste anything. Messy is fine.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Email Sam about Friday, book the dentist, draft the proposal, buy milk"
        className="mt-5 min-h-[170px] rounded-[20px] bg-[var(--color-surface)] p-4 text-[17px] shadow-[0_0_0_1px_var(--color-line)] outline-none"
      />

      <button
        type="button"
        onClick={handleSort}
        disabled={loading || !text.trim()}
        className="mt-3 min-h-[52px] rounded-full bg-[var(--color-primary)] text-[17px] font-semibold text-[var(--color-on-primary)] disabled:opacity-50"
      >
        {loading ? 'Sorting...' : 'Sort it'}
      </button>

      {error && (
        <p className="mt-3 text-[15px] text-[var(--color-muted)]">{error}</p>
      )}

      {sorted.length > 0 && (
        <div className="mt-6">
          <h2 className="text-[20px] font-bold">Here is how it sorted</h2>
          <div className="mt-3 grid gap-2.5">
            {sorted.map((t, i) => (
              <div
                key={i}
                className="rounded-[18px] bg-[var(--color-surface)] p-4 shadow-[0_0_0_1px_var(--color-line)]"
              >
                <div className="font-semibold">{t.title}</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[var(--color-surface-2)] px-3 py-1 text-[13px] font-medium">
                    About {t.mins} min
                  </span>
                  <span className="rounded-full bg-[var(--color-surface-2)] px-3 py-1 text-[13px] font-medium">
                    {t.energy}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddAll}
            disabled={adding}
            className="mt-4 min-h-[52px] w-full rounded-full bg-[var(--color-primary)] text-[17px] font-semibold text-[var(--color-on-primary)] disabled:opacity-50"
          >
            {adding ? 'Adding...' : `Add ${sorted.length} to Later`}
          </button>
        </div>
      )}
    </div>
  )
}

export default Capture
