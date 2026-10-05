export function PolarBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-polar-bg">
      <div className="aurora-a absolute -left-1/4 -top-1/3 h-[80vh] w-[90vw] rounded-full bg-[radial-gradient(closest-side,rgb(56_189_248/0.10),transparent)]" />
      <div className="aurora-b absolute -right-1/4 top-1/4 h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgb(52_211_153/0.06),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#04080f] to-transparent" />
      <div className="particles absolute inset-0 opacity-60" />
    </div>
  )
}
