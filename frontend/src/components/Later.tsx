import { useEffect, useState } from 'react'
import { fetchTasks, type Task } from '../lib/api'

function Later() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
      .then((all) => setTasks(all.filter((t) => !t.done)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex flex-1 flex-col py-3 pb-7">
        <p className="mt-10 text-[16px] text-[var(--color-muted)]">
          Loading...
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col py-3 pb-7">
      <h1 className="text-[28px] font-bold leading-tight tracking-tight">
        Later
      </h1>
      <p className="mt-2 text-[16px] text-[var(--color-muted)]">
        Nothing here is late. It is just waiting.
      </p>

      {tasks.length === 0 && (
        <p className="mt-10 text-[16px] text-[var(--color-muted)]">
          Nothing is waiting. Empty your head on the Capture tab whenever you
          need to.
        </p>
      )}

      <div className="mt-5 grid gap-2.5">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="rounded-[18px] bg-[var(--color-surface)] p-4 shadow-[0_0_0_1px_var(--color-line)]"
          >
            <div className="font-semibold">{t.title}</div>
            <div className="mt-2 flex flex-wrap gap-2">
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
    </div>
  )
}

export default Later
