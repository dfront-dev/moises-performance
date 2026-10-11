import { useRef } from 'react'
import { collaboration as c } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

export default function Collaboration() {
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
  })

  return (
    <section ref={ref} className="relative bg-ink py-28 text-paper md:py-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-paper/20" />
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(2.8rem,8vw,9.5rem)] md:col-span-7">
            <Lines lines={c.lines} classes={['', '', 'text-signal']} />
          </h2>
          <p data-fade className="max-w-md text-base leading-relaxed text-paper/70 md:col-span-5 md:justify-self-end">{c.intro}</p>
        </div>
        <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-3">
          {c.items.map((it, i) => (
            <div key={it.title} data-fade className="group border border-paper/15 border-t-[4px] border-t-signal p-8 transition-colors hover:bg-paper/[0.04]">
              <span className="micro text-[10px] text-signal">0{i + 1}</span>
              <h3 className="display mt-6 text-[clamp(1.5rem,2vw,2.1rem)] leading-none">{it.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-paper/70">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
