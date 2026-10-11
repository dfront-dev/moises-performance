import { useRef } from 'react'
import { differentiators as c } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

export default function Differentiators() {
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
    q('[data-item]').forEach((el) => {
      gsap.from(el.querySelector('[data-rule]'), { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 86%' } })
      gsap.from(el.querySelectorAll('[data-body]'), { opacity: 0, y: 18, stagger: 0.08, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%' } })
    })
  })

  return (
    <section ref={ref} className="relative bg-paper py-28 text-ink md:py-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-ink/20" />
        <h2 aria-label={c.lines.join(' ')} className="display mt-14 text-[clamp(2.8rem,8vw,9.5rem)] md:mt-20">
          <Lines lines={c.lines} classes={['', 'deep-signal']} />
        </h2>
        <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-3 md:gap-8">
          {c.items.map((it) => (
            <div key={it.n} data-item className="relative pt-6">
              <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-signal" />
              <span data-body className="display text-[clamp(3rem,5vw,5.5rem)] leading-none text-[#007b6c]">{it.n}</span>
              <h3 data-body className="display mt-6 text-[clamp(1.6rem,2.3vw,2.4rem)] leading-none">{it.title}</h3>
              <p data-body className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink/70">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
