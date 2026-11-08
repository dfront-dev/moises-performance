import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

// Weighty inertia scroll: low lerp = the page keeps gliding after the wheel stops.
// Touch devices keep native scrolling (it already has its own momentum).
export function startSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const lenis = new Lenis({
    lerp: 0.065,
    wheelMultiplier: 0.85,
    smoothWheel: true,
    syncTouch: false,
    anchors: true,
  })

  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  window.__lenis = lenis
  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
    delete window.__lenis
  }
}
