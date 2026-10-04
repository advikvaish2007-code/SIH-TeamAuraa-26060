import { cn } from '@/lib/utils'

const tones = {
  green: 'bg-polar-green',
  cyan: 'bg-polar-cyan',
  amber: 'bg-polar-amber',
  red: 'bg-polar-red',
}

type StatusDotProps = {
  tone?: keyof typeof tones
  pulse?: boolean
  className?: string
}

export function StatusDot({ tone = 'green', pulse = true, className }: StatusDotProps) {
  return (
    <span className={cn('relative inline-flex size-2 shrink-0', className)} aria-hidden="true">
      {pulse && (
        <span
          className={cn(
            'absolute inset-0 rounded-full',
            tones[tone],
            tone === 'red' ? 'status-pulse-fast' : 'status-pulse',
          )}
        />
      )}
      <span className={cn('relative inline-flex size-full rounded-full', tones[tone])} />
    </span>
  )
}
