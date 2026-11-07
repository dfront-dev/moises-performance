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
    <section id="testemunhos" ref={ref} className="relative bg-ink py-24 text-paper md:py-36">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-paper/20" />

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:items-end">
          <h2 aria-label="Impacto nos atletas" className="display title-soft text-[clamp(2.2rem,5vw,5.6rem)] md:col-span-12">
            <Lines lines={['Impacto', 'nos atletas.']} classes={['', 'text-signal/90']} />
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} data-card className="relative border border-paper/10 border-t-signal/50 bg-paper/[0.035] p-8 text-paper md:col-span-2 lg:col-span-1">
              <span aria-hidden className="display block text-4xl leading-none text-signal/60">"</span>
              <blockquote className="mt-4 text-[15px] font-light leading-relaxed text-paper/80">{t.quote}</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span aria-hidden className="grid h-10 w-10 place-items-center border border-paper/20 text-[11px] font-medium text-paper/70">{t.initials}</span>
                <span>
                  <span className="block text-sm font-medium text-paper/90">{t.name}</span>
                  <span className="micro text-[10px] text-paper/45">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
          {placeholders.map(([name, role], i) => (
            <figure key={i} data-card className="relative border border-paper/[0.07] border-t-paper/15 bg-paper/[0.02] p-8 text-paper">
              <span className="micro absolute right-5 top-4 text-[9px] text-paper/30">Exemplo</span>
              <span aria-hidden className="display block text-4xl leading-none text-paper/20">"</span>
              <blockquote className="mt-4 min-h-24 text-[15px] font-light italic leading-relaxed text-paper/40">
                Espaço reservado para testemunho real, a substituir por citação autorizada do atleta ou federação.
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span aria-hidden className="grid h-10 w-10 place-items-center border border-dashed border-paper/15 text-[11px] text-paper/30">JM</span>
                <span>
                  <span className="block text-sm font-medium text-paper/50">{name}</span>
                  <span className="micro text-[10px] text-paper/30">{role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  )
}
