'use client'

import { useState } from 'react'
import { useAppContext } from '@/components/providers'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/lib/db'
import { type StationId, stations } from '@/lib/polar-data'
import { AlertsCard } from './alerts-card'
import { DecisionBrief } from './decision-brief'
import { KpiStrip } from './kpi-strip'
import { PolarBackdrop } from './polar-backdrop'
import { Sidebar } from './sidebar'
import { TelemetryChart } from './telemetry-chart'
import { Topbar } from './topbar'
import { TopologyCard } from './topology-card'

export function DashboardShell() {
  const { stationId, setStationId } = useAppContext()
  const [menuOpen, setMenuOpen] = useState(false)
  const [acknowledged, setAcknowledged] = useState<Set<string>>(() => new Set())

  // Offline database querying example
  const dbStation = useLiveQuery(() => db.stations.get(stationId))
  const dbAlerts = useLiveQuery(() => db.alerts.where({ station_id: stationId }).toArray())

  // Fallback to mock data for components we haven't mapped to the DB yet
  const mockStationId = stationId === 1 ? 'maitri' : 'bharati'
  const station = stations[mockStationId]
  
  // Merge DB alerts with mock alerts for demonstration
  const activeAlerts = dbAlerts || station.alerts
  const openAlerts = activeAlerts.filter((a: any) => !acknowledged.has(a.id)).length

  return (
    <div className="relative isolate flex min-h-dvh text-polar-text">
      <PolarBackdrop />

      <Sidebar
        stationName={station.name}
        region={station.region}
        alertCount={openAlerts}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          station={stationId === 1 ? 'maitri' : 'bharati'}
          onStationChange={(id) => setStationId(id === 'maitri' ? 1 : 2)}
          alertCount={openAlerts}
          onMenuClick={() => setMenuOpen(true)}
        />

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-5 md:p-6">
          <div key={stationId} className="animate-enter flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <p className="polar-label text-polar-cyan!">{station.region}</p>
              <h1 className="text-balance text-[26px] font-semibold leading-none tracking-[-0.025em] text-polar-text md:text-[30px]">
                {`${station.name} Operations`}
              </h1>
            </div>
            <p className="flex items-center gap-2 font-mono text-[11px] text-polar-muted">
              <span className="text-polar-text/80">Last sync 10:25 UTC</span>
              <span className="h-3 w-px bg-polar-line" aria-hidden="true" />
              next in 4m
            </p>
          </div>

          <KpiStrip kpis={station.kpis} />

          <div className="grid gap-4 md:gap-5 lg:grid-cols-12">
            <div className="animate-enter flex lg:col-span-5 [&>section]:flex-1" style={{ animationDelay: '380ms' }}>
              <TopologyCard nodes={station.topology} />
            </div>
            <div className="animate-enter flex lg:col-span-7 [&>section]:flex-1" style={{ animationDelay: '440ms' }}>
              <TelemetryChart key={station.id} stationName={station.name} data={station.telemetry} />
            </div>
            <div className="animate-enter flex lg:col-span-7 [&>section]:flex-1" style={{ animationDelay: '520ms' }}>
              <AlertsCard
                alerts={station.alerts}
                acknowledged={acknowledged}
                onAcknowledge={(id) => setAcknowledged((prev) => new Set(prev).add(id))}
              />
            </div>
            <div className="animate-enter flex lg:col-span-5 [&>section]:flex-1" style={{ animationDelay: '580ms' }}>
              <DecisionBrief key={station.id} items={station.brief} size={station.briefSize} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
