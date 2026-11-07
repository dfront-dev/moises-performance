import { gsap } from './gsap'

// Custom cursor: a dot and a ring (blend: difference, so it reads on any background).
export function initCursor() {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (!fine || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const root = document.documentElement
  root.classList.add('has-cursor')

  const mk = (cls) => { const d = document.createElement('div'); d.className = cls; d.setAttribute('aria-hidden', 'true'); document.body.appendChild(d); return d }
  const dot = mk('cursor-dot')
  const ring = mk('cursor-ring')

  gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 })
  const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
  const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })
  const rx = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' })
  const ry = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' })

  let state = ''
  const set = (next) => {
    if (next === state) return
    state = next
    const size = next === 'link' ? 56 : next === 'text' ? 4 : 34
    gsap.to(ring, { width: size, height: size, duration: 0.45, ease: 'power3.out' })
    gsap.to(dot, { scale: next === 'link' ? 0 : 1, duration: 0.3 })
  }

  const onMove = (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY) }
  const onOver = (e) => {
    const t = e.target.closest ? e.target.closest('a, button, summary, input, textarea, select, label') : null
    if (!t) return set('')
    set(t.matches('input, textarea, select') ? 'text' : 'link')
  }
  const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 })
  const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 })

  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerover', onOver, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
  document.documentElement.addEventListener('pointerenter', onEnter)
  return () => {
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerover', onOver)
    document.documentElement.removeEventListener('pointerleave', onLeave)
    document.documentElement.removeEventListener('pointerenter', onEnter)
    root.classList.remove('has-cursor')
    dot.remove(); ring.remove()
  }
}

// Magnetic buttons: they lean towards the pointer and spring back.
export function initMagnetic() {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (!fine || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  let active = null
  const reset = (el) => { if (el) gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' }) }
  const onMove = (e) => {
    const el = e.target.closest ? e.target.closest('.btn, [data-magnetic]') : null
    if (el !== active) { reset(active); active = el }
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    gsap.to(el, { x: x * 0.22, y: y * 0.32, duration: 0.4, ease: 'power3.out' })
  }
  window.addEventListener('pointermove', onMove, { passive: true })
  return () => { window.removeEventListener('pointermove', onMove); reset(active) }
}
