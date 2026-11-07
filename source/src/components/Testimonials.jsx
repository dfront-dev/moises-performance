import { useRef } from 'react'
import { testimonials, placeholders } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

export default function Testimonials() {
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 118, duration: 1.3, stagger: 0.12, ease: 'power4.out',
      scrollTrigger: { trigger: q('h2')[0], start: 'top 85%' },
    })
    gsap.from(q('[data-fade]'), {
      opacity: 0, y: 24, duration: 1, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('[data-fade]')[0], start: 'top 90%' },
    })
    q('[data-card]').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } })
    })
  })

  return (
    <section id="testemunhos" ref={ref} className="relative bg-paper py-28 text-ink md:py-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-ink/20" />

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <h2 aria-label="Impacto nos atletas" className="display text-[clamp(2.8rem,8vw,9.5rem)] md:col-span-12">
            <Lines lines={['Impacto', 'nos atletas.']} classes={['', 'text-[#007b6c]']} />
          </h2>
        </div>

        <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} data-card className="relative border border-ink/15 border-t-[4px] border-t-signal bg-white p-8 md:col-span-2 lg:col-span-1">
              <span aria-hidden className="display block text-6xl leading-none text-[#007b6c]">"</span>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-ink">{t.quote}</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span aria-hidden className="grid h-11 w-11 place-items-center bg-signal text-[12px] font-bold text-ink">{t.initials}</span>
                <span>
                  <span className="block text-sm font-bold">{t.name}</span>
                  <span className="micro text-[10px] text-ink/60">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
          {placeholders.map(([name, role], i) => (
            <figure key={i} data-card className="relative border border-ink/15 border-t-[4px] border-t-signal bg-white p-8">
              <span className="micro absolute -top-3 right-5 bg-steel px-3 py-1 text-[10px] text-ink">Exemplo</span>
              <span aria-hidden className="display block text-6xl leading-none text-[#007b6c]">"</span>
              <blockquote className="mt-4 min-h-24 text-[15px] italic leading-relaxed text-ink/70">
                Espaço reservado para testemunho real, a substituir por citação autorizada do atleta ou federação.
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span aria-hidden className="grid h-11 w-11 place-items-center border border-dashed border-ink/30 text-[11px] text-ink/50">JM</span>
                <span>
                  <span className="block text-sm font-bold">{name}</span>
                  <span className="micro text-[10px] text-ink/60">{role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  )
}
