'use client'

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from 'recharts'
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import type { TelemetryPoint } from '@/lib/polar-data'
import { AnimatedNumber } from './animated-number'
import { StatusDot } from './status-dot'

const CYAN = '#38bdf8'
const AMBER = '#f5b544'
const TICK = { fill: '#8696ad', fontSize: 11, fontFamily: 'var(--font-jetbrains)' }
const UPDATE_MS = 4000

export function TelemetryChart({ stationName, data }: { stationName: string; data: TelemetryPoint[] }) {
  const [series, setSeries] = useState(data)
  const reducedMotion = usePrefersReducedMotion()

  const { tMin, tMax, tempBase, powerBase } = useMemo(() => {
    const temps = data.map((d) => d.temp)
    const avg = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length
    return {
      tMin: Math.floor(Math.min(...temps) - 1),
      tMax: Math.ceil(Math.max(...temps) + 1),
      tempBase: avg(temps),
      powerBase: avg(data.map((d) => d.power)),
    }
  }, [data])

  useEffect(() => {
    const id = setInterval(() => {
      setSeries((prev) => {
        const last = prev[prev.length - 1]
        const temp = clamp(last.temp + (Math.random() - 0.5) * 0.7, tempBase - 1.2, tempBase + 1.2)
        const power = clamp(last.power + Math.round((Math.random() - 0.5) * 4), powerBase - 5, Math.min(100, powerBase + 5))
        return [...prev.slice(1), { time: nextTime(last.time), temp: Math.round(temp * 10) / 10, power: Math.round(power) }]
      })
    }, UPDATE_MS)
    return () => clearInterval(id)
  }, [tempBase, powerBase])

  const latest = series[series.length - 1]
  const lastIndex = series.length - 1

  return (
    <section className="polar-card flex flex-col">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-polar-line px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-[15px] font-semibold tracking-tight text-polar-text">{`${stationName} Telemetry`}</h2>
            <span className="flex items-center gap-1.5 rounded-full border border-polar-cyan/20 bg-polar-cyan/[0.08] px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-polar-cyan">
              <StatusDot tone="cyan" className="size-1.5" />
              Live
            </span>
          </div>
          <p className="text-xs text-polar-muted">
            {'Temperature & power output · updated '}
            <span className="font-mono text-polar-text/80">{latest.time}</span>
          </p>
        </div>
        <dl className="flex gap-6">
          <div className="flex flex-col gap-1">
            <dt className="flex items-center gap-1.5 polar-label">
              <span className="h-0.5 w-3 rounded-full" style={{ background: CYAN }} />
              Temp
            </dt>
            <dd className="font-mono text-xl font-semibold leading-none tracking-tight text-polar-text">
              <AnimatedNumber value={latest.temp} decimals={1} />
              <span className="ml-0.5 text-xs font-normal text-polar-muted">°C</span>
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="flex items-center gap-1.5 polar-label">
              <span className="h-0.5 w-3 rounded-full" style={{ background: AMBER }} />
              Power
            </dt>
            <dd className="font-mono text-xl font-semibold leading-none tracking-tight text-polar-text">
              <AnimatedNumber value={latest.power} />
              <span className="ml-0.5 text-xs font-normal text-polar-muted">%</span>
            </dd>
          </div>
        </dl>
      </header>

      <div className="min-h-64 flex-1 px-2 pb-3 pt-4">
        <ResponsiveContainer width="100%" height="100%" minHeight={256}>
          <ComposedChart data={series} margin={{ top: 12, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CYAN} stopOpacity={0.28} />
                <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
              </linearGradient>
              <filter id="lineGlow" x="-10%" y="-50%" width="120%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid stroke="rgb(148 163 184 / 0.07)" vertical={false} />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tick={TICK} dy={6} />
            <YAxis
              yAxisId="temp"
              domain={[tMin, tMax]}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              tickCount={tMax - tMin + 1}
              width={46}
              tick={TICK}
              tickFormatter={(v: number) => `${v}°`}
            />
            <YAxis
              yAxisId="power"
              orientation="right"
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              width={36}
              tick={TICK}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip content={ChartTooltip} cursor={{ stroke: 'rgb(148 163 184 / 0.25)', strokeDasharray: '3 3' }} />
            <Area
              yAxisId="temp"
              type="monotone"
              dataKey="temp"
              stroke={CYAN}
              strokeWidth={2}
              fill="url(#tempFill)"
              baseValue={tMin}
              filter="url(#lineGlow)"
              isAnimationActive={!reducedMotion}
              animationDuration={800}
              animationEasing="ease-out"
              dot={(props: DotRenderProps) => renderLiveDot(props, lastIndex, CYAN)}
              activeDot={{ r: 4, fill: CYAN, stroke: '#0b1322', strokeWidth: 2 }}
            />
            <Line
              yAxisId="power"
              type="monotone"
              dataKey="power"
              stroke={AMBER}
              strokeWidth={2}
              strokeDasharray="4 3"
              isAnimationActive={!reducedMotion}
              animationDuration={800}
              animationEasing="ease-out"
              dot={(props: DotRenderProps) => renderLiveDot(props, lastIndex, AMBER)}
              activeDot={{ r: 4, fill: AMBER, stroke: '#0b1322', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

type DotRenderProps = { cx?: number; cy?: number; index?: number }

function renderLiveDot({ cx, cy, index }: DotRenderProps, lastIndex: number, color: string) {
  if (index !== lastIndex || cx == null || cy == null) return <g key={`dot-${index}`} />
  return (
    <g key={`dot-${index}`}>
      <circle className="live-halo" cx={cx} cy={cy} r={6} fill={color} fillOpacity={0.35} />
      <circle cx={cx} cy={cy} r={4} fill={color} stroke="#0b1322" strokeWidth={2} />
    </g>
  )
}

function ChartTooltip({ active, payload, label }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null
  const temp = payload.find((p) => p.dataKey === 'temp')?.value
  const power = payload.find((p) => p.dataKey === 'power')?.value
  return (
    <div className="rounded-lg border border-polar-line bg-polar-raised/95 px-3 py-2 shadow-xl backdrop-blur">
      <p className="mb-1 font-mono text-[11px] text-polar-muted">{label}</p>
      <p className="flex items-center gap-2 text-xs text-polar-text">
        <span className="size-2 rounded-full" style={{ background: CYAN }} />
        <span className="font-mono tabular-nums">{Number(temp).toFixed(1)}°C</span>
      </p>
      <p className="flex items-center gap-2 text-xs text-polar-text">
        <span className="size-2 rounded-full" style={{ background: AMBER }} />
        <span className="font-mono tabular-nums">{power}%</span>
      </p>
    </div>
  )
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

function nextTime(time: string) {
  const [h, m] = time.split(':').map(Number)
  const total = (h * 60 + m + 5) % (24 * 60)
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

const motionQuery = '(prefers-reduced-motion: reduce)'

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(motionQuery)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(motionQuery).matches,
    () => false,
  )
}
