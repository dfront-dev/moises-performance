import { useRef } from 'react'
import { programs, programRows } from '../data/programs'
import { EMAIL } from '../data/content'
import { useGsap, gsap } from '../lib/useGsap'

const mail = (p) => `mailto:${EMAIL}?subject=${encodeURIComponent(p.subject)}`

function Cell({ p, k, big }) {
  if (k === 'services')
    return (
      <ul className="space-y-2">
        {p.services.map((s) => (
          <li key={s} className="flex items-start gap-3 text-[17px] leading-snug">
            <span aria-hidden className="mt-[9px] h-[7px] w-[7px] shrink-0 -skew-x-12 bg-signal" />
            {s}
          </li>
        ))}
      </ul>
    )
  if (k === 'cadence') return <p className="display text-3xl normal-case">{p.cadence}</p>
  return <p className="text-[17px] leading-snug">{p[k]}</p>
}

export default function ProgramTable() {
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
    <section ref={ref} className="relative bg-ink pb-28 pt-6 text-paper md:pb-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        {/* desktop: comparison table */}
        <table className="hidden w-full border-separate border-spacing-x-3 lg:table">
          <caption className="sr-only">Comparação dos programas JMP</caption>
          <thead>
            <tr>
              <td className="w-[13%]" />
              {programs.map((p) => (
                <th key={p.id} id={p.id} scope="col" data-col-head className="scroll-mt-28 bg-signal px-7 pb-8 pt-7 text-left align-bottom text-ink">
                  <span className="micro block text-[10px] opacity-70">Programa {p.n}</span>
                  <span className="display mt-5 block text-[clamp(1.9rem,2.7vw,3.2rem)] leading-[0.92]">{p.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {programRows.map(([label, k]) => (
              <tr key={k} data-row>
                <th scope="row" className="micro border-b border-paper/10 py-7 pr-4 text-left align-top text-[10.5px] text-signal">{label}</th>
                {programs.map((p) => (
                  <td key={p.id} className={`col-fill border-b border-paper/10 px-7 align-top py-7`}>
                    <Cell p={p} k={k} big />
                  </td>
                ))}
              </tr>
            ))}
            <tr data-row>
              <td />
              {programs.map((p) => (
                <td key={p.id} className="pt-6">
                  <a href={mail(p)} className="btn btn-solid micro w-full justify-between">
                    Falar sobre este programa <span aria-hidden>→</span>
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* mobile and tablet: stacked cards */}
        <div className="grid gap-10 lg:hidden">
          {programs.map((p) => (
            <article key={p.id} id={`${p.id}-m`} data-card-m className="scroll-mt-24">
              <div className="bg-signal px-6 pb-7 pt-6 text-ink">
                <span className="micro block text-[10px] opacity-70">Programa {p.n}</span>
                <h2 className="display mt-4 text-[2.4rem] leading-[0.92]">{p.name}</h2>
              </div>
              <dl className="col-fill">
                {programRows.map(([label, k]) => (
                  <div key={k} className="border-b border-paper/10 px-6 py-5">
                    <dt className="micro mb-2 text-[10px] text-signal">{label}</dt>
                    <dd><Cell p={p} k={k} /></dd>
                  </div>
                ))}
              </dl>
              <a href={mail(p)} className="btn btn-solid micro mt-4 w-full justify-between">
                Falar sobre este programa <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
