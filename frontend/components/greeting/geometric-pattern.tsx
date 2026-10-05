type GeometricPatternProps = {
  id: string
  className?: string
  size?: number
}

export function GeometricPattern({ id, className, size = 56 }: GeometricPatternProps) {
  const c = size / 2
  const q = size / 4
  return (
    <svg aria-hidden="true" className={className} width="100%" height="100%">
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.75">
            <rect x={q} y={q} width={c} height={c} />
            <rect x={q} y={q} width={c} height={c} transform={`rotate(45 ${c} ${c})`} />
            <circle cx={c} cy={c} r={q * 0.55} />
            <path
              d={`M0 0L${q * 0.6} ${q * 0.6}M${size} 0L${size - q * 0.6} ${q * 0.6}M0 ${size}L${q * 0.6} ${size - q * 0.6}M${size} ${size}L${size - q * 0.6} ${size - q * 0.6}`}
            />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
