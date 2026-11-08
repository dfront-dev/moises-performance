import { useRef, useState } from 'react'
import { services } from '../data/services'
import { EMAIL } from '../data/content'
import { useGsap, gsap } from '../lib/useGsap'
import Arrow from './Arrow'

const mail = (s) => `mailto:${EMAIL}?subject=${encodeURIComponent(s.subject)}`

const details = [
  ['Papel do João Moisés', 'role'],
  ['Tipo de relação', 'relation'],
  ['Formato', 'format'],
]

// Three services as an expandable list: name and one-line promise up front,
// the detail (role, relation, format) opens on demand, with a link to the full section below.
export default function ServiceTable() {
  const ref = useRef(null)
  const [open, setOpen] = useState(null)

  useGsap(ref, ({ q }) => {
    q('[data-svc]').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
    })
  })

  return (
    <section ref={ref} className="relative bg-paper pb-20 pt-6 text-ink md:pb-28">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <ul className="border-t border-ink/20">
          {services.map((s) => {
            const isOpen = open === s.id
            return (
              <li key={s.id} data-svc className="border-b border-ink/20">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`svc-${s.id}`}
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  className="group relative grid w-full gap-x-8 gap-y-3 py-9 pr-16 text-left md:grid-cols-12 md:items-center md:py-14 md:pr-0"
                >
                  <span className="micro text-steel md:col-span-3">{s.verb}</span>
                  <span className="md:col-span-7">
                    <span className="display block text-[clamp(1.5rem,7.6vw,2.4rem)] leading-[0.95] md:text-[clamp(1.7rem,3.0vw,3.3rem)] transition-colors duration-300 group-hover:text-ink/60">{s.short}</span>
                    <span className="mt-4 block max-w-2xl text-base leading-relaxed text-ink/60 md:text-lg">{s.desc}</span>
                  </span>
                  <span
                    aria-hidden
                    className={`absolute right-0 top-9 grid h-12 w-12 place-items-center border transition-colors duration-300 md:static md:col-span-2 md:top-auto md:justify-self-end ${isOpen ? 'border-ink bg-ink text-paper' : 'border-ink/25 text-ink group-hover:border-ink'}`}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={`transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`svc-${s.id}`}
                  role="region"
                  aria-label={s.short}
                  inert={!isOpen}
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-10 pb-12 md:grid-cols-12 md:gap-8 md:pb-16">
                      <dl className="grid gap-7 md:col-span-9 md:col-start-4 md:grid-cols-3 md:gap-8">
                        {details.map(([label, k]) => (
                          <div key={k} className="border-t border-ink/15 pt-4">
                            <dt className="micro text-steel">{label}</dt>
                            <dd className="mt-3 text-[17px] leading-snug">{s[k]}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="flex flex-wrap items-center gap-x-10 gap-y-4 md:col-span-9 md:col-start-4">
                        <a href={`#${s.id}`} className="micro underline-link pb-1">Ver o serviço ↓</a>
                        <a href={mail(s)} className="micro underline-link pb-1">Falar sobre este serviço <Arrow className="ml-1.5" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
