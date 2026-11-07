import { useEffect, useRef, useState } from 'react'
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

export default function ResultsBlock({ data, tone = 'ink', saturated = false, compact = false }) {
  const ref = useRef(null)
  const tip = useRef(null)
  const [photo, setPhoto] = useState(null)
  const [idx, setIdx] = useState(0)
  const pics = photo ? [].concat(photo) : []

  useEffect(() => {
    setIdx(0)
    if (pics.length < 2) return
    const t = setInterval(() => setIdx((i) => (i + 1) % pics.length), 1400)
    return () => clearInterval(t)
  }, [photo]) // eslint-disable-line react-hooks/exhaustive-deps
  const dark = tone === 'ink'

  useGsap(ref, ({ q }) => {
    if (q('[data-line]').length) {
      gsap.from(q('[data-line]'), {
        yPercent: 118, duration: 1.3, stagger: 0.12, ease: 'power4.out',
        scrollTrigger: { trigger: q('h2')[0], start: 'top 82%' },
      })
    }
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

  const move = (e) => {
    const el = tip.current
    if (!el) return
    const w = 288, h = 192, gap = 28
    let x = e.clientX + gap
    if (x + w > window.innerWidth - 12) x = e.clientX - gap - w
    const y = Math.min(Math.max(12, e.clientY - h / 2), window.innerHeight - h - 12)
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const hair = dark ? 'border-paper/15' : 'border-ink/15'
  const sub = dark ? 'text-paper/65' : 'text-ink/65'

  return (
    <section
      id={data.id}
      ref={ref}
      className={`relative ${compact ? 'py-20 md:py-28' : 'py-28 md:py-44'} ${dark ? 'bg-ink text-paper' : 'bg-paper text-ink'}`}
    >
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className={`section-index h-px ${dark ? 'bg-paper/20' : 'bg-ink/20'}`} />

        {compact ? (
          <div className="mt-14 flex flex-col gap-6 md:mt-16 md:flex-row md:items-start md:gap-10">
            <h2 className="sr-only">{data.lines.join(' ')}</h2>
            <p data-fade className="micro inline-block shrink-0 self-start bg-signal px-3 py-2 text-[10.5px] text-ink">{data.blocks[0].label}</p>
            {data.intro && (
              <p data-fade className={`max-w-3xl text-base leading-relaxed md:text-lg md:leading-relaxed ${sub}`}>{data.intro}</p>
            )}
          </div>
        ) : (
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
            <h2 aria-label={data.lines.join(' ')} className="display text-[clamp(3rem,9vw,10.5rem)] md:col-span-8">
              <Lines lines={data.lines} classes={['', dark || saturated ? 'text-signal' : 'deep-signal']} />
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
        )}

        <div className={`grid gap-16 md:grid-cols-12 ${compact ? 'mt-10 md:mt-12' : 'mt-20 md:mt-28'}`}>
          <div className="space-y-20 md:col-span-12">
            {data.blocks.map((b) => (
              <div key={b.label}>
                {!compact && <p data-fade className="micro inline-block bg-signal px-3 py-2 text-[10.5px] text-ink">{b.label}</p>}
                {!compact && <h3 data-fade className="display subhead mt-6 max-w-2xl text-[clamp(1.5rem,2.4vw,2.6rem)]">{b.title}</h3>}
                <ul data-rowset className={`border-t ${compact ? '' : 'mt-8'} ${hair}`}>
                  {b.rows.map(([who, what, pic]) => (
                    <li
                      key={who + what}
                      onMouseEnter={pic ? (e) => { move(e); setPhoto(pic) } : undefined}
                      onMouseMove={pic ? move : undefined}
                      onMouseLeave={pic ? () => setPhoto(null) : undefined}
                      className={`group grid gap-1 border-b py-5 transition-colors hover:bg-signal/10 md:grid-cols-12 md:gap-6 ${hair}`}
                    >
                      <span className="flex items-center gap-3 text-lg font-bold leading-snug md:col-span-5">
                        {b.trophy !== false && <span className={dark || saturated ? 'text-signal' : 'text-[#007b6c]'}><Trophy /></span>}
                        {who}
                      </span>
                      <span className={`micro self-center text-[10.5px] leading-relaxed md:col-span-7 md:text-right ${dark ? 'text-paper/75' : 'text-ink/75'}`}>{what}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {data.highlight && (
              <div data-fade className="bg-signal p-8 text-ink md:p-10">
                <p className="micro text-[10.5px]">{data.highlight.label}</p>
                <p className="display mt-4 text-[clamp(1.5rem,2.6vw,2.8rem)] leading-[0.98]">{data.highlight.text}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        ref={tip}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[70] hidden h-[192px] w-[288px] overflow-hidden bg-ink transition-opacity duration-200 md:block ${photo ? 'opacity-100' : 'opacity-0'}`}
      >
        {pics.map((p, i) => (
          <picture key={p}>
            <source srcSet={`images/atletas/${p}.webp`} type="image/webp" />
            <img src={`images/atletas/${p}.jpg`} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === idx ? 'opacity-100' : 'opacity-0'}`} />
          </picture>
        ))}
        <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-signal" />
        <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-signal" />
      </div>
    </section>
  )
}
