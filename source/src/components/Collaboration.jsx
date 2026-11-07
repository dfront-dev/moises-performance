import { useRef } from 'react'
import { collaboration as c } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

export default function Collaboration() {
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
  })

  return (
    <section ref={ref} className="relative bg-paper py-28 text-ink md:py-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-ink/20" />
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(2.18rem,4.8vw,5.7rem)] md:col-span-7">
            <Lines lines={c.lines} classes={['', '', 'text-ink/50']} />
          </h2>
          <p data-fade className="max-w-md text-base leading-relaxed text-ink/70 md:col-span-5 md:justify-self-end">{c.intro}</p>
        </div>
        <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-3">
          {c.items.map((it, i) => (
            <div key={it.title} data-fade className="group border border-ink/10 border-t-signal/70 p-8 transition-colors hover:bg-ink/[0.04]">
              <span className="micro text-[10px] text-steel">0{i + 1}</span>
              <h3 className="display subhead mt-6 text-[clamp(1.3rem,1.8vw,1.85rem)]">{it.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
