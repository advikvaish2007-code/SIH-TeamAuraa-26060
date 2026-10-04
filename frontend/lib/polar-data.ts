export type StationId = 'maitri' | 'bharati'
export type Status = 'ok' | 'warn' | 'critical'

export type Kpi = {
  label: string
  value: string
  unit: string
  delta: string
  trend: 'up' | 'down' | 'flat'
  status: Status
}

export type TopologyNode = {
  id: string
  label: string
  status: Status
  detail: string
}

export type TelemetryPoint = { time: string; temp: number; power: number }

export type Alert = {
  id: string
  title: string
  description: string
  severity: 'critical' | 'warning'
  time: string
  system: string
}

export type Station = {
  id: StationId
  name: string
  region: string
  kpis: Kpi[]
  topology: TopologyNode[]
  telemetry: TelemetryPoint[]
  alerts: Alert[]
  brief: string[]
  briefSize: string
}

const bharati: Station = {
  id: 'bharati',
  name: 'Bharati',
  region: 'Larsemann Hills · 69.4°S',
  kpis: [
    { label: 'Outside Temp', value: '-21.6', unit: '°C', delta: '0.4° in 1h', trend: 'up', status: 'ok' },
    { label: 'Power Output', value: '82', unit: '%', delta: 'Gen-1 only', trend: 'down', status: 'warn' },
    { label: 'Fuel Reserve', value: '64', unit: 'days', delta: '-1.2 / day', trend: 'down', status: 'ok' },
    { label: 'Personnel', value: '23', unit: '/ 24', delta: '1 on field trip', trend: 'flat', status: 'ok' },
  ],
  topology: [
    { id: 'comms', label: 'Comms', status: 'warn', detail: '12 kbps' },
    { id: 'hvac', label: 'HVAC', status: 'ok', detail: '19.5°C' },
    { id: 'store', label: 'Store', status: 'warn', detail: 'Review' },
    { id: 'hab', label: 'Hab', status: 'ok', detail: '23 crew' },
    { id: 'labs', label: 'Labs', status: 'ok', detail: '3 active' },
    { id: 'power', label: 'Power', status: 'critical', detail: 'Gen-2 off' },
  ],
  telemetry: [
    { time: '10:00', temp: -22.5, power: 81 },
    { time: '10:05', temp: -23.1, power: 80 },
    { time: '10:10', temp: -21.9, power: 78 },
    { time: '10:15', temp: -21.5, power: 79 },
    { time: '10:20', temp: -22.0, power: 81 },
    { time: '10:25', temp: -21.5, power: 82 },
  ],
  alerts: [
    {
      id: 'a1',
      title: 'Gen-2 temperature spike',
      description: 'Coolant pressure drop detected. Load auto-shed to Gen-1.',
      severity: 'critical',
      time: '14m ago',
      system: 'Power',
    },
    {
      id: 'a2',
      title: 'Comms link degraded',
      description: 'Bandwidth reduced to 12 kbps. Sync queued until link recovers.',
      severity: 'warning',
      time: '1h ago',
      system: 'Comms',
    },
  ],
  brief: [
    'Blizzard approaching in ~12h. All outdoor tasks postponed.',
    'Switched to Generator 1 to allow maintenance on Gen-2.',
    'Food stores nominal. Rationing plan #A4 awaiting approval.',
  ],
  briefSize: '1.2 KB',
}

const maitri: Station = {
  id: 'maitri',
  name: 'Maitri',
  region: 'Schirmacher Oasis · 70.8°S',
  kpis: [
    { label: 'Outside Temp', value: '-17.2', unit: '°C', delta: '1.1° in 1h', trend: 'down', status: 'ok' },
    { label: 'Power Output', value: '94', unit: '%', delta: 'Both gens online', trend: 'up', status: 'ok' },
    { label: 'Fuel Reserve', value: '41', unit: 'days', delta: '-1.6 / day', trend: 'down', status: 'warn' },
    { label: 'Personnel', value: '18', unit: '/ 18', delta: 'All on base', trend: 'flat', status: 'ok' },
  ],
  topology: [
    { id: 'comms', label: 'Comms', status: 'ok', detail: '256 kbps' },
    { id: 'hvac', label: 'HVAC', status: 'ok', detail: '20.1°C' },
    { id: 'store', label: 'Store', status: 'warn', detail: 'Fuel low' },
    { id: 'hab', label: 'Hab', status: 'ok', detail: '18 crew' },
    { id: 'labs', label: 'Labs', status: 'ok', detail: '2 active' },
    { id: 'power', label: 'Power', status: 'ok', detail: 'Nominal' },
  ],
  telemetry: [
    { time: '10:00', temp: -16.4, power: 92 },
    { time: '10:05', temp: -16.8, power: 93 },
    { time: '10:10', temp: -17.5, power: 95 },
    { time: '10:15', temp: -17.9, power: 94 },
    { time: '10:20', temp: -17.4, power: 93 },
    { time: '10:25', temp: -17.2, power: 94 },
  ],
  alerts: [
    {
      id: 'm1',
      title: 'Fuel reserve below 45 days',
      description: 'Next resupply window opens in 52 days. Consider consumption cap.',
      severity: 'warning',
      time: '3h ago',
      system: 'Store',
    },
  ],
  brief: [
    'Clear skies for 48h. Ice-core drilling team cleared for departure.',
    'Fuel consumption 8% above plan. Heating setpoint reduction proposed.',
    'All crew health checks completed. No issues flagged.',
  ],
  briefSize: '0.9 KB',
}

export const stations: Record<StationId, Station> = { maitri, bharati }
