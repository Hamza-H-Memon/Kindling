function App() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[440px] flex-col px-5">
      <header className="flex min-h-[60px] items-center justify-between py-3">
        <span className="text-[15px] text-[var(--color-muted)]">Today</span>
      </header>

      <main className="flex flex-1 flex-col py-3 pb-7">
        <p className="text-[16px] text-[var(--color-muted)]">One thing right now</p>
        <h1 className="mt-1 text-[32px] font-bold leading-tight tracking-tight">
          Kindling
        </h1>
        <p className="mt-3 text-[18px]">App shell is working.</p>
      </main>

      <nav className="sticky bottom-0 grid grid-cols-3 gap-2 border-t border-[var(--color-line)] bg-[var(--color-bg)] py-2 pb-3">
        <button
          type="button"
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 rounded-2xl text-[14px] font-medium text-[var(--color-text)] bg-[var(--color-surface-2)]"
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
