import { useRef } from 'react'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

const Trophy = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
    <path d="M8 5.5H5.5a1 1 0 0 0-1 1V7a3 3 0 0 0 3 3H8" />
    <path d="M16 5.5h2.5a1 1 0 0 1 1 1V7a3 3 0 0 1-3 3H16" />
    <path d="M12 13v4M9 20h6M10 17h4v3" />
  </svg>
)

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
        <div aria-hidden data-fade className={`section-index h-px ${dark ? 'bg-paper/20' : 'bg-ink/20'}`} />

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <h2 aria-label={data.lines.join(' ')} className="display text-[clamp(3rem,9vw,10.5rem)] md:col-span-8">
            <Lines lines={data.lines} classes={['', dark ? 'text-signal' : 'deep-signal']} />
          </h2>
          {data.bullets ? (
            <ul data-fade className={`max-w-md space-y-3 md:col-span-4 md:justify-self-end ${sub}`}>
              {data.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-base leading-snug">
                  <span aria-hidden className="mt-[9px] h-[7px] w-[7px] shrink-0 -skew-x-12 bg-signal" />
                  {b}
                </li>
              ))}
            </ul>
          ) : (
            <p data-fade className={`max-w-md text-base leading-relaxed md:col-span-4 md:justify-self-end ${sub}`}>{data.intro}</p>
          )}
        </div>

        <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-12">
          {data.image && (
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
          )}

          <div className={`space-y-20 md:col-span-7 ${data.image ? '' : 'md:col-start-6'}`}>
            {data.blocks.map((b) => (
              <div key={b.label}>
                <p data-fade className="micro inline-block bg-signal px-3 py-2 text-[10.5px] text-ink">{b.label}</p>
                <h3 data-fade className="display mt-6 max-w-2xl text-[clamp(1.7rem,2.8vw,3rem)] leading-[0.95]">{b.title}</h3>
                <ul data-rowset className={`mt-8 border-t ${hair}`}>
                  {b.rows.map(([who, what]) => (
                    <li key={who + what} className={`group grid gap-1 border-b py-5 transition-colors hover:bg-signal/10 md:grid-cols-12 md:gap-6 ${hair}`}>
                      <span className="flex items-center gap-3 text-lg font-bold leading-snug md:col-span-5">
                        {b.trophy !== false && <span className={dark ? 'text-signal' : 'text-[#007b6c]'}><Trophy /></span>}
                        {who}
                      </span>
                      <span className={`micro self-center text-[10.5px] leading-relaxed md:col-span-7 md:text-right ${dark ? 'text-paper/75' : 'text-ink/75'}`}>{what}</span>
                    </li>
                  ))}
            {data.highlight && (
              <div data-fade className="bg-signal p-8 text-ink md:p-10">
                <p className="micro text-[10.5px]">{data.highlight.label}</p>
                <p className="display mt-4 text-[clamp(1.5rem,2.6vw,2.8rem)] leading-[0.98]">{data.highlight.text}</p>
              </div>
            )}
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
