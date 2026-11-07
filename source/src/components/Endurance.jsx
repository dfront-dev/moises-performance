import { useRef } from 'react'
import { endurance as c } from '../data/content'
import { Lines } from '../lib/split'
import Quote from './Quote'
import { useGsap, gsap } from '../lib/useGsap'

export default function Endurance() {
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 118, duration: 1.3, stagger: 0.12, ease: 'power4.out',
      scrollTrigger: { trigger: q('h2')[0], start: 'top 82%' },
    })
    gsap.from(q('[data-fade]'), {
      opacity: 0, y: 24, duration: 1, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: q('[data-fade]')[0], start: 'top 88%' },
    })
  })

  return (
    <section id="endurance" ref={ref} className="relative bg-paper py-28 text-ink md:py-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-ink/20" />
        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:items-start">
          <div className="md:col-span-6">
            <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(2.8rem,7.4vw,8.6rem)]">
              <Lines lines={c.lines} classes={['', 'text-[#007b6c]', 'text-[#007b6c]']} />
            </h2>
            <p data-fade className="mt-10 max-w-lg border-l-[3px] border-signal pl-5 text-lg leading-snug text-ink/80">{c.text}</p>
          </div>
          <div className="md:col-span-6 md:pt-6">
            <Quote tone="paper" />
          </div>
        </div>
      </div>
    </section>
  )
}
