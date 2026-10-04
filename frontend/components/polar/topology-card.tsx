import { Activity, Boxes, Fan, FlaskConical, House, Radio, Zap } from 'lucide-react'
import type { Status, TopologyNode } from '@/lib/polar-data'
import { cn } from '@/lib/utils'
import { StatusDot } from './status-dot'

const nodeIcons: Record<string, typeof Radio> = {
  comms: Radio,
  hvac: Fan,
  store: Boxes,
  hab: House,
  labs: FlaskConical,
  power: Zap,
}

const CYAN = '#38bdf8'

const statusColor: Record<Status, { text: string; bg: string; dot: string; ring: string; pulse: string; stroke: string }> = {
  ok: {
    text: 'text-polar-green',
    bg: 'bg-polar-green/10',
    dot: 'bg-polar-green',
    ring: 'ring-polar-green/35',
    pulse: 'bg-polar-green/25',
    stroke: '#34d399',
  },
  warn: {
    text: 'text-polar-amber',
    bg: 'bg-polar-amber/10',
    dot: 'bg-polar-amber',
    ring: 'ring-polar-amber/45',
    pulse: 'bg-polar-amber/30',
    stroke: '#f5b544',
  },
  critical: {
    text: 'text-polar-red',
    bg: 'bg-polar-red/15',
    dot: 'bg-polar-red',
    ring: 'ring-polar-red/60',
    pulse: 'bg-polar-red/35',
    stroke: '#f2545b',
  },
}

const statusLabel: Record<Status, string> = { ok: 'Nominal', warn: 'Degraded', critical: 'Critical' }

export function TopologyCard({ nodes }: { nodes: TopologyNode[] }) {
  const issues = nodes.filter((n) => n.status !== 'ok').length
  const positioned = nodes.map((node, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2
    return { ...node, x: 50 + Math.cos(angle) * 38, y: 50 + Math.sin(angle) * 38 }
  })

  return (
    <section className="polar-card flex flex-col">
      <header className="flex items-center justify-between gap-3 border-b border-polar-line px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[15px] font-semibold tracking-tight text-polar-text">System Topology</h2>
          <p className="text-xs text-polar-muted">
            {issues === 0 ? 'All subsystems nominal' : `${issues} subsystem${issues > 1 ? 's' : ''} need attention`}
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-polar-green/20 bg-polar-green/[0.08] px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-polar-green">
          <StatusDot tone="green" className="size-1.5" />
          Link secure
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="relative mx-auto aspect-square w-full max-w-60 shrink-0">
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
            <defs>
              <radialGradient id="topoGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={CYAN} stopOpacity="0.14" />
                <stop offset="100%" stopColor={CYAN} stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="46" fill="url(#topoGlow)" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="rgb(148 163 184 / 0.1)" strokeWidth="0.35" />
            <circle
              className="spin-slow"
              cx="50"
              cy="50"
              r="22"
              fill="none"
              stroke="rgb(56 189 248 / 0.22)"
              strokeWidth="0.35"
              strokeDasharray="0.8 2.4"
            />

            {positioned.map((n, i) => {
              const c = statusColor[n.status]
              return (
                <g key={n.id}>
                  <line
                    x1="50"
                    y1="50"
                    x2={n.x}
                    y2={n.y}
                    stroke={c.stroke}
                    strokeWidth="0.5"
                    strokeOpacity={n.status === 'ok' ? 0.3 : 0.55}
                    strokeDasharray={n.status === 'critical' ? undefined : '1.5 1.5'}
                    className={cn(
                      'transition-[stroke] duration-500',
                      n.status === 'ok' && 'flow-line',
                      n.status === 'warn' && 'flow-line-slow',
                      n.status === 'critical' && 'link-down',
                    )}
                  />
                  {n.status !== 'critical' && (
                    <line
                      x1="50"
                      y1="50"
                      x2={n.x}
                      y2={n.y}
                      stroke={CYAN}
                      strokeWidth="0.9"
                      strokeLinecap="round"
                      className="signal-line"
                      style={{ animationDelay: `${i * 0.55}s` }}
                    />
                  )}
                </g>
              )
            })}
          </svg>

          <div className="core-breathe absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-b from-[#12304a] to-[#0b1a2c]">
            <Activity className="size-6 text-polar-cyan" aria-hidden="true" />
          </div>

          {positioned.map((n) => {
            const Icon = nodeIcons[n.id] ?? Activity
            const c = statusColor[n.status]
            return (
              <div
                key={n.id}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <span
                  className={cn(
                    'relative flex size-9 items-center justify-center rounded-full bg-gradient-to-b from-[#16263d] to-[#0e1a2c] ring-1 transition-colors duration-500',
                    c.ring,
                    c.text,
                  )}
                >
                  {n.status !== 'ok' && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-0 rounded-full',
                        c.pulse,
                        n.status === 'critical' ? 'status-pulse-fast' : 'status-pulse',
                      )}
                    />
                  )}
                  <Icon className="relative size-4" aria-hidden="true" />
                </span>
                <span className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-polar-muted">
                  {n.label}
                </span>
              </div>
            )
          })}
        </div>

        <ul className="grid grid-cols-1 gap-x-5 border-t border-polar-line pt-2 sm:grid-cols-2" aria-label="Subsystem status">
          {[...nodes]
            .sort((a, b) => rank(b.status) - rank(a.status))
            .map((n) => {
              const c = statusColor[n.status]
              return (
                <li key={n.id} className="flex min-w-0 items-center justify-between gap-2 py-1.5 text-sm">
                  <span className="flex min-w-0 items-center gap-2 text-polar-text">
                    <span className={cn('size-1.5 shrink-0 rounded-full transition-colors duration-500', c.dot)} />
                    <span className="truncate">{n.label}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 whitespace-nowrap">
                    <span className="font-mono text-[11px] text-polar-muted lg:hidden 2xl:inline">{n.detail}</span>
                    <span
                      className={cn(
                        'rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors duration-500',
                        c.bg,
                        c.text,
                      )}
                    >
                      {statusLabel[n.status]}
                    </span>
                  </span>
                </li>
              )
            })}
        </ul>
      </div>
    </section>
  )
}

function rank(s: Status) {
  return s === 'critical' ? 2 : s === 'warn' ? 1 : 0
}
