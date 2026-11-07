import { useRef } from 'react'
import { system as c, differentiators as d } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

export default function System({ merge = false }) {
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
    q('[data-merge-item]').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
    })
    q('[data-step]').forEach((el) => {
      const rule = el.querySelector('[data-rule]')
      const num = el.querySelector('[data-num]')
      const body = el.querySelectorAll('[data-body]')
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 86%' }, defaults: { ease: 'power3.out' } })
      tl.from(rule, { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power4.inOut' })
        .from(num, { yPercent: 40, opacity: 0, duration: 1 }, 0.1)
        .from(body, { opacity: 0, y: 18, stagger: 0.08, duration: 0.8 }, 0.35)
    })
  })

  return (
    <section id="metodo" ref={ref} className="relative bg-ink py-28 text-paper md:py-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-paper/20" />

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(3rem,9.4vw,11rem)] md:col-span-12">
            <Lines lines={c.lines} />
          </h2>
          <p data-fade className="max-w-sm text-base leading-relaxed text-paper/70 md:col-span-5 md:col-start-8">
            {c.intro}
          </p>
        </div>

        <ol className="mt-20 grid gap-x-8 gap-y-16 md:mt-32 md:grid-cols-2 lg:grid-cols-3">
          {c.steps.map((s) => (
            <li key={s.n} data-step className="group relative pt-6">
              <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-signal/70" />
              <span aria-hidden className="absolute -top-[5px] left-0 h-[10px] w-[10px] bg-signal" />
              <div className="flex items-start justify-between">
                <span data-num className="outline-num display block text-[clamp(5rem,9vw,10rem)] text-signal transition-all duration-500 group-hover:[-webkit-text-fill-color:var(--color-signal)]">
                  {s.n}
                </span>
                <span data-body className="micro mt-3 text-signal/80">{s.tag}</span>
              </div>
              <h3 data-body className="display subhead mt-6 text-[clamp(1.4rem,2.1vw,2.1rem)]">{s.title}</h3>
              <p data-body className="mt-4 max-w-xs text-[15px] leading-relaxed text-paper/65">{s.text}</p>
            </li>
          ))}
        </ol>

        {merge && (
          <div className="mt-24 border-t border-paper/20 pt-12 md:mt-32 md:grid md:grid-cols-12 md:gap-10 md:pt-16">
            <h3 aria-label={d.lines.join(' ')} className="display subhead text-[clamp(1.6rem,2.6vw,2.8rem)] md:col-span-4">
              <span className="block">{d.lines[0]}</span>
              <span className="block text-signal">{d.lines[1]}</span>
            </h3>
            <ul className="mt-10 grid gap-10 md:col-span-8 md:mt-0 md:grid-cols-3 md:gap-8">
              {d.items.map((it) => (
                <li key={it.title} data-merge-item>
                  <span aria-hidden className="block h-[3px] w-10 bg-signal" />
                  <h4 className="display subhead mt-5 text-[clamp(1.1rem,1.5vw,1.5rem)]">{it.title}</h4>
                  <p className="mt-3 text-[15px] leading-relaxed text-paper/70">{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
