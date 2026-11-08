import { gsap, ScrollTrigger } from './gsap'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------------------------------------------------------------
// Curtain: first visit of a session gets a short "calibration" intro,
// later pages get a quick lift. Pages leave through the same curtain.
// ---------------------------------------------------------------
export function initCurtain() {
  const el = document.getElementById('curtain')
  const fire = () => {
    window.__jmpReady = true
    window.dispatchEvent(new Event('jmp:ready'))
  }
  if (!el) { fire(); return () => {} }

  const hide = () => { el.style.display = 'none'; el.style.animation = 'none' }
  if (reduced()) { hide(); fire(); return () => {} }

  const mark = el.querySelector('.curtain-mark')
  const count = el.querySelector('.curtain-count')
  const line = el.querySelector('.curtain-line')
  let first = true
  try { first = !sessionStorage.getItem('jmp-intro'); sessionStorage.setItem('jmp-intro', '1') } catch (e) { /* storage unavailable */ }

  let cancelled = false
  const assets = Promise.race([
    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => window.addEventListener('load', r, { once: true })),
    ]),
    new Promise((r) => setTimeout(r, 3000)),
  ])

  el.style.animation = 'none'
  const tl = gsap.timeline()
  const o = { v: 0 }
  if (first) {
    tl.to(line, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, 0)
      .to(o, { v: 100, duration: 1.2, ease: 'power2.inOut', onUpdate: () => { count.textContent = String(Math.round(o.v)).padStart(3, '0') } }, 0)
      .from(mark, { opacity: 0, y: 8, duration: 0.8, ease: 'power3.out' }, 0.1)
  } else {
    gsap.set(line, { scaleX: 1 })
    count.textContent = ''
    tl.to({}, { duration: 0.25 })
  }
  tl.then(() => assets).then(() => {
    if (cancelled) return
    gsap.to(mark, { opacity: 0, y: -10, duration: 0.45, ease: 'power2.in' })
    gsap.to(el, {
      clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'power4.inOut', delay: 0.15,
      onStart: () => setTimeout(fire, 450),
      onComplete: hide,
    })
  })
  return () => { cancelled = true }
}

export function initTransitions() {
  const el = document.getElementById('curtain')
  if (!el) return () => {}
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = e.target.closest && e.target.closest('a[href]')
    if (!a || a.target || a.hasAttribute('download')) return
    let url
    try { url = new URL(a.href, location.href) } catch (err) { return }
    if (url.origin !== location.origin) return
    if (url.pathname === location.pathname) return // in-page anchors and same page: no transition
    if (reduced()) return
    e.preventDefault()
    const mark = el.querySelector('.curtain-mark')
    const count = el.querySelector('.curtain-count')
    const line = el.querySelector('.curtain-line')
    count.textContent = ''
    gsap.set(line, { scaleX: 1 })
    gsap.set(mark, { opacity: 0, y: 0 })
    el.style.display = 'grid'
    el.style.animation = 'none'
    gsap.set(el, { clipPath: 'inset(100% 0 0 0)' })
    gsap.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 0.75, ease: 'power4.inOut', onComplete: () => { location.href = url.href } })
    gsap.to(mark, { opacity: 1, duration: 0.4, delay: 0.35 })
  }
  const onShow = (e) => {
    if (e.persisted) { el.style.display = 'none'; window.__jmpReady = true }
  }
  document.addEventListener('click', onClick)
  window.addEventListener('pageshow', onShow)
  return () => { document.removeEventListener('click', onClick); window.removeEventListener('pageshow', onShow) }
}

// Thin teal progress line along the top edge.
export function initProgress() {
  const bar = document.createElement('div')
  bar.setAttribute('aria-hidden', 'true')
  bar.style.cssText = 'position:fixed;left:0;top:0;height:2px;width:100%;background:var(--color-signal);transform-origin:left;transform:scaleX(0);z-index:120;pointer-events:none'
  document.body.appendChild(bar)
  const st = ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: (self) => { bar.style.transform = `scaleX(${self.progress})` },
  })
  return () => { st.kill(); bar.remove() }
}
