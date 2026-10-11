import { useRef } from 'react'
import { expertise as c, EMAIL } from '../data/content'
import { Lines } from '../lib/split'
import TechVisual from './TechVisual'
import { useGsap, gsap } from '../lib/useGsap'

const spans = [
  'md:col-span-7',
  'md:col-span-5 md:mt-32',
  'md:col-span-5',
  'md:col-span-7 md:mt-32',
]

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
        <p data-fade className="micro flex justify-between border-t border-ink/20 pt-4">
          <span>{c.index}</span>
          <span className="text-ink/50">04 áreas</span>
        </p>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(3rem,9.4vw,11rem)] md:col-span-12">
            <Lines lines={c.lines} />
          </h2>
          <p data-fade className="max-w-sm text-base leading-relaxed text-ink/70 md:col-span-5 md:col-start-8">
            {c.intro}
          </p>
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-20 md:mt-32 md:grid-cols-12">
          {c.items.map((it, i) => (
            <article key={it.n} data-card className={`card group ${spans[i]}`}>
              <div data-mask className="relative aspect-[4/3] overflow-hidden bg-ink md:aspect-[5/4]">
                <div data-inner className="absolute inset-0">
                  {it.image ? (
                    <picture>
                      <source srcSet={`images/${it.image}.webp`} type="image/webp" />
                      <img src={`images/${it.image}.jpg`} alt={it.alt} loading="lazy" decoding="async" className="photo h-full w-full object-cover" style={{ objectPosition: it.pos || '50% 50%' }} />
                    </picture>
                  ) : (
                    <TechVisual variant={it.visual} label="" />
                  )}
                </div>
                <span aria-hidden className="outline-num display pointer-events-none absolute left-5 top-4 text-[clamp(4.5rem,8vw,8rem)] text-paper/90 mix-blend-difference">
                  {it.n}
                </span>
                {it.price && (
                  <span className="micro absolute right-0 top-6 bg-signal px-4 py-2 text-ink">{it.price}</span>
                )}
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-12">
                <h3 data-text className="display text-[clamp(1.9rem,3vw,3.2rem)] leading-[0.92] md:col-span-6">{it.title}</h3>
                <p data-text className="text-[15px] leading-relaxed text-ink/70 md:col-span-6">{it.text}</p>
              </div>

              <ul data-text className="mt-6 grid border-t border-ink/20 sm:grid-cols-2">
                {it.list.map((l) => (
                  <li key={l} className="micro flex items-center gap-3 border-b border-ink/10 py-3 text-[10.5px] text-ink/75">
                    <span aria-hidden className="h-[6px] w-[6px] bg-ink/30 transition-colors duration-300 group-hover:bg-signal" />
                    {l}
                  </li>
                ))}
              </ul>

              <a
                data-text
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(it.subject)}`}
                className="micro underline-link mt-6 inline-flex items-center gap-3 pb-1"
              >
                Falar sobre este plano <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
