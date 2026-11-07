import { useRef } from 'react'
import { system as c, differentiators as d } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

export default function System({ merge = false }) {
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
    q('[data-merge-item]').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
    })
    q('[data-step]').forEach((el) => {
      const rule = el.querySelector('[data-rule]')
      const num = el.querySelector('[data-num]')
      const body = el.querySelectorAll('[data-body]')
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 86%' }, defaults: { ease: 'power3.out' } })
      tl.from(rule, { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power3.inOut' })
        .from(num, { yPercent: 40, opacity: 0, duration: 1 }, 0.1)
        .from(body, { opacity: 0, y: 18, stagger: 0.08, duration: 0.8 }, 0.35)
    })
  })

  return (
    <section id="metodo" ref={ref} className="relative bg-paper py-28 text-ink md:py-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-ink/20" />

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(2.34rem,5.64vw,6.6rem)] md:col-span-12">
            <Lines lines={c.lines} />
          </h2>
          <p data-fade className="max-w-sm text-base leading-relaxed text-ink/70 md:col-span-5 md:col-start-8">
            {c.intro}
          </p>
        </div>

        <ol className="mt-20 grid gap-x-8 gap-y-16 md:mt-32 md:grid-cols-2 lg:grid-cols-3">
          {c.steps.map((s) => (
            <li key={s.n} data-step className="group relative pt-6">
              <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/20" />
              <span aria-hidden className="absolute -top-[1px] left-0 h-[2px] w-10 bg-signal" />
              <div className="flex items-start justify-between">
                <span data-num className="display block text-[clamp(1.7rem,2.4vw,2.6rem)] text-ink/45">
                  {s.n}
                </span>
                <span data-body className="micro mt-3 text-steel">{s.tag}</span>
              </div>
              <h3 data-body className="display subhead mt-6 text-[clamp(1.4rem,2.1vw,2.1rem)]">{s.title}</h3>
              <p data-body className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink/65">{s.text}</p>
            </li>
          ))}
        </ol>

        {merge && (
          <div className="mt-24 border-t border-ink/20 pt-12 md:mt-32 md:grid md:grid-cols-12 md:gap-10 md:pt-16">
            <h3 aria-label={d.lines.join(' ')} className="display subhead text-[clamp(1.6rem,2.6vw,2.8rem)] md:col-span-4">
              <span className="block">{d.lines[0]}</span>
              <span className="block text-ink/50">{d.lines[1]}</span>
            </h3>
            <ul className="mt-10 grid gap-10 md:col-span-8 md:mt-0 md:grid-cols-3 md:gap-8">
              {d.items.map((it) => (
                <li key={it.title} data-merge-item>
                  <span aria-hidden className="block h-[3px] w-10 bg-signal" />
                  <h4 className="display subhead mt-5 text-[clamp(1.1rem,1.5vw,1.5rem)]">{it.title}</h4>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
