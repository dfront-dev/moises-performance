import { Fragment, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

// Oversize list of sports with athlete photos travelling on a 3D helix behind the type.
const photos = [
  ['vasco-ribeiro', 'Vasco Ribeiro', '50% 20%'],
  ['teresa-bonvalot', 'Teresa Bonvalot', '45% 30%'],
  ['carol-henrique', 'Carol Henrique', '50% 30%'],
  ['diogo-carolina', 'Diogo e Carolina', '50% 30%'],
  ['eduardo-marques', 'Eduardo Marques', '50% 25%'],
  ['mafalda-pires-de-lima', 'Mafalda Pires de Lima', '50% 30%'],
  ['maria-abecassis', 'Maria Abecassis', '50% 25%'],
  ['nicolau-von-rupp', 'Nicolau von Rupp', '50% 30%'],
  ['pedro-henrique', 'Pedro Henrique', '50% 30%'],
  ['sebastiao-mendonca', 'Sebastião Mendonça', '50% 25%'],
  ['tomas-fernandes', 'Tomás Fernandes', '50% 25%'],
  ['umpierre-diz-panam', 'Umpierre e Diz', '50% 30%'],
]
const sports = ['Triatlo', 'Vela', 'Ciclismo', 'Padel', 'Ténis', 'Surf', 'Freediving']
const N = photos.length
const TURNS = 1.35 // how many times the helix wraps around

export default function SportsSpiral({ top = false }) {
  const root = useRef(null)
  const scene = useRef(null)

  useEffect(() => {
    const els = [...scene.current.querySelectorAll('[data-ph]')]
    const washes = els.map((el) => el.querySelector('[data-wash]'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const title = root.current.querySelector('h2')
    const intro = { v: top ? 0 : 1 } // on the home page the helix opens up once the intro curtain lifts
    let tau = 0, scroll = 0, W = 0, H = 0

    const place = () => {
      const rx = Math.min(W * (W < 768 ? 0.34 : 0.34), 560)
      const rz = W < 768 ? 220 : 420
      const span = H * (W < 768 ? 0.66 : 0.62)
      els.forEach((el, i) => {
        const u = (((i / N + tau + scroll) % 1) + 1) % 1
        const phi = u * Math.PI * 2 * TURNS
        const x = Math.sin(phi) * rx
        const z = Math.cos(phi) * rz
        const y = (u - 0.5) * span
        const depth = (Math.cos(phi) + 1) / 2
        const e = Math.max(0, Math.min(1, u / 0.1, (1 - u) / 0.1))
        const grow = e * e * (3 - 2 * e) // photos grow in and shrink out at the ends of the helix: never see-through
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${(-Math.sin(phi) * 16).toFixed(1)}deg) scale(${(grow * intro.v).toFixed(3)})`
        el.style.opacity = '1'
        if (washes[i]) washes[i].style.opacity = ((1 - depth) * 0.62).toFixed(3) // far photos fade towards the paper colour, still opaque
        el.style.zIndex = String(Math.round(depth * 100))
      })
    }
    const measure = () => { const r = scene.current.getBoundingClientRect(); W = r.width; H = r.height; place() }
    measure()
    window.addEventListener('resize', measure)

    let tick, st, onReady
    if (top && !reduce) {
      gsap.set(title, { opacity: 0, y: 40 })
      const go = () => { gsap.to(intro, { v: 1, duration: 2, ease: 'power3.out' }); gsap.to(title, { opacity: 1, y: 0, duration: 1.5, delay: 0.2, ease: 'power3.out' }) }
      if (window.__jmpReady) go(); else { onReady = go; window.addEventListener('jmp:ready', onReady, { once: true }) }
    } else { intro.v = 1 }
    if (!reduce) {
      tick = (_, dt) => { tau += (dt / 1000) * 0.018; place() }
      gsap.ticker.add(tick)
      st = ScrollTrigger.create({ trigger: root.current, start: 'top bottom', end: 'bottom top', onUpdate: (self) => { scroll = self.progress * 0.35 } })
    }
    return () => { window.removeEventListener('resize', measure); if (onReady) window.removeEventListener('jmp:ready', onReady); gsap.killTweensOf(intro); if (tick) gsap.ticker.remove(tick); if (st) st.kill() }
  }, [])

  return (
    <section ref={root} id="modalidades" className="relative isolate overflow-hidden bg-paper text-ink">
      <div className={`relative mx-auto flex min-h-[100svh] max-w-[1680px] items-center justify-center px-5 ${top ? 'py-32 md:py-40' : 'py-40 md:min-h-[135svh] md:py-64'} md:px-10`}>
        {/* photos on the helix */}
        <div ref={scene} aria-hidden className="pointer-events-none absolute inset-0 z-0" style={{ perspective: 1200, perspectiveOrigin: '50% 45%' }}>
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {photos.map(([src, alt, pos]) => (
              <div key={src} data-ph className="absolute left-1/2 top-1/2 aspect-[3/4] w-[clamp(96px,13vw,220px)] -translate-x-1/2 -translate-y-1/2 will-change-transform" style={{ marginLeft: 0 }}>
                <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-paper-2">
                  <picture>
                    <source srcSet={`images/atletas/${src}.webp`} type="image/webp" />
                    <img src={`images/atletas/${src}.jpg`} alt="" loading="eager" decoding="async" className="h-full w-full object-cover grayscale" style={{ objectPosition: pos }} />
                  </picture>
                  <div data-wash aria-hidden className="absolute inset-0 bg-paper" style={{ opacity: 0 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* type, in front: it inverts wherever a photo passes behind */}
        <h2 aria-label={sports.join(', ')} className="display relative z-10 mx-auto max-w-[1560px] text-center text-[clamp(3.3rem,11vw,13.5rem)] leading-[0.98] text-white [text-wrap:balance]" style={{ mixBlendMode: 'difference' }}>
          {sports.map((w, i) => (
            <Fragment key={w}>
              <span className="whitespace-nowrap" aria-hidden>
                {w}
                {i < sports.length - 1 && <span className="ml-[0.3em] inline-block h-[0.2em] w-[0.2em] rounded-full bg-current align-[0.28em]" />}
              </span>
              {i < sports.length - 1 && ' '}
            </Fragment>
          ))}
        </h2>
      </div>
    </section>
  )
}
