import { useRef } from 'react'
import { philosophy as c } from '../data/content'
import { Lines, Words } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

export default function Philosophy() {
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 118, duration: 1.3, stagger: 0.12, ease: 'power4.out',
      scrollTrigger: { trigger: q('h2')[0], start: 'top 82%' },
    })
    gsap.fromTo(
      q('.word'),
      { opacity: 0.14 },
      {
        opacity: 1, ease: 'none', stagger: 0.12,
        scrollTrigger: { trigger: q('[data-words]')[0], start: 'top 82%', end: 'bottom 52%', scrub: true },
      }
    )
    gsap.from(q('[data-fade]'), {
      opacity: 0, y: 24, duration: 1, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: q('[data-fade]')[0], start: 'top 88%' },
    })
  })

  return (
    <section id="filosofia" ref={ref} className="relative bg-paper py-28 text-ink md:py-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <p data-fade className="micro flex justify-between border-t border-ink/20 pt-4">
          <span>{c.index}</span>
          <span className="text-ink/50">JMP</span>
        </p>

        <h2 aria-label={c.lines.join(' ')} className="display mt-14 text-[clamp(3.6rem,14.5vw,17rem)] md:mt-20">
          <Lines lines={c.lines} />
        </h2>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
          <p data-words className="text-[clamp(1.55rem,3.3vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.02em] md:col-span-8 md:col-start-5">
            <Words text={c.statement} />
          </p>
          <p data-fade className="max-w-sm border-l-2 border-signal pl-5 text-base leading-relaxed text-ink/70 md:col-span-3 md:col-start-5">
            {c.note}
          </p>
        </div>
      </div>
    </section>
  )
}
