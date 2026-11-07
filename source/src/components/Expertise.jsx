import { useRef } from 'react'
import { expertise as c } from '../data/content'
import { services } from '../data/services'
import { Lines } from '../lib/split'
import TechVisual from './TechVisual'
import { useGsap, gsap } from '../lib/useGsap'

export default function Expertise() {
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out',
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
      tl.from(mask, { clipPath: 'inset(100% 0 0 0)', duration: 1.3, ease: 'power3.inOut' })
        .from(inner, { scale: 1.08, duration: 1.8, ease: 'power3.out' }, 0)
        .from(text, { opacity: 0, y: 22, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, 0.6)
      if (draw.length) {
        gsap.set(draw, { strokeDasharray: 1, strokeDashoffset: 1 })
        tl.to(draw, { strokeDashoffset: 0, duration: 1.8, stagger: 0.18, ease: 'power2.inOut' }, 0.3)
      }
      gsap.to(inner, {
        yPercent: -3, ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
  })

  return (
    <section id="expertise" ref={ref} className="relative bg-paper py-28 text-ink md:py-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-ink/20" />

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(2.34rem,5.64vw,6.6rem)] md:col-span-12">
            <Lines lines={c.lines} />
          </h2>
          <p data-fade className="max-w-md text-base leading-relaxed text-ink/70 md:col-span-5 md:col-start-8">
            {c.intro}
          </p>
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-20 md:mt-24 md:grid-cols-3">
          {services.map((s, i) => (
            <article key={s.id} data-card className="card group">
              <a href={`servicos.html#${s.id}`} className="block" aria-label={s.full}>
                <div data-mask className="relative aspect-[4/5] overflow-hidden bg-ink">
                  <div data-inner className="absolute inset-0">
                    {s.image ? (
                      <div className="tint relative h-full w-full">
                        <picture>
                          <source srcSet={`images/${s.image}.webp`} type="image/webp" />
                          <img src={`images/${s.image}.jpg`} alt={s.alt} loading="lazy" decoding="async" className="photo h-full w-full object-cover" style={{ objectPosition: s.pos || '50% 50%' }} />
                        </picture>
                      </div>
                    ) : (
                      <TechVisual variant={s.visual} label="" />
                    )}
                  </div>
                </div>
              </a>

              <p data-text className="micro mt-6 text-[10px] text-steel">{String(i + 1).padStart(2, '0')}</p>
              <h3 data-text className="display subhead mt-2 text-[1.6rem] md:text-[clamp(1.5rem,2.2vw,2.4rem)]">
                <a href={`servicos.html#${s.id}`} className="transition-colors hover:text-ink/60">{s.short}</a>
              </h3>
              <p data-text className="micro mt-3 text-[10.5px] text-steel">{s.full}</p>
              <p data-text className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink/70">{s.desc}</p>

              <details data-text className="mt-6 border-t border-ink/15">
                <summary className="micro flex cursor-pointer list-none items-center justify-between py-4 text-[10.5px] [&::-webkit-details-marker]:hidden">
                  Detalhes <span aria-hidden className="text-steel transition-transform duration-500 group-open:rotate-45">+</span>
                </summary>
                <ul className="pb-2">
                  {s.tags.map((t) => (
                    <li key={t} className="micro flex items-center gap-3 border-t border-ink/10 py-3 text-[10.5px] text-ink/75">
                      <span aria-hidden className="h-[6px] w-[6px] bg-signal" />
                      {t}
                    </li>
                  ))}
                </ul>
              </details>

              <a data-text href={`servicos.html#${s.id}`} className="micro underline-link mt-4 inline-flex items-center gap-3 pb-1">
                Ver o serviço <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </a>
            </article>
          ))}
        </div>

        <div data-fade className="mt-24 flex justify-center">
          <a href="servicos.html" className="btn btn-dark micro">Ver todos os serviços <span aria-hidden>→</span></a>
        </div>
      </div>
    </section>
  )
}
