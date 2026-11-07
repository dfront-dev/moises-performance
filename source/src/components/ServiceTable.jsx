import { useRef } from 'react'
import { services, serviceRows } from '../data/services'
import { EMAIL } from '../data/content'
import { useGsap, gsap } from '../lib/useGsap'

const mail = (s) => `mailto:${EMAIL}?subject=${encodeURIComponent(s.subject)}`

export default function ServiceTable() {
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-col-head]'), {
      yPercent: 30, opacity: 0, duration: 1, stagger: 0.12, ease: 'power4.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    })
    q('[data-row]').forEach((row) => {
      gsap.from(row.children, {
        opacity: 0, y: 18, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 92%' },
      })
    })
    gsap.from(q('[data-card-m]'), {
      opacity: 0, y: 40, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: q('[data-card-m]')[0], start: 'top 88%' },
    })
  })

  return (
    <section ref={ref} className="relative bg-ink pb-24 pt-6 text-paper md:pb-32">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        {/* desktop: comparison table */}
        <table className="hidden w-full border-separate border-spacing-x-3 lg:table">
          <caption className="sr-only">Comparação dos três serviços</caption>
          <thead>
            <tr>
              <td className="w-[13%]" />
              {services.map((s) => (
                <th key={s.id} scope="col" data-col-head className="bg-signal px-7 pb-8 pt-7 text-left align-bottom text-ink">
                  <span className="micro block text-[10px] opacity-75">{s.verb}</span>
                  <span className="display mt-5 block whitespace-nowrap text-[clamp(1.5rem,2.3vw,3rem)] leading-[0.92]">{s.short}</span>
                  <span className="mt-3 block text-[13px] font-medium leading-snug normal-case">{s.full}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {serviceRows.map(([label, k]) => (
              <tr key={k} data-row>
                <th scope="row" className="micro border-b border-paper/10 py-7 pr-4 text-left align-top text-[10.5px] text-signal">{label}</th>
                {services.map((s) => (
                  <td key={s.id} className="col-fill border-b border-paper/10 px-7 py-7 align-top text-[17px] leading-snug">
                    {s[k]}
                  </td>
                ))}
              </tr>
            ))}
            <tr data-row>
              <td />
              {services.map((s) => (
                <td key={s.id} className="pt-6">
                  <a href={mail(s)} className="btn btn-solid micro w-full justify-between">
                    Falar sobre este serviço <span aria-hidden>→</span>
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* mobile and tablet: stacked cards */}
        <div className="grid gap-10 lg:hidden">
          {services.map((s) => (
            <article key={s.id} data-card-m>
              <div className="bg-signal px-6 pb-7 pt-6 text-ink">
                <span className="micro block text-[10px] opacity-75">{s.verb}</span>
                <h2 className="display mt-4 text-[2.2rem] leading-[0.92]">{s.short}</h2>
                <p className="mt-3 text-[13px] font-medium leading-snug">{s.full}</p>
              </div>
              <dl className="col-fill">
                {serviceRows.map(([label, k]) => (
                  <div key={k} className="border-b border-paper/10 px-6 py-5">
                    <dt className="micro mb-2 text-[10px] text-signal">{label}</dt>
                    <dd className="text-[17px] leading-snug">{s[k]}</dd>
                  </div>
                ))}
              </dl>
              <a href={mail(s)} className="btn btn-solid micro mt-4 w-full justify-between">
                Falar sobre este serviço <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
