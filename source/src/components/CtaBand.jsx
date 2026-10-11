import { useRef } from 'react'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

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
      <div className="mx-auto grid max-w-[1680px] gap-10 px-5 md:grid-cols-12 md:items-end md:px-10">
        <h2 aria-label={lines.join(' ')} className="display text-[clamp(2.6rem,8vw,9.5rem)] md:col-span-8">
          <Lines lines={lines} />
        </h2>
        <div className="md:col-span-4">
          {text && <p data-fade className="mb-8 max-w-xs text-lg leading-snug">{text}</p>}
          <div className="flex flex-wrap gap-3">
            <a data-fade href={primary.href} className="btn btn-ink-on-signal micro">{primary.label} <span aria-hidden>→</span></a>
            {secondary && (
              <a data-fade href={secondary.href} className="btn micro border border-ink/50 text-ink hover:border-ink hover:bg-ink hover:text-signal">{secondary.label}</a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
