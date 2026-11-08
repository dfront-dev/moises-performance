import { useRef } from 'react'
import PageHeader from './PageHeader'
import Layout from './Layout'
import { updated } from '../data/legal'
import { useGsap, gsap } from '../lib/useGsap'
import Arrow from './Arrow'

export default function LegalPage({ page, label, lines, data }) {
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    q('[data-sec]').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
    })
  })

  return (
    <Layout page={page}>
      <PageHeader label={label} lines={lines} classes={['', 'text-signal']} intro={data.intro} />
      <section ref={ref} className="bg-paper py-24 text-ink md:py-36">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-5 md:grid-cols-12 md:px-10">
          <p className="micro text-[10.5px] text-ink/70 md:col-span-3">Última atualização: {updated}</p>
          <div className="space-y-14 md:col-span-8 md:col-start-5">
            {data.sections.map((s, i) => (
              <article key={s.title} data-sec>
                <h2 className="display text-[clamp(1.4rem,2vw,2.1rem)] leading-[1] ">
                  <span aria-hidden className="mr-3 inline-block h-[10px] w-[10px] -skew-x-12 bg-signal align-middle" />
                  {s.title}
                </h2>
                <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-ink/80">
                  {s.paras.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {s.list && (
                    <ul className="space-y-2.5 pl-1">
                      {s.list.map((l) => (
                        <li key={l} className="flex gap-3">
                          <span aria-hidden className="mt-[10px] h-[6px] w-[6px] shrink-0 -skew-x-12 bg-signal" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.after && <p>{s.after}</p>}
                  {s.link && (
                    <a href={s.link.href} className="micro underline-link inline-block pb-1 text-ink">{s.link.label} <Arrow className="ml-1.5" /></a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
