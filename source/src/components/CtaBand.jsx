import { useRef } from 'react'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'
import Arrow from './Arrow'

export default function CtaBand({ lines, text, primary, secondary }) {
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 118, duration: 1.2, stagger: 0.1, ease: 'power4.out',
      scrollTrigger: { trigger: q('h2')[0], start: 'top 85%' },
    })
    gsap.from(q('[data-fade]'), {
      opacity: 0, y: 20, duration: 0.9, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('[data-fade]')[0], start: 'top 90%' },
    })
  })

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-signal py-24 text-ink md:py-36">
      <div aria-hidden className="absolute -right-[4%] top-0 -z-10 hidden h-full w-[16vw] -skew-x-[18deg] bg-ink/10 md:block" />
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <h2 aria-label={lines.join(' ')} className="display text-[clamp(1.87rem,4.8vw,5.7rem)]">
          <Lines lines={lines} />
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-12 md:items-end">
          {text && <p data-fade className="max-w-md text-lg leading-snug md:col-span-6">{text}</p>}
          <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
            <a data-fade href={primary.href} className="btn btn-ink-on-signal micro">{primary.label} <Arrow /></a>
            {secondary && (
              <a data-fade href={secondary.href} className="btn micro border border-ink/50 text-ink hover:border-ink hover:bg-ink hover:text-signal">{secondary.label}</a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
