type TimerRingProps = {
  progress: number // 0 to 1, how much of the ring is filled
  size?: number // pixel diameter
  strokeWidth?: number
  color?: string
  children?: React.ReactNode
}

function TimerRing({
  progress,
  size = 260,
  strokeWidth = 14,
  color = 'var(--color-primary)',
  children,
}: TimerRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  return (
    <div
      className="relative grid place-items-center rounded-full bg-[var(--color-surface)] shadow-[0_0_0_1px_var(--color-line)]"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-surface-2)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div className="relative grid justify-items-center gap-1.5 px-7 text-center">
        {children}
      </div>
    </div>
  )
}

export default TimerRing
