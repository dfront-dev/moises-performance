import { useRef } from 'react'
import { expertise as c } from '../data/content'
import { programs } from '../data/programs'
import { Lines } from '../lib/split'
import TechVisual from './TechVisual'
import { useGsap, gsap } from '../lib/useGsap'

const offsets = ['', 'md:mt-20', 'md:mt-40']

export default function Expertise() {
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 118, duration: 1.3, stagger: 0.12, ease: 'power4.out',
      scrollTrigger: { trigger: q('h2')[0], start: 'top 82%' },
    })
    gsap.from(q('[data-fade]'), {
      opacity: 0, y: 24, duration: 1, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('[data-fade]')[0], start: 'top 88%' },
    })
    q('[data-card]').forEach((card) => {
      const mask = card.querySelector('[data-mask]')
      const inner = card.querySelector('[data-inner]')
      const text = card.querySelectorAll('[data-text]')
      const draw = card.querySelectorAll('[data-draw]')
      const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 84%' } })
      tl.from(mask, { clipPath: 'inset(100% 0 0 0)', duration: 1.3, ease: 'power4.inOut' })
        .from(inner, { scale: 1.35, duration: 1.8, ease: 'power3.out' }, 0)
        .from(text, { opacity: 0, y: 22, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, 0.6)
      if (draw.length) {
        gsap.set(draw, { strokeDasharray: 1, strokeDashoffset: 1 })
        tl.to(draw, { strokeDashoffset: 0, duration: 1.8, stagger: 0.18, ease: 'power2.inOut' }, 0.3)
      }
      gsap.to(inner, {
        yPercent: -6, ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
  })

  return (
    <section id="expertise" ref={ref} className="relative bg-paper py-28 text-ink md:py-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-ink/20" />

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(3rem,9.4vw,11rem)] md:col-span-12">
            <Lines lines={c.lines} />
          </h2>
          <p data-fade className="max-w-sm text-base leading-relaxed text-ink/70 md:col-span-5 md:col-start-8">
            {c.intro}
          </p>
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-20 md:mt-28 md:grid-cols-3">
          {programs.map((p, i) => (
            <article key={p.id} data-card className={`card group ${offsets[i]}`}>
              <a href={`programas.html#${p.id}`} className="block">
                <div data-mask className="relative aspect-[4/5] overflow-hidden bg-ink">
                  <div data-inner className="absolute inset-0">
                    {p.image ? (
                      <div className="tint relative h-full w-full">
                        <picture>
                          <source srcSet={`images/${p.image}.webp`} type="image/webp" />
                          <img src={`images/${p.image}.jpg`} alt={p.alt} loading="lazy" decoding="async" className="photo h-full w-full object-cover" style={{ objectPosition: p.pos || '50% 50%' }} />
                        </picture>
                      </div>
                    ) : (
                      <TechVisual variant={p.visual} label="" />
                    )}
                  </div>
                  <span aria-hidden className="outline-num display pointer-events-none absolute left-5 top-4 text-[clamp(4.5rem,7vw,7.5rem)] text-signal">{p.n}</span>
                </div>
              </a>

              <h3 data-text className="display mt-6 text-[clamp(1.9rem,2.8vw,3rem)] leading-[0.92]">
                <a href={`programas.html#${p.id}`} className="transition-colors hover:text-[#007b6c]">{p.name}</a>
              </h3>
              <p data-text className="micro mt-3 text-[10.5px] deep-signal">{p.desc}</p>
              <p data-text className="mt-4 text-[15px] leading-relaxed text-ink/70">{p.ideal}.</p>

              <ul data-text className="mt-6 border-t border-ink/20">
                {p.services.map((s) => (
                  <li key={s} className="micro flex items-center gap-3 border-b border-ink/10 py-3 text-[10.5px] text-ink/80">
                    <span aria-hidden className="h-[7px] w-[7px] -skew-x-12 bg-signal" />
                    {s}
                  </li>
                ))}
              </ul>

              <a data-text href={`programas.html#${p.id}`} className="micro underline-link mt-6 inline-flex items-center gap-3 pb-1">
                Ver o programa <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </a>
            </article>
          ))}
        </div>

        <div data-fade className="mt-24 flex justify-center">
          <a href="programas.html" className="btn btn-dark micro">Comparar os programas <span aria-hidden>→</span></a>
        </div>
      </div>
    </section>
  )
}
