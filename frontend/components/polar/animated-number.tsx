'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type AnimatedNumberProps = {
  value: number
  decimals?: number
  duration?: number
  grouping?: boolean
  className?: string
}

export function AnimatedNumber({ value, decimals = 0, duration = 700, grouping = false, className }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value)
  const current = useRef(value)

  useEffect(() => {
    const from = current.current
    if (from === value) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      current.current = value
      setDisplay(value)
      return
    }

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = from + (value - from) * eased
      current.current = next
      setDisplay(next)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, duration])

  const text = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouping,
  })

  return <span className={cn('tabular-nums', className)}>{text}</span>
}
