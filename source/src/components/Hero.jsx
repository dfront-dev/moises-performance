import { useRef } from 'react'
import { hero } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap, ScrollTrigger } from '../lib/useGsap'

export default function Hero() {
  const ref = useRef(null)
  const readout = useRef(null)

  useGsap(ref, ({ q, desktop, root }) => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from(q('[data-hero-line]'), { yPercent: 118, duration: 1.4, stagger: 0.14 }, 0.2)
      .from(q('[data-portrait]'), { clipPath: 'inset(0 0 0 100%)', duration: 1.5, ease: 'power4.inOut' }, 0)
      .from(q('[data-portrait-img]'), { scale: 1.3, duration: 2, ease: 'power3.out' }, 0)
      .from(q('[data-micro]'), { opacity: 0, y: 12, stagger: 0.08, duration: 0.9 }, 0.8)
      .from(q('[data-cta]'), { opacity: 0, y: 26, stagger: 0.1, duration: 1 }, 1)
      .from(q('[data-tick]'), { scaleY: 0, transformOrigin: 'top', duration: 1.3 }, 0.5)
      .from(q('[data-crop]'), { opacity: 0, scale: 1.25, stagger: 0.07, duration: 0.9 }, 1.2)

    gsap.to(q('[data-portrait-img]'), {
      yPercent: 10, ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
    })
    gsap.to(q('[data-hero-title]'), {
      yPercent: -12, ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
    })

    // Subtle motion blur: a blurred ghost of the portrait follows scroll velocity.
    const ghost = q('[data-ghost]')[0]
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity()) / 1800, 1)
        gsap.to(ghost, { opacity: v * 0.55, x: self.direction * -v * 34, duration: 0.5, overwrite: true, ease: 'power2.out' })
      },
    })

    let cleanup
    if (desktop) {
      const img = q('[data-portrait-img]')[0]
      const qx = gsap.quickTo(img, 'x', { duration: 1, ease: 'power3.out' })
      let raf = 0
      const onMove = (e) => {
        const r = root.getBoundingClientRect()
        const nx = (e.clientX - r.left) / r.width
        const ny = (e.clientY - r.top) / r.height
        qx((nx - 0.5) * -22)
        if (raf) return
        raf = requestAnimationFrame(() => {
          raf = 0
          if (readout.current) readout.current.textContent = `X ${nx.toFixed(3)}  Y ${ny.toFixed(3)}`
        })
      }
      root.addEventListener('pointermove', onMove)
      cleanup = () => root.removeEventListener('pointermove', onMove)
    }
    return cleanup
  })

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-paper">
      {/* grid hairlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(242,243,241,.06) 1px, transparent 1px)', backgroundSize: 'calc(100% / 6) 100%' }}
      />

      {/* portrait */}
      <div data-portrait className="portrait-mask absolute right-0 top-0 -z-10 h-[64svh] w-full md:h-full md:w-[58%]">
        <picture>
          <source srcSet="images/joao.webp" type="image/webp" />
          <img
            data-ghost
            aria-hidden
            alt=""
            src="images/joao.jpg"
            width="1086"
            height="1448"
            className="absolute inset-0 h-full w-full object-cover object-[50%_14%] opacity-0 blur-[14px] grayscale"
          />
        </picture>
        <picture>
          <source srcSet="images/joao.webp" type="image/webp" />
          <img
            data-portrait-img
            alt="João Moisés, fisiologista do exercício e preparador físico, de braços cruzados num espaço de treino"
            src="images/joao.jpg"
            width="1086"
            height="1448"
            fetchpriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[50%_14%] grayscale contrast-[1.14] brightness-[0.9]"
          />
        </picture>
        <div aria-hidden className="dots absolute inset-0 opacity-30 mix-blend-overlay" style={{ WebkitMaskImage: 'linear-gradient(to right, #000, transparent 55%)', maskImage: 'linear-gradient(to right, #000, transparent 55%)' }} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      </div>

      {/* technical UI */}
      <div aria-hidden className="pointer-events-none absolute left-5 top-24 hidden md:left-10 md:top-28 md:block">
        <p data-micro className="micro text-paper/80">{hero.index}</p>
        <p data-micro className="micro mt-2 hidden text-steel md:block">{hero.motto}</p>
      </div>
      <div aria-hidden data-tick className="pointer-events-none absolute right-6 top-0 hidden h-full w-px bg-signal/70 md:right-10 md:block" style={{ height: '34%' }} />
      <p aria-hidden data-micro className="micro pointer-events-none absolute right-5 top-28 hidden origin-top-right translate-x-0 text-steel md:right-14 md:block" style={{ writingMode: 'vertical-rl' }}>
        {hero.role}
      </p>
      <div aria-hidden className="pointer-events-none absolute bottom-[34%] right-[3%] hidden md:block">
        {[['left-0 top-0', 'border-l border-t'], ['right-0 top-0', 'border-r border-t'], ['bottom-0 left-0', 'border-b border-l'], ['bottom-0 right-0', 'border-b border-r']].map(([pos, b]) => (
          <span key={pos} data-crop className={`absolute h-3 w-3 border-paper/60 ${pos} ${b}`} />
        ))}
        <p ref={readout} className="micro px-4 py-3 text-[10px] text-paper/70">X 0.500  Y 0.500</p>
      </div>

      {/* content */}
      <div className="mx-auto w-full max-w-[1680px] px-5 pb-8 pt-40 md:px-10 md:pb-10">
        <h1
          data-hero-title
          aria-label={hero.lines.join(' ')}
          className="display text-[clamp(2.6rem,11vw,14.5rem)] md:text-[clamp(2.6rem,10.2vw,14.5rem)]"
        >
          <Lines lines={hero.lines} dataAttr="data-hero-line" />
        </h1>

        <div className="mt-10 grid gap-8 border-t border-paper/15 pt-7 md:mt-14 md:grid-cols-12 md:items-end">
          <p data-cta className="max-w-md text-lg leading-snug text-paper/85 md:col-span-5 md:text-xl">
            {hero.support}
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-7 md:justify-end">
            <a data-cta href={hero.primary.href} className="btn btn-solid micro">
              {hero.primary.label} <span aria-hidden>→</span>
            </a>
            <a data-cta href={hero.secondary.href} className="btn btn-line micro">
              {hero.secondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
