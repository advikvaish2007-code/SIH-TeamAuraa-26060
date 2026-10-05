type SparkleProps = {
  className?: string
}

export function Sparkle({ className }: SparkleProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 0 C12.8 7.5 16.5 11.2 24 12 C16.5 12.8 12.8 16.5 12 24 C11.2 16.5 7.5 12.8 0 12 C7.5 11.2 11.2 7.5 12 0Z"
        fill="currentColor"
      />
    </svg>
  )
}
