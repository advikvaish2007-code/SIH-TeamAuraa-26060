'use client'

import { Check, Send, Sparkles } from 'lucide-react'
import { useState } from 'react'

export function DecisionBrief({ items, size }: { items: string[]; size: string }) {
  const [sent, setSent] = useState(false)

  return (
    <section className="polar-card flex flex-col">
      <header className="flex items-center justify-between gap-3 border-b border-polar-line px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="size-4 text-polar-cyan" aria-hidden="true" />
          <h2 className="text-[15px] font-semibold tracking-tight text-polar-text">Daily Decision Brief</h2>
        </div>
        <span className="rounded-full border border-polar-line bg-polar-raised/60 px-2 py-0.5 font-mono text-[10px] text-polar-muted">
          {size}
        </span>
      </header>

      <div className="animate-fade flex flex-1 flex-col p-5">
        <p className="polar-label mb-4">Auto-generated summary for HQ</p>
        <ol className="flex flex-col gap-3.5">
          {items.map((item, i) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-polar-text/90">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-polar-cyan/10 font-mono text-[10px] font-semibold text-polar-cyan ring-1 ring-polar-cyan/20">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <button
            type="button"
            onClick={() => setSent(true)}
            disabled={sent}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-b from-sky-300 to-polar-cyan px-3.5 py-2 text-xs font-semibold text-polar-bg shadow-[0_4px_16px_-4px_rgb(56_189_248/0.5),inset_0_1px_0_rgb(255_255_255/0.35)] transition-all hover:brightness-110 active:scale-[0.97] disabled:from-polar-green/20 disabled:to-polar-green/15 disabled:text-polar-green disabled:shadow-none disabled:hover:brightness-100 disabled:active:scale-100"
          >
            {sent ? <Check className="size-3.5" aria-hidden="true" /> : <Send className="size-3.5" aria-hidden="true" />}
            {sent ? 'Queued for next sync' : 'Send to HQ'}
          </button>
          <button
            type="button"
            className="rounded-lg border border-polar-line px-3.5 py-2 text-xs font-medium text-polar-text transition-all hover:border-polar-cyan/30 hover:bg-polar-raised active:scale-[0.97]"
          >
            Edit brief
          </button>
        </div>
      </div>
    </section>
  )
}
