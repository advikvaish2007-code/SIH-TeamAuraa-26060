const ARCH_PATH =
  'M0 1000 V330 C0 185 165 115 270 0 C375 115 540 185 540 330 V1000 Z'
const INNER_ARCH_PATH =
  'M18 1000 V336 C18 200 172 132 270 26 C368 132 522 200 522 336 V1000'

export function ArchFrame() {
  return (
    <svg
      viewBox="0 0 540 1000"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full drop-shadow-[0_3cqw_6cqw_rgba(0,0,0,0.55)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="arch-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d6347" />
          <stop offset="45%" stopColor="#0f4632" />
          <stop offset="100%" stopColor="#072a1e" />
        </linearGradient>
        <radialGradient id="arch-glow" cx="50%" cy="28%" r="55%">
          <stop offset="0%" stopColor="#d4b26a" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#d4b26a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="arch-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1d999" />
          <stop offset="50%" stopColor="#d4b26a" />
          <stop offset="100%" stopColor="#d4b26a" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path d={ARCH_PATH} fill="url(#arch-fill)" />
      <path d={ARCH_PATH} fill="url(#arch-glow)" />
      <path d={ARCH_PATH} fill="none" stroke="url(#arch-gold)" strokeWidth="3" />
      <path
        d={INNER_ARCH_PATH}
        fill="none"
        stroke="url(#arch-gold)"
        strokeWidth="1"
        strokeOpacity="0.6"
      />
    </svg>
  )
}
