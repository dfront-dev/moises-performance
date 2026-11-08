// Four small crosses just outside the corners of a framed photo. Put it inside a `relative` wrapper.
export default function Crosses({ light = false }) {
  return ['-left-3 -top-3', '-right-3 -top-3', '-bottom-3 -left-3', '-bottom-3 -right-3'].map((pos) => (
    <span key={pos} aria-hidden className={`pointer-events-none absolute ${pos} text-[15px] leading-none ${light ? 'text-paper/60' : 'text-ink/50'}`}>+</span>
  ))
}
