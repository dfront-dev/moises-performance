import { useEffect, useRef } from 'react'
import { hero } from '../data/content'
import { system } from '../data/content'
import { CharLines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'
import DotField from './DotField'

// Three readings placed on the portrait: they borrow the names of the method's own steps.
const marks = [
  { label: system.steps[1].title, x: 60, y: 21, side: 'right' },
  { label: system.steps[2].title, x: 60, y: 57, side: 'right' },
  { label: system.steps[4].title, x: 41, y: 82, side: 'left' },
]

export default function Hero() {
  const ref = useRef(null)

  useGsap(ref, ({ q, desktop, root }) => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, paused: true })
    tl.from(q('[data-hero-line]'), { yPercent: 70, opacity: 0, duration: 1.4, stagger: 0.14 }, 0.1)
      .from(q('[data-portrait]'), { clipPath: 'inset(0 0 100% 0)', duration: 1.7, ease: 'power3.inOut' }, 0)
      .from(q('[data-portrait-img]'), { scale: 1.12, duration: 2.4 }, 0)
      .from(q('[data-fade]'), { opacity: 0, y: 14, stagger: 0.1, duration: 1 }, 0.8)
      .from(q('[data-rule]'), { scaleX: 0, transformOrigin: 'left', duration: 1.6, ease: 'power3.inOut' }, 0.6)
      .from(q('[data-plus]'), { opacity: 0, scale: 0.4, stagger: 0.08, duration: 0.8 }, 1.2)
      .from(q('[data-mark-dot]'), { scale: 0, stagger: 0.35, duration: 0.7, ease: 'back.out(2.2)' }, 2)
      .from(q('[data-mark-line]'), { scaleX: 0, transformOrigin: 'var(--o)', stagger: 0.35, duration: 0.8, ease: 'power3.inOut' }, 2.2)
      .from(q('[data-mark-label]'), { opacity: 0, x: (i, el) => (el.dataset.side === 'left' ? 8 : -8), stagger: 0.35, duration: 0.8 }, 2.4)

    const start = () => tl.play()
    if (window.__jmpReady) start()
    else window.addEventListener('jmp:ready', start, { once: true })

    // soft parallax on the portrait only (a few percent)
    gsap.to(q('[data-portrait-img]'), { yPercent: 4, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true } })

    // letters wake up near the pointer
    let cleanup
    if (desktop) {
      const chars = q('[data-char]')
      let raf = 0, px = -999, py = -999, lit = new Set()
      const R = 230
      const run = () => {
        raf = 0
        const next = new Set()
        for (const c of chars) {
          const r = c.getBoundingClientRect()
          const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2))
          if (d < R) { c.style.setProperty('--p', ((1 - d / R) ** 1.5).toFixed(3)); next.add(c) }
        }
        lit.forEach((c) => { if (!next.has(c)) c.style.setProperty('--p', 0) })
        lit = next
      }
      const onMove = (e) => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(run) }
      const onLeave = () => { px = py = -999; if (!raf) raf = requestAnimationFrame(run) }
      root.addEventListener('pointermove', onMove, { passive: true })
      root.addEventListener('pointerleave', onLeave)
      cleanup = () => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); cancelAnimationFrame(raf) }
    }
    return () => { window.removeEventListener('jmp:ready', start); if (cleanup) cleanup() }
  })

  useEffect(() => { document.documentElement.dataset.page = 'home' }, [])

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden bg-paper text-ink">
      <DotField />
      <div className="relative mx-auto grid min-h-[100svh] max-w-[1680px] gap-12 px-5 pb-16 pt-32 md:grid-cols-12 md:items-center md:gap-10 md:px-10 md:pb-20 md:pt-28">
        <div className="md:col-span-7">
          <h1 aria-label={hero.lines.join(' ')} className="display text-[clamp(2.5rem,6.4vw,7.2rem)]">
            <CharLines lines={hero.lines} classes={['', 'text-ink/50', 'text-ink/50']} dataAttr="data-hero-line" />
          </h1>
          <div data-rule aria-hidden className="mt-12 h-px w-full max-w-md bg-ink/20 md:mt-16" />
          <p data-fade className="mt-8 max-w-md text-lg leading-relaxed text-ink/65 md:text-xl">{hero.support}</p>
          <div data-fade className="mt-10">
            <a href={hero.primary.href} className="btn btn-solid micro">
              {hero.primary.label} <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="relative">
            <div data-portrait className="relative aspect-[4/5] overflow-hidden bg-paper-2">
              <picture>
                <source srcSet="images/joao.webp" type="image/webp" />
                <img
                  data-portrait-img
                  alt="João Moisés, fisiologista do exercício, de braços cruzados num espaço de treino"
                  src="images/joao.jpg"
                  width="1086"
                  height="1448"
                  fetchpriority="high"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_14%] grayscale contrast-[1.04]"
                />
              </picture>
            </div>
            {/* crop marks */}
            {[['-left-3 -top-3'], ['-right-3 -top-3'], ['-bottom-3 -left-3'], ['-bottom-3 -right-3']].map(([pos]) => (
              <span key={pos} data-plus aria-hidden className={`absolute ${pos} hidden text-[15px] leading-none text-ink/50 md:block`}>+</span>
            ))}
            {/* readings */}
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
              {marks.map((mk) => (
                <div key={mk.label} className="absolute" style={{ left: `${mk.x}%`, top: `${mk.y}%` }}>
                  <span data-mark-dot className="absolute -left-[5px] -top-[5px] block h-[10px] w-[10px] rounded-full bg-signal ring-2 ring-paper">
                    <span className="ping absolute inset-0 rounded-full border border-signal" />
                  </span>
                  <span
                    data-mark-line
                    style={{ '--o': mk.side === 'left' ? 'right' : 'left' }}
                    className={`absolute top-0 block h-px w-10 bg-ink/70 ${mk.side === 'left' ? 'right-[6px]' : 'left-[6px]'}`}
                  />
                  <span
                    data-mark-label
                    data-side={mk.side}
                    className={`micro absolute -top-[6px] whitespace-nowrap bg-paper/85 px-2 py-1 text-[9px] text-ink ${mk.side === 'left' ? 'right-[54px]' : 'left-[54px]'}`}
                  >
                    {mk.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p data-fade className="micro mt-5 text-[10px] text-steel">João Moisés</p>
        </div>
      </div>
    </section>
  )
}
