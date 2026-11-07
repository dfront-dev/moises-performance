import { useRef } from 'react'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

export default function PageHeader({ label, lines, intro, classes = [], image, imageAlt = '', imagePos = '50% 30%', tone = 'paper' }) {
  const paper = tone === 'paper'
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from(q('[data-line]'), { yPercent: 118, duration: 1.3, stagger: 0.12 }, 0.1)
      .from(q('[data-fade]'), { opacity: 0, y: 20, duration: 0.9, stagger: 0.1 }, 0.5)
  })

  return (
    <section ref={ref} className={`relative isolate overflow-hidden pb-16 pt-40 md:pb-24 md:pt-56 ${paper ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}>
      {image && (
        <div aria-hidden data-fade className="absolute inset-0 -z-20 md:left-[34%]">
          <picture>
            <source srcSet={`images/${image}.webp`} type="image/webp" />
            <img src={`images/${image}.jpg`} alt={imageAlt} decoding="async" className="photo h-full w-full object-cover" style={{ objectPosition: imagePos }} />
          </picture>
          <div className="tint absolute inset-0" />
          <div className={`absolute inset-0 bg-gradient-to-r ${paper ? 'from-paper via-paper/60 to-paper/10' : 'from-ink via-ink/55 to-ink/10'}`} />
          <div className={`absolute inset-0 bg-gradient-to-t ${paper ? 'from-paper via-transparent to-paper/50' : 'from-ink via-transparent to-ink/50'}`} />
          <div className={`absolute inset-0 md:hidden ${paper ? 'bg-paper/55' : 'bg-ink/40'}`} />
        </div>
      )}

      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className={`section-index h-px ${paper ? 'bg-ink/20' : 'bg-paper/20'}`} />

        <h1 aria-label={lines.join(' ')} className="display mt-14 text-[clamp(2.34rem,6.24vw,7.8rem)] md:mt-20">
          <Lines lines={lines} classes={classes} />
        </h1>

        {intro && (
          <p data-fade className={`mt-10 max-w-xl border-l-[3px] border-signal pl-5 text-lg leading-snug md:mt-14 md:text-xl ${paper ? 'text-ink/80' : 'text-paper/85'}`}>
            {intro}
          </p>
        )}
      </div>
    </section>
  )
}
