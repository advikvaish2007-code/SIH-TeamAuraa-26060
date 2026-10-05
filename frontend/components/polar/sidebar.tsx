'use client'

import {
  Boxes,
  FileText,
  LayoutDashboard,
  ListChecks,
  Network,
  RefreshCw,
  Settings,
  Siren,
  Snowflake,
  TriangleAlert,
  Truck,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { StatusDot } from './status-dot'

const navGroups = [
  {
    label: 'Operations',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
      { label: 'Alerts', icon: TriangleAlert, badge: 'alerts' as const, href: '#' },
      { label: 'Tasks', icon: ListChecks, badge: 'tasks' as const, href: '#' },
      { label: 'Drills', icon: Siren, href: '#' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Inventory', icon: Boxes, href: '/inventory' },
      { label: 'Assets & Maint.', icon: Wrench, href: '#' },
      { label: 'Dependency Map', icon: Network, href: '#' },
      { label: 'Personnel', icon: Users, href: '#' },
      { label: 'Logistics', icon: Truck, href: '#' },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Sync Center', icon: RefreshCw },
      { label: 'Reports', icon: FileText },
      { label: 'Settings', icon: Settings },
    ],
  },
]

type SidebarProps = {
  stationName: string
  region: string
  alertCount: number
  open: boolean
  onClose: () => void
}

export function Sidebar({ stationName, region, alertCount, open, onClose }: SidebarProps) {
  const [active, setActive] = useState('Dashboard')
  const badges = { alerts: alertCount, tasks: 4 }

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-polar-line bg-[#0a1220]/95 backdrop-blur-xl transition-[transform,width] duration-300 ease-out',
          'md:sticky md:top-0 md:z-auto md:h-dvh md:w-[68px] md:translate-x-0 md:bg-[#0a1220]/80 lg:w-60',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Primary"
      >
        <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-polar-line px-5 md:max-lg:justify-center md:max-lg:px-0">
          <a href="#" className="flex items-center gap-2.5" aria-label="PolarOps home">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-b from-polar-cyan/25 to-polar-cyan/10 text-polar-cyan ring-1 ring-polar-cyan/30 shadow-[0_0_16px_-6px_rgb(56_189_248/0.7)]">
              <Snowflake className="size-4" aria-hidden="true" />
            </span>
            <span className="text-[17px] font-semibold tracking-[-0.02em] text-polar-text md:max-lg:hidden">
              Polar<span className="text-polar-cyan">Ops</span>
            </span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-polar-muted transition-colors hover:bg-polar-raised hover:text-polar-text md:hidden"
          >
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5 md:max-lg:px-2.5">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-6 last:mb-0">
              <p className="polar-label mb-2 px-3 text-polar-muted/60! md:max-lg:hidden">{group.label}</p>
              <span aria-hidden="true" className="mx-auto mb-2 hidden h-px w-6 bg-polar-line md:max-lg:block" />
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = item.label === active
                  const count = 'badge' in item && item.badge ? badges[item.badge] : 0
                  return (
                    <li key={item.label}>
                      <a
                        href={'href' in item && item.href ? item.href : '#'}
                        title={item.label}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={(e) => {
                          if (('href' in item && item.href === '#') || !('href' in item)) {
                            e.preventDefault()
                          }
                          setActive(item.label)
                          onClose()
                        }}
                        className={cn(
                          'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-[background-color,color,box-shadow] duration-200 md:max-lg:justify-center md:max-lg:px-0',
                          isActive
                            ? 'bg-gradient-to-r from-polar-cyan/[0.14] to-polar-cyan/[0.03] font-medium text-polar-text shadow-[inset_0_0_0_1px_rgb(56_189_248/0.12)]'
                            : 'text-polar-muted hover:bg-white/[0.03] hover:text-polar-text',
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-polar-cyan shadow-[0_0_10px_rgb(56_189_248/0.8)] transition-all duration-300',
                            isActive ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0',
                          )}
                        />
                        <Icon
                          className={cn(
                            'size-4 shrink-0 transition-colors duration-200',
                            isActive ? 'text-polar-cyan' : 'group-hover:text-polar-text',
                          )}
                          aria-hidden="true"
                        />
                        <span className="flex-1 truncate md:max-lg:sr-only">{item.label}</span>
                        {count > 0 && (
                          <span
                            className={cn(
                              'rounded-full px-1.5 py-px font-mono text-[10px] font-semibold md:max-lg:absolute md:max-lg:right-1 md:max-lg:top-0.5 md:max-lg:px-1 md:max-lg:text-[9px]',
                              item.badge === 'alerts'
                                ? 'bg-polar-red/15 text-polar-red'
                                : 'bg-polar-raised text-polar-muted',
                            )}
                          >
                            {count}
                          </span>
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-polar-line p-3 md:max-lg:px-2.5">
          <div
            className="flex items-center gap-3 rounded-lg border border-polar-line bg-polar-raised/60 px-3 py-2.5 md:max-lg:justify-center md:max-lg:px-0"
            title={`${stationName} Station · Online`}
          >
            <StatusDot tone="green" className="size-2.5" />
            <div className="min-w-0 md:max-lg:sr-only">
              <p className="truncate text-sm font-medium text-polar-text">{stationName} Station</p>
              <p className="truncate font-mono text-[11px] text-polar-muted">{region}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
