import type { Ref } from 'react'
import type { Occasion } from '@/lib/occasions'
import { ArchFrame } from './arch-frame'
import { FlagPennant } from './flag-pennant'
import { GeometricPattern } from './geometric-pattern'
import { Sparkle } from './sparkle'

type GreetingCardProps = {
  occasion: Occasion
  name: string
  showEnglish: boolean
  ref?: Ref<HTMLDivElement>
}

export function GreetingCard({ occasion, name, showEnglish, ref }: GreetingCardProps) {
  return (
    <div
      ref={ref}
      className="@container relative aspect-[9/16] w-full overflow-hidden rounded-[2rem] bg-[radial-gradient(120%_80%_at_50%_0%,#1a5a40_0%,#0b3d2c_45%,#06231a_100%)] text-ivory shadow-2xl ring-1 ring-gold/20"
    >
      <GeometricPattern id="card-pattern" className="absolute inset-0 text-gold/[0.09]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_45%,transparent,rgba(3,20,14,0.55))]" />

      <FlagPennant />

      <div className="absolute inset-x-[11%] bottom-[11%] top-[10%]">
        <ArchFrame />

        <div
          key={occasion.id}
          className="relative flex h-full flex-col items-center justify-center px-[8%] pt-[18%] text-center"
        >
          <Sparkle className="w-[7cqw] animate-twinkle text-gold" />

          <p className="mt-[4cqw] animate-rise text-[2.6cqw] font-medium uppercase tracking-[0.35em] text-gold/90">
            {occasion.eyebrow}
          </p>

          <h2
            lang="ar"
            dir="rtl"
            className="mt-[5cqw] animate-rise text-balance font-arabic text-[13cqw] font-bold leading-[1.15] text-ivory [animation-delay:80ms] [text-shadow:0_0.6cqw_2cqw_rgba(0,0,0,0.35)]"
          >
            {occasion.titleAr}
          </h2>

          {showEnglish && (
            <p className="mt-[2cqw] animate-rise text-[4cqw] font-light tracking-wide text-ivory/80 [animation-delay:140ms]">
              {occasion.titleEn}
            </p>
          )}

          <div className="my-[6cqw] flex w-[70%] items-center gap-[2cqw] text-gold/70" aria-hidden="true">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-current" />
            <span className="size-[1.6cqw] rotate-45 border border-current" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-current" />
          </div>

          <p
            lang="ar"
            dir="rtl"
            className="animate-rise text-pretty font-arabic text-[6cqw] leading-relaxed text-gold [animation-delay:200ms]"
          >
            {occasion.blessingAr}
          </p>
        </div>
      </div>

      <footer className="absolute inset-x-0 bottom-0 h-[11%] bg-gradient-to-b from-emerald-soft/90 to-forest">
        <div className="absolute inset-x-0 top-0 h-[0.5cqw] bg-gradient-to-r from-transparent via-gold to-transparent" />
        <Sparkle className="absolute right-[13%] top-0 w-[6cqw] -translate-y-1/2 animate-twinkle text-ivory [animation-delay:1.2s]" />
        <div className="flex h-full flex-col items-center justify-center gap-[1.5cqw] px-[11%]">
          <span className="text-[2.2cqw] uppercase tracking-[0.4em] text-gold/80">With warm wishes</span>
          <p className="w-full truncate text-center font-arabic text-[5.2cqw] font-bold leading-none text-ivory">
            {name.trim() || 'Your Name'}
          </p>
          <span className="h-[0.3cqw] w-full bg-gradient-to-r from-transparent via-ivory/70 to-transparent" />
        </div>
      </footer>
    </div>
  )
}
