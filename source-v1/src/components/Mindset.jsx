import { useRef } from 'react'
import { mindset as c } from '../data/content'
import { useGsap, gsap } from '../lib/useGsap'

export default function Mindset() {
  const ref = useRef(null)

  useGsap(ref, ({ q, desktop }) => {
    if (desktop) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=140%', pin: true, scrub: 0.6, anticipatePin: 1 },
      })
      tl.fromTo(q('[data-a]'), { xPercent: 14, filter: 'blur(14px)', opacity: 0.2 }, { xPercent: -26, filter: 'blur(0px)', opacity: 1, ease: 'none' }, 0)
        .fromTo(q('[data-b]'), { xPercent: -34, filter: 'blur(14px)', opacity: 0.2 }, { xPercent: 4, filter: 'blur(0px)', opacity: 1, ease: 'none' }, 0)
        .fromTo(q('[data-rule]'), { scaleX: 0 }, { scaleX: 1, ease: 'none', transformOrigin: 'left' }, 0)
        .fromTo(q('[data-word]'), { opacity: 0.2 }, { opacity: 1, stagger: 0.3, ease: 'none' }, 0.1)
    } else {
      gsap.from(q('[data-a], [data-b]'), {
        opacity: 0, y: 40, stagger: 0.18, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
    }
  })

  return (
    <section id="mentalidade" ref={ref} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-signal py-24 text-ink lg:py-0">
      <div className="relative">
        <p data-a aria-label={c.lines[0]} className="display whitespace-normal px-5 text-[clamp(3.4rem,17vw,21rem)] text-ink/30 lg:whitespace-nowrap lg:px-10">
          {c.lines[0]}
        </p>
        <span data-rule aria-hidden className="my-4 block h-[3px] w-full bg-ink lg:my-8" />
        <p data-b aria-label={c.lines[1]} className="display whitespace-normal px-5 text-[clamp(3.4rem,17vw,21rem)] text-ink lg:whitespace-nowrap lg:px-10">
          {c.lines[1]}
        </p>
      </div>
      <ul aria-label="Princípios" className="absolute inset-x-5 bottom-8 flex justify-between md:inset-x-10">
        {c.words.map((w, i) => (
          <li data-word key={w} className="micro flex items-center gap-3">
            <span aria-hidden className="text-ink/50">0{i + 1}</span>
            {w}
          </li>
        ))}
      </ul>
    </section>
  )
}
