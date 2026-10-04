export function FlagPennant() {
  return (
    <div
      className="absolute left-[5%] top-0 flex w-[22%] flex-col items-center gap-[1.5cqw] rounded-b-[1.5cqw] border-x border-b border-gold/40 bg-gradient-to-b from-emerald-soft to-emerald-deep px-[2cqw] pb-[3cqw] pt-[5cqw] shadow-[0_2cqw_5cqw_rgba(0,0,0,0.45)]"
      aria-label="Flag of Saudi Arabia"
      role="img"
    >
      <p
        lang="ar"
        dir="rtl"
        className="text-center font-arabic text-[2.6cqw] font-bold leading-tight text-ivory"
      >
        لا إله إلا الله محمد رسول الله
      </p>
      <svg viewBox="0 0 100 12" className="w-[80%] text-ivory" aria-hidden="true">
        <path d="M2 6 Q40 3.5 78 5 L78 7 Q40 8.5 2 6Z" fill="currentColor" />
        <rect x="78" y="2.5" width="2" height="7" rx="0.6" fill="currentColor" />
        <rect x="80" y="4.8" width="16" height="2.4" rx="1.2" fill="currentColor" />
      </svg>
      <span className="h-px w-1/2 bg-gold/60" />
    </div>
  )
}
