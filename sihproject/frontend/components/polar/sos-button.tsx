'use client'

import { Siren } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const HOLD_MS = 1500

export function SosButton() {
  const [holding, setHolding] = useState(false)
  const [sent, setSent] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function start() {
    if (sent) return
    setHolding(true)
    timer.current = setTimeout(() => {
      setSent(true)
      setHolding(false)
    }, HOLD_MS)
  }

  function cancel() {
    setHolding(false)
    if (timer.current) clearTimeout(timer.current)
  }

  return (
    <button
      type="button"
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onKeyDown={(e) => {
        if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) start()
      }}
      onKeyUp={cancel}
      onClick={() => sent && setSent(false)}
      aria-label={sent ? 'SOS broadcast sent. Click to reset.' : 'Hold to broadcast SOS'}
      title={sent ? 'SOS sent — click to reset' : 'Hold for 1.5s to broadcast SOS'}
      className={cn(
        'relative flex h-9 select-none items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-b from-[#f46a70] to-polar-red px-3 text-sm font-bold tracking-[0.06em] text-white shadow-[0_4px_14px_-4px_rgb(242_84_91/0.6),inset_0_1px_0_rgb(255_255_255/0.25)] transition-all duration-200 hover:brightness-110 active:scale-[0.97]',
        sent && 'animate-pulse',
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 bg-white/25"
        style={{
          width: holding ? '100%' : '0%',
          transition: holding ? `width ${HOLD_MS}ms linear` : 'width 150ms ease-out',
        }}
      />
      <Siren className="relative size-4" aria-hidden="true" />
      <span className="relative">{sent ? 'SENT' : 'SOS'}</span>
    </button>
  )
}
