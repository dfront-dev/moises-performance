import { useRef } from 'react'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

export default function PageHeader({ label, lines, intro, classes = [] }) {
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from(q('[data-line]'), { yPercent: 118, duration: 1.3, stagger: 0.12 }, 0.1)
      .from(q('[data-slash]'), { scaleY: 0, transformOrigin: 'top', duration: 1.4, stagger: 0.12, ease: 'power4.inOut' }, 0)
      .from(q('[data-fade]'), { opacity: 0, y: 20, duration: 0.9, stagger: 0.1 }, 0.5)
    gsap.to(q('[data-slash]'), {
      yPercent: 14, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
    })
  })

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink pb-16 pt-40 text-paper md:pb-24 md:pt-56">
      <div aria-hidden data-slash className="absolute right-[2.5%] top-0 -z-10 hidden h-full w-[5.5vw] -skew-x-[16deg] bg-signal md:block" />
      <div aria-hidden data-slash className="absolute right-[calc(2.5%+7.5vw)] top-0 -z-10 hidden h-full w-[6px] -skew-x-[16deg] bg-paper/80 md:block" />

      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <p data-fade className="micro section-index flex items-center gap-3 border-t border-paper/20 pt-4 text-paper/70">
          <a href="index.html" className="transition-colors hover:text-signal">Início</a>
          <span aria-hidden className="text-signal">/</span>
          <span className="text-paper">{label}</span>
        </p>

        <h1 aria-label={lines.join(' ')} className="display mt-14 text-[clamp(3rem,10.4vw,13rem)] md:mt-20">
          <Lines lines={lines} classes={classes} />
        </h1>

        {intro && (
          <p data-fade className="mt-10 max-w-xl border-l-[3px] border-signal pl-5 text-lg leading-snug text-paper/85 md:mt-14 md:text-xl">
            {intro}
          </p>
        )}
      </div>
    </section>
  )
}
