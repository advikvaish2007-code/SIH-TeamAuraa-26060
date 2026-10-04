import { ArrowDownRight, ArrowUpRight, Fuel, Minus, Thermometer, Users, Zap } from 'lucide-react'
import type { Kpi } from '@/lib/polar-data'
import { cn } from '@/lib/utils'
import { AnimatedNumber } from './animated-number'

const icons = [Thermometer, Zap, Fuel, Users]

const statusStyles = {
  ok: 'text-polar-green bg-polar-green/10 ring-polar-green/20',
  warn: 'text-polar-amber bg-polar-amber/10 ring-polar-amber/25',
  critical: 'text-polar-red bg-polar-red/10 ring-polar-red/25',
}

const statusBar = {
  ok: 'from-polar-green/50',
  warn: 'from-polar-amber/60',
  critical: 'from-polar-red/60',
}

export function KpiStrip({ kpis }: { kpis: Kpi[] }) {
  return (
    <section aria-label="Key metrics" className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
      {kpis.map((kpi, i) => {
        const Icon = icons[i] ?? Thermometer
        const TrendIcon = kpi.trend === 'up' ? ArrowUpRight : kpi.trend === 'down' ? ArrowDownRight : Minus
        const numeric = Number.parseFloat(kpi.value)
        const decimals = kpi.value.includes('.') ? kpi.value.split('.')[1].length : 0
        return (
          <div
            key={kpi.label}
            className="polar-card animate-enter flex flex-col gap-4 overflow-hidden p-4 md:p-5"
            style={{ animationDelay: `${120 + i * 65}ms` }}
          >
            <span
              aria-hidden="true"
              className={cn(
                'absolute inset-x-0 bottom-0 h-px bg-gradient-to-r to-transparent transition-colors duration-500',
                statusBar[kpi.status],
              )}
            />
            <div className="flex items-center justify-between gap-2">
              <span className="polar-label">{kpi.label}</span>
              <span
                className={cn(
                  'flex size-8 items-center justify-center rounded-lg ring-1 transition-colors duration-500',
                  statusStyles[kpi.status],
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>
            </div>
            <p className="flex items-baseline gap-1.5">
              <AnimatedNumber
                value={numeric}
                decimals={decimals}
                className="font-mono text-[28px] font-semibold leading-none tracking-[-0.03em] text-polar-text"
              />
              <span className="text-sm font-medium text-polar-muted">{kpi.unit}</span>
            </p>
            <p className="flex items-center gap-1.5 text-xs text-polar-muted">
              <TrendIcon
                className={cn(
                  'size-3.5',
                  kpi.status === 'ok' ? 'text-polar-green' : kpi.status === 'warn' ? 'text-polar-amber' : 'text-polar-red',
                )}
                aria-hidden="true"
              />
              {kpi.delta}
            </p>
          </div>
        )
      })}
    </section>
  )
}
