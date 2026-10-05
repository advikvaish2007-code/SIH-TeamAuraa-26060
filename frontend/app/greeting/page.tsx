import { GeometricPattern } from '@/components/greeting/geometric-pattern'
import { GreetingStudio } from '@/components/greeting/greeting-studio'

export default function Page() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-forest px-4 py-10 md:py-16">
      <GeometricPattern
        id="page-pattern"
        size={72}
        className="pointer-events-none absolute inset-0 text-gold/[0.05]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_40%,rgba(29,99,71,0.45),transparent)]" />
      <div className="relative">
        <GreetingStudio />
      </div>
    </main>
  )
}
