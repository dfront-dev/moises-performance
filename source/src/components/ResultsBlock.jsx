import { useRef } from 'react'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

export default function ResultsBlock({ data, tone = 'ink' }) {
  const ref = useRef(null)
  const dark = tone === 'ink'

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 118, duration: 1.3, stagger: 0.12, ease: 'power4.out',
      scrollTrigger: { trigger: q('h2')[0], start: 'top 82%' },
    })
    gsap.from(q('[data-fade]'), {
      opacity: 0, y: 24, duration: 1, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('[data-fade]')[0], start: 'top 88%' },
    })
    q('[data-photo]').forEach((el) => {
      gsap.from(el, { clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 85%' } })
      gsap.to(el.querySelector('img'), { yPercent: -6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
    q('[data-rowset]').forEach((set) => {
      gsap.from(set.querySelectorAll('li'), {
        opacity: 0, y: 16, duration: 0.7, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: set, start: 'top 85%' },
      })
    })
  })

  const hair = dark ? 'border-paper/15' : 'border-ink/15'
  const sub = dark ? 'text-paper/65' : 'text-ink/65'

  return (
    <section
      id={data.id}
      ref={ref}
      className={`relative py-28 md:py-44 ${dark ? 'bg-ink text-paper' : 'bg-paper text-ink'}`}
    >
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <p data-fade className={`micro section-index flex justify-between border-t pt-4 ${dark ? 'border-paper/20' : 'border-ink/20'}`}>
          <span>{data.index}</span>
          <span className={dark ? 'text-steel' : 'text-ink/60'}>JMP</span>
        </p>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <h2 aria-label={data.lines.join(' ')} className="display text-[clamp(3rem,9vw,10.5rem)] md:col-span-8">
            <Lines lines={data.lines} classes={['', dark ? 'text-signal' : 'deep-signal']} />
          </h2>
          <p data-fade className={`max-w-md text-base leading-relaxed md:col-span-4 md:justify-self-end ${sub}`}>{data.intro}</p>
        </div>

        <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <div data-photo className="card group relative aspect-[4/5] overflow-hidden bg-ink">
                <picture>
                  <source srcSet={`images/${data.image}.webp`} type="image/webp" />
                  <img src={`images/${data.image}.jpg`} alt={data.alt} loading="lazy" decoding="async" className="photo absolute inset-0 h-[112%] w-full object-cover" />
                </picture>
                <div aria-hidden className="tint absolute inset-0" />
                <span aria-hidden className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-signal" />
                <span aria-hidden className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-signal" />
              </div>
            </div>
          </div>

          <div className="space-y-20 md:col-span-7">
            {data.blocks.map((b) => (
              <div key={b.label}>
                <p data-fade className="micro inline-block bg-signal px-3 py-2 text-[10.5px] text-ink">{b.label}</p>
                <h3 data-fade className="display mt-6 max-w-2xl text-[clamp(1.7rem,2.8vw,3rem)] leading-[0.95]">{b.title}</h3>
                <ul data-rowset className={`mt-8 border-t ${hair}`}>
                  {b.rows.map(([who, what]) => (
                    <li key={who + what} className={`group grid gap-1 border-b py-5 transition-colors hover:bg-signal/10 md:grid-cols-12 md:gap-6 ${hair}`}>
                      <span className="text-lg font-bold leading-snug md:col-span-5">{who}</span>
                      <span className={`micro self-center text-[10.5px] leading-relaxed md:col-span-7 md:text-right ${dark ? 'text-paper/75' : 'text-ink/75'}`}>{what}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {data.image2 && (
              <div data-photo className="card group relative aspect-[4/3] overflow-hidden bg-ink">
                <picture>
                  <source srcSet={`images/${data.image2}.webp`} type="image/webp" />
                  <img src={`images/${data.image2}.jpg`} alt={data.alt2} loading="lazy" decoding="async" className="photo absolute inset-0 h-[112%] w-full object-cover" />
                </picture>
                <div aria-hidden className="tint absolute inset-0" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
