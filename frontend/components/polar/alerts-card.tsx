'use client'

import { Check, ChevronRight, TriangleAlert } from 'lucide-react'
import type { Alert } from '@/lib/polar-data'
import { cn } from '@/lib/utils'
import { StatusDot } from './status-dot'

type AlertsCardProps = {
  alerts: Alert[]
  acknowledged: Set<string>
  onAcknowledge: (id: string) => void
}

const tone = {
  critical: {
    card: 'border-polar-red/25 bg-polar-red/[0.06] shadow-[0_0_28px_-10px_rgb(242_84_91/0.45)] hover:border-polar-red/45 hover:shadow-[0_0_34px_-8px_rgb(242_84_91/0.55)]',
    bar: 'bg-polar-red',
    chip: 'bg-polar-red/15 text-polar-red',
    dot: 'red' as const,
  },
  warning: {
    card: 'border-polar-amber/25 bg-polar-amber/[0.05] shadow-[0_0_28px_-12px_rgb(245_181_68/0.35)] hover:border-polar-amber/45 hover:shadow-[0_0_32px_-10px_rgb(245_181_68/0.45)]',
    bar: 'bg-polar-amber',
    chip: 'bg-polar-amber/15 text-polar-amber',
    dot: 'amber' as const,
  },
  resolved: {
    card: 'border-polar-green/20 bg-polar-green/[0.04] hover:border-polar-green/35',
    bar: 'bg-polar-green',
    chip: 'bg-polar-green/15 text-polar-green',
    dot: 'green' as const,
  },
}

export function AlertsCard({ alerts, acknowledged, onAcknowledge }: AlertsCardProps) {
  const open = alerts.filter((a) => !acknowledged.has(a.id)).length

  return (
    <section className="polar-card flex flex-col">
      <header className="flex items-center justify-between gap-3 border-b border-polar-line px-5 py-4">
        <div className="flex items-center gap-2.5">
          <TriangleAlert className="size-4 text-polar-amber" aria-hidden="true" />
          <h2 className="text-[15px] font-semibold tracking-tight text-polar-text">Active Alerts</h2>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 font-mono text-[10px] font-medium transition-colors duration-300',
              open > 0 ? 'bg-polar-red/10 text-polar-red' : 'bg-polar-green/10 text-polar-green',
            )}
          >
            {open > 0 ? `${open} open` : 'All clear'}
          </span>
        </div>
        <a
          href="#"
          className="group flex items-center gap-0.5 text-xs font-medium text-polar-cyan transition-colors hover:text-sky-300"
        >
          View all
          <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </header>

      <ul className="flex flex-1 flex-col gap-3 p-4">
        {alerts.map((alert) => {
          const isAck = acknowledged.has(alert.id)
          const t = tone[isAck ? 'resolved' : alert.severity]
          return (
            <li
              key={alert.id}
              className={cn(
                'relative overflow-hidden rounded-xl border p-4 pl-5 transition-[border-color,box-shadow,background-color,transform] duration-300 hover:-translate-y-px motion-reduce:hover:translate-y-0',
                t.card,
              )}
            >
              <span aria-hidden="true" className={cn('absolute inset-y-0 left-0 w-[3px] transition-colors duration-300', t.bar)} />
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    'flex items-center gap-1.5 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300',
                    t.chip,
                  )}
                >
                  <StatusDot tone={t.dot} pulse={!isAck} className="size-1.5" />
                  {isAck ? 'Acknowledged' : alert.severity}
                </span>
                <span className="font-mono text-[11px] text-polar-muted">{`${alert.system} · ${alert.time}`}</span>
              </div>
              <h3 className="text-sm font-semibold tracking-tight text-polar-text">{alert.title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-polar-muted">{alert.description}</p>
              <div className="mt-3.5 flex gap-2">
                <button
                  type="button"
                  onClick={() => onAcknowledge(alert.id)}
                  disabled={isAck}
                  className="flex items-center gap-1.5 rounded-md border border-polar-line bg-polar-raised/80 px-2.5 py-1.5 text-xs font-medium text-polar-text transition-all hover:border-polar-cyan/40 hover:bg-polar-raised hover:brightness-110 active:scale-[0.97] disabled:cursor-default disabled:border-polar-green/20 disabled:bg-transparent disabled:text-polar-green disabled:hover:brightness-100 disabled:active:scale-100"
                >
                  <Check className="size-3.5" aria-hidden="true" />
                  {isAck ? 'Acknowledged' : 'Acknowledge'}
                </button>
                <button
                  type="button"
                  className="rounded-md px-2.5 py-1.5 text-xs font-medium text-polar-muted transition-colors hover:bg-polar-raised/60 hover:text-polar-text"
                >
                  Details
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
