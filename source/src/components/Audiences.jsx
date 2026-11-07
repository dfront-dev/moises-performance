import { useRef } from 'react'
import { audiences as c } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

export default function Audiences() {
  const ref = useRef(null)

  useGsap(ref, ({ q, desktop }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('h2')[0], start: 'top 82%' },
    })
    gsap.from(q('[data-fade]'), {
      opacity: 0, y: 24, duration: 1, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('[data-fade]')[0], start: 'top 88%' },
    })
    q('[data-item]').forEach((el, i) => {
      gsap.from(el, { opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
      if (!desktop) return
      // the three squares lean in perspective and level out as they pass the middle of the screen
      gsap.fromTo(el, { rotateY: (1 - i) * 12, rotateX: 7, y: 50 }, { rotateY: (i - 1) * 12, rotateX: -7, y: -30, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
    })
  })

  return (
    <section id="parceria" ref={ref} className="relative bg-paper-2 py-28 text-ink md:py-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-ink/20" />
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(2.18rem,4.8vw,5.7rem)] md:col-span-7">
            <Lines lines={c.lines} classes={['', 'text-ink/50', 'text-ink/50']} />
          </h2>
          <p data-fade className="max-w-md text-base leading-relaxed text-ink/65 md:col-span-5 md:justify-self-end">{c.intro}</p>
        </div>

        <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-3" style={{ perspective: 1400 }}>
          {c.items.map((it) => (
            <a key={it.title} data-item href={it.href} className="group flex flex-col border border-ink/10 border-t-signal/70 p-8 transition-colors hover:bg-ink/[0.04]">
              <h3 className="display subhead text-[clamp(1.3rem,1.8vw,1.9rem)]">{it.title}</h3>
              <p className="mt-5 flex-grow text-[15px] leading-relaxed text-ink/65">{it.text}</p>
              <span className="micro mt-8 inline-flex items-center gap-3 text-ink">
                {it.cta} <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
