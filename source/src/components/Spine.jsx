import { useRef } from 'react'
import { useGsap, gsap } from '../lib/useGsap'

// Technical readout: a fixed hairline with a live percentage, kept in the left gutter.
export default function Spine() {
  const ref = useRef(null)
  const bar = useRef(null)
  const num = useRef(null)

  useGsap(ref, () => {
    const set = gsap.quickSetter(bar.current, 'scaleY')
    const proxy = { v: 0 }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      gsap.to(proxy, {
        v: p,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: () => {
          set(proxy.v)
          if (num.current) num.current.textContent = String(Math.round(proxy.v * 100)).padStart(3, '0')
        },
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  })

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed bottom-6 left-3 z-40 hidden flex-col items-center gap-3 mix-blend-difference lg:flex"
    >
      <div
        className="micro flex items-center gap-1 leading-none text-paper"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '9px' }}
      >
        <span className="opacity-70">JMP</span>
        <span ref={num}>000</span>
        <span className="opacity-70">%</span>
      </div>
      <div className="relative h-24 w-px bg-paper/30">
        <div ref={bar} className="absolute inset-0 origin-top scale-y-0 bg-paper" />
      </div>
    </div>
  )
}
