import { useRef, useState } from 'react'
import { system as c, differentiators as d } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap, ScrollTrigger } from '../lib/useGsap'

const roll = { transition: 'transform 0.9s cubic-bezier(0.7, 0, 0.2, 1)' }

// The six moments, told one at a time: the section pins and the scroll turns the page.
// Below 1024px it falls back to a plain grid.
export default function System({ merge = false }) {
  const ref = useRef(null)
  const stage = useRef(null)
  const trig = useRef(null)
  const [active, setActive] = useState(0)
  const [still] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const n = c.steps.length

  useGsap(ref, ({ q, desktop }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('h2')[0], start: 'top 82%' },
    })
    gsap.from(q('[data-fade]'), {
      opacity: 0, y: 24, duration: 1, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('[data-fade]')[0], start: 'top 88%' },
    })
    q('[data-merge-item]').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
    })
    if (desktop) {
      const fill = q('[data-rail-fill]')[0]
      trig.current = ScrollTrigger.create({
        trigger: stage.current, start: 'top top', end: `+=${n * 80}%`, pin: true, anticipatePin: 1,
        onUpdate: (self) => {
          setActive(Math.min(n - 1, Math.floor(self.progress * n * 0.999)))
          gsap.set(fill, { scaleY: self.progress })
        },
      })
    } else {
      q('[data-step]').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 28, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
      })
    }
    return () => { trig.current = null }
  })

  const jump = (i) => {
    const t = trig.current
    if (!t) return
    const y = t.start + ((i + 0.5) / n) * (t.end - t.start)
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.6 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <section id="metodo" ref={ref} className="relative bg-paper text-ink">
      <div className="mx-auto max-w-[1680px] px-5 pt-28 md:px-10 md:pt-44">
        <div aria-hidden data-fade className="section-index h-px bg-ink/20" />
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(2.2rem,5.6vw,6.4rem)] md:col-span-8">
            <Lines lines={c.lines} classes={['', 'text-ink/50']} />
          </h2>
          <p data-fade className="max-w-sm text-base leading-relaxed text-ink/60 md:col-span-4 md:justify-self-end">{c.intro}</p>
        </div>
      </div>

      {/* desktop: pinned, scroll-driven */}
      {!still && (
      <div ref={stage} className="relative hidden h-[100svh] items-center lg:flex">
        <div className="mx-auto grid w-full max-w-[1680px] grid-cols-12 gap-8 px-10 pt-16">
          <div className="col-span-7">
            <div className="h-[1em] overflow-hidden text-[clamp(7rem,15vw,15rem)] leading-none" aria-hidden>
              <div style={{ ...roll, transform: `translateY(${-active * (100 / n)}%)` }}>
                {c.steps.map((s) => <div key={s.n} className="display h-[1em] leading-none">{s.n}</div>)}
              </div>
            </div>
            <div className="mt-6 h-[1.15em] overflow-hidden text-[clamp(2.4rem,5.2vw,5.4rem)] leading-[1.15]">
              <div style={{ ...roll, transform: `translateY(${-active * (100 / n)}%)` }}>
                {c.steps.map((s) => <div key={s.n} className="display h-[1.15em]">{s.title}</div>)}
              </div>
            </div>
          </div>
          <div className="col-span-4 col-start-9 flex flex-col justify-end">
            <div className="relative min-h-[110px]" aria-live="polite">
              {c.steps.map((s, i) => (
                <div key={s.n} className="absolute inset-x-0 top-0 transition-all duration-700" style={{ opacity: active === i ? 1 : 0, transform: `translateY(${active === i ? 0 : 14}px)` }}>
                  <p className="micro text-steel">{s.tag}</p>
                  <p className="mt-3 max-w-xs text-lg leading-snug text-ink/70">{s.text}</p>
                </div>
              ))}
            </div>
            <ol className="relative mt-10 border-l border-ink/15 pl-6">
              <span data-rail-fill aria-hidden className="absolute -left-px top-0 h-full w-px origin-top scale-y-0 bg-ink" />
              {c.steps.map((s, i) => (
                <li key={s.n}>
                  <button type="button" onClick={() => jump(i)} aria-current={active === i ? 'step' : undefined} className={`relative flex w-full items-center gap-4 py-[7px] text-left transition-colors duration-500 ${active === i ? 'text-ink' : 'text-ink/35 hover:text-ink/60'}`}>
                    <span aria-hidden className={`absolute -left-[28px] h-[7px] w-[7px] bg-signal transition-opacity duration-500 ${active === i ? 'opacity-100' : 'opacity-0'}`} />
                    <span className="micro w-6">{s.n}</span>
                    <span className="text-base">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      )}

      {/* tablet and phone (and reduced motion): plain grid */}
      <div className={`mx-auto max-w-[1680px] px-5 pb-8 pt-16 md:px-10 ${still ? '' : 'lg:hidden'}`}>
        <ol className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {c.steps.map((s) => (
            <li key={s.n} data-step className="relative pt-6">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/20" />
              <span aria-hidden className="absolute -top-[1px] left-0 h-[2px] w-10 bg-signal" />
              <div className="flex items-start justify-between">
                <span className="display block text-[2.2rem] text-ink/45">{s.n}</span>
                <span className="micro mt-3 text-steel">{s.tag}</span>
              </div>
              <h3 className="display subhead mt-4 text-[1.5rem]">{s.title}</h3>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink/60">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>

      {merge ? (
        <div className="mx-auto max-w-[1680px] px-5 pb-28 pt-20 md:px-10 md:pb-44 md:pt-28">
          <div className="border-t border-ink/20 pt-12 md:grid md:grid-cols-12 md:gap-10 md:pt-16">
            <h3 aria-label={d.lines.join(' ')} className="display subhead text-[clamp(1.6rem,2.6vw,2.8rem)] md:col-span-4">
              <span className="block">{d.lines[0]}</span>
              <span className="block text-ink/50">{d.lines[1]}</span>
            </h3>
            <ul className="mt-10 grid gap-10 md:col-span-8 md:mt-0 md:grid-cols-3 md:gap-8">
              {d.items.map((it) => (
                <li key={it.title} data-merge-item>
                  <span aria-hidden className="block h-[2px] w-10 bg-signal" />
                  <h4 className="display subhead mt-5 text-[clamp(1.1rem,1.5vw,1.5rem)]">{it.title}</h4>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="pb-24 md:pb-32" />
      )}
    </section>
  )
}
