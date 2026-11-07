import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

// A measurement grid that only exists where the pointer is, plus one slow calibration sweep on arrival.
export default function DotField({ gap = 22 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const ctx = canvas.getContext('2d')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const parent = canvas.parentElement
    let W = 0, H = 0, raf = 0
    const m = { x: -999, y: -999, tx: -999, ty: -999, a: 0, ta: 0 }
    const sw = { v: -1 }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const R = 180
      const cols = Math.ceil(W / gap) + 1
      const rows = Math.ceil(H / gap) + 1
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap + gap / 2
          const y = j * gap + gap / 2
          let r = 0, a = 0, teal = false
          if (m.a > 0.01) {
            const d = Math.hypot(x - m.x, y - m.y)
            if (d < R) { const f = (1 - d / R) ** 1.7; r = f * 2.7 * m.a; a = f * 0.75 * m.a }
          }
          if (sw.v >= 0) {
            const sx = sw.v * (W + 420) - 210
            const d = Math.abs(x + y * 0.4 - sx)
            if (d < 120) { const f = (1 - d / 120) ** 1.5; if (f * 2.3 > r) { r = f * 2.3; a = f * 0.65; teal = true } }
          }
          if (r > 0.15) {
            ctx.globalAlpha = a
            ctx.fillStyle = teal ? '#14CFB1' : '#0F1213'
            ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    const tick = () => {
      m.x += (m.tx - m.x) * 0.16
      m.y += (m.ty - m.y) * 0.16
      m.a += (m.ta - m.a) * 0.09
      draw()
      raf = (m.a > 0.012 || Math.abs(m.tx - m.x) > 0.5 || sw.v >= 0) ? requestAnimationFrame(tick) : 0
    }
    const wake = () => { if (!raf) raf = requestAnimationFrame(tick) }

    const resize = () => {
      const r = parent.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = r.width; H = r.height
      canvas.width = W * dpr; canvas.height = H * dpr
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }
    const onMove = (e) => {
      const r = parent.getBoundingClientRect()
      m.tx = e.clientX - r.left; m.ty = e.clientY - r.top
      if (m.a < 0.05) { m.x = m.tx; m.y = m.ty }
      m.ta = 1; wake()
    }
    const onLeave = () => { m.ta = 0; wake() }

    const startSweep = () => {
      sw.v = 0
      gsap.to(sw, { v: 1, duration: 2.4, ease: 'power2.inOut', onUpdate: wake, onComplete: () => { sw.v = -1; wake() } })
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    if (fine) {
      parent.addEventListener('pointermove', onMove, { passive: true })
      parent.addEventListener('pointerleave', onLeave)
    }
    if (window.__jmpReady) startSweep()
    else window.addEventListener('jmp:ready', startSweep, { once: true })

    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('jmp:ready', startSweep)
      gsap.killTweensOf(sw)
    }
  }, [gap])

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-0 h-full w-full" />
}
