import { useRef } from 'react'
import { useGsap, gsap } from '../lib/useGsap'

// Reads the colour of whatever sits behind the readout so it stays visible:
// light text on dark sections, green on paper sections, ink on green sections.
function toneBehind(x, y) {
  let el = document.elementFromPoint(x, y)
  while (el) {
    const m = getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/)
    if (m) {
      const [r, g, b, a = 1] = m[1].split(',').map((v) => parseFloat(v))
      if (a > 0.5) {
        if (r < 70 && g > 170 && b > 130) return 'signal'
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
        return lum > 150 ? 'paper' : 'ink'
      }
    }
    el = el.parentElement
  }
  return 'ink'
}

export default function Spine() {
  const ref = useRef(null)
  const bar = useRef(null)
  const num = useRef(null)

  useGsap(ref, () => {
    const set = gsap.quickSetter(bar.current, 'scaleY')
    const proxy = { v: 0 }
    let tone = ''
    const paintTone = () => {
      const t = toneBehind(14, window.innerHeight - 70)
      if (t !== tone) {
        tone = t
        ref.current.dataset.tone = t
      }
    }
    const onScroll = () => {
      paintTone()
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      gsap.to(proxy, {
        v: p, duration: 0.4, ease: 'power2.out', overwrite: true,
        onUpdate: () => {
          set(proxy.v)
          if (num.current) num.current.textContent = String(Math.round(proxy.v * 100)).padStart(3, '0')
        },
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  })

  return (
    <div ref={ref} data-tone="ink" aria-hidden className="spine pointer-events-none fixed bottom-6 left-3 z-40 hidden flex-col items-center gap-3 lg:flex">
      <div
        className="spine-label micro flex items-center gap-1 leading-none"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '9px' }}
      >
        <span className="opacity-70">JMP</span>
        <span ref={num}>000</span>
        <span className="opacity-70">%</span>
      </div>
      <div className="spine-track relative h-24 w-[2px]">
        <div ref={bar} className="spine-bar absolute inset-0 origin-top scale-y-0" />
      </div>
    </div>
  )
}
