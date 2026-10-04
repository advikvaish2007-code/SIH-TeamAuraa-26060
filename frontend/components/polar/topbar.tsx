'use client'

import { Bell, ChevronDown, Menu, Search, Wifi } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { StationId } from '@/lib/polar-data'
import { cn } from '@/lib/utils'
import { AnimatedNumber } from './animated-number'
import { SosButton } from './sos-button'
import { StatusDot } from './status-dot'

type TopbarProps = {
  station: StationId
  onStationChange: (id: StationId) => void
  alertCount: number
  onMenuClick: () => void
}

const stationOptions: { id: StationId; label: string }[] = [
  { id: 'maitri', label: 'Maitri' },
  { id: 'bharati', label: 'Bharati' },
]

const bandwidthTotal = 20000

export function Topbar({ station, onStationChange, alertCount, onMenuClick }: TopbarProps) {
  const [bandwidthUsed, setBandwidthUsed] = useState(3550)
  const usedPct = Math.round((bandwidthUsed / bandwidthTotal) * 100)
  const selectedIndex = stationOptions.findIndex((o) => o.id === station)

  useEffect(() => {
    const id = setInterval(() => setBandwidthUsed((v) => Math.min(bandwidthTotal, v + 2 + Math.round(Math.random() * 6))), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-polar-line bg-[#070d18]/75 px-4 backdrop-blur-xl md:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-md p-2 text-polar-muted transition-colors hover:bg-polar-raised hover:text-polar-text md:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
        <span className="sr-only">Open menu</span>
      </button>

      <div
        role="radiogroup"
        aria-label="Select station"
        className="relative grid shrink-0 grid-cols-2 rounded-lg border border-polar-line bg-polar-surface/80 p-0.5 shadow-[inset_0_1px_2px_rgb(0_0_0/0.3)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-md bg-gradient-to-b from-sky-300 to-polar-cyan shadow-[0_2px_12px_-2px_rgb(56_189_248/0.55),inset_0_1px_0_rgb(255_255_255/0.4)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(${selectedIndex * 100}%)` }}
        />
        {stationOptions.map((opt) => {
          const selected = opt.id === station
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onStationChange(opt.id)}
              className={cn(
                'relative z-10 min-w-[76px] rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-300',
                selected ? 'text-polar-bg' : 'text-polar-muted hover:text-polar-text',
              )}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      <label className="relative hidden max-w-sm flex-1 md:block">
        <span className="sr-only">Search system</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-polar-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search systems, crew, assets..."
          className="h-9 w-full rounded-lg border border-polar-line bg-polar-surface/70 pl-9 pr-12 text-sm text-polar-text placeholder:text-polar-muted/70 outline-none transition-[border-color,box-shadow,background-color] duration-200 hover:border-polar-cyan/25 focus:border-polar-cyan/50 focus:bg-polar-surface focus:ring-2 focus:ring-polar-cyan/20"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-polar-line bg-polar-raised/60 px-1.5 py-0.5 font-mono text-[10px] text-polar-muted">
          {'⌘K'}
        </kbd>
      </label>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <div className="hidden items-center gap-3 rounded-lg border border-polar-line bg-polar-surface/70 px-3 py-1.5 xl:flex">
          <span className="flex items-center gap-2 text-xs font-medium text-polar-green">
            <StatusDot tone="green" className="size-1.5" />
            <Wifi className="size-3.5" aria-hidden="true" />
            Connected
          </span>
          <span className="h-4 w-px bg-polar-line" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-wider text-polar-muted">
              <span>Bandwidth</span>
              <span className="text-polar-cyan">
                <AnimatedNumber value={bandwidthUsed} grouping />
                {' KB'}
              </span>
            </div>
            <div
              className="h-1 w-32 overflow-hidden rounded-full bg-polar-raised"
              role="progressbar"
              aria-label="Daily bandwidth budget used"
              aria-valuenow={usedPct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-polar-cyan transition-[width] duration-700"
                style={{ width: `${usedPct}%` }}
              />
            </div>
          </div>
        </div>

        <span className="flex xl:hidden" title="Connected" aria-label="Connected" role="img">
          <StatusDot tone="green" />
        </span>

        <button
          type="button"
          className="relative rounded-lg p-2 text-polar-muted transition-all hover:bg-polar-raised hover:text-polar-text active:scale-95"
        >
          <Bell className="size-5" aria-hidden="true" />
          {alertCount > 0 && (
            <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-polar-red font-mono text-[9px] font-bold text-white ring-2 ring-polar-bg">
              {alertCount}
            </span>
          )}
          <span className="sr-only">{`Notifications, ${alertCount} unread`}</span>
        </button>

        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg py-1 pl-1 pr-2 transition-colors hover:bg-polar-raised sm:flex"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-polar-cyan to-sky-700 text-xs font-semibold text-polar-bg ring-2 ring-polar-cyan/20">
            SL
          </span>
          <span className="hidden text-left md:block">
            <span className="block text-sm font-medium leading-tight text-polar-text">Station Leader</span>
          </span>
          <ChevronDown className="size-4 text-polar-muted" aria-hidden="true" />
        </button>

        <span className="hidden h-6 w-px bg-polar-line sm:block" aria-hidden="true" />

        <SosButton />
      </div>
    </header>
  )
}
