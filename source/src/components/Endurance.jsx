import { useRef, useState } from 'react'
import { endurance as c } from '../data/content'
import { Lines } from '../lib/split'
import Quote from './Quote'
import { useGsap, gsap, ScrollTrigger } from '../lib/useGsap'

// A decorative, out-of-focus training log that plays by itself in the background:
// power (FTP and normalised power), average heart rate and glucose over twelve weekly sessions.
// Illustrative data only.
const dates = ['08 Sep', '15 Sep', '22 Sep', '29 Sep', '06 Oct', '13 Oct', '20 Oct', '27 Oct', '03 Nov', '10 Nov', '17 Nov', '24 Nov']
const NP = [196, 205, 201, 214, 210, 222, 218, 229, 226, 238, 233, 241]
const FTP = [238, 238, 238, 244, 244, 244, 251, 251, 251, 258, 258, 262]
const HR = [148, 151, 149, 150, 147, 148, 146, 147, 145, 146, 144, 145]
const GL = [92, 118, 101, 126, 88, 112, 97, 122, 86, 108, 94, 115]
const N = dates.length
const X = (i) => (i / (N - 1)) * 100
const Y = (v, min, max) => 10 + (1 - (v - min) / (max - min)) * 80

const panels = [
  { key: 'pot', title: 'Power', arr: NP, min: 180, max: 270 },
  { key: 'fc', title: 'Heart rate', arr: HR, min: 141, max: 155 },
  { key: 'gl', title: 'Glucose', arr: GL, min: 60, max: 150 },
]
const line = (arr, min, max) => arr.map((v, i) => `${i ? 'L' : 'M'}${(X(i) * 10).toFixed(1)},${Y(v, min, max).toFixed(1)}`).join(' ')
const step = (arr, min, max) => arr.map((v, i) => (i ? `H${(X(i) * 10).toFixed(1)}V${Y(v, min, max).toFixed(1)}` : `M0,${Y(v, min, max).toFixed(1)}`)).join(' ') + 'H1000'

export default function Endurance() {
  const ref = useRef(null)
  const stage = useRef(null)
  const chart = useRef(null)
  const cursor = useRef(null)
  const [active, setActive] = useState(N - 1)
  const [lit, setLit] = useState(true) // false while the lines are still being drawn
  const [quote, setQuote] = useState(false)
  const [swap, setSwap] = useState(false) // desktop only: quote replaces the copy while pinned
  const [still] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useGsap(ref, ({ q, desktop }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 70%' },
    })

    // the background log: it draws itself when it enters the viewport, then keeps scanning along the dates
    if (!still) {
      const reveals = q('[data-reveal]')
      const o = { d: 0 }
      let drawing = true
      setLit(false); setActive(-1)
      gsap.set(reveals, { clipPath: 'inset(0 100% 0 0)' })
      gsap.set(cursor.current, { opacity: 0 })
      const move = () => {
        if (drawing) reveals.forEach((el) => { el.style.clipPath = `inset(0 ${(100 - o.d * 100).toFixed(2)}% 0 0)` })
        cursor.current.style.left = `${(o.d * 100).toFixed(2)}%`
        setActive(Math.min(N - 1, Math.floor(o.d * (N - 1) + 1e-6)))
      }
      const tl = gsap.timeline({ paused: true })
      tl.set(cursor.current, { opacity: 1 })
        .to(o, { d: 1, duration: 3.6, ease: 'power2.inOut', onUpdate: move })
        .call(() => { drawing = false; setLit(true); reveals.forEach((el) => { el.style.clipPath = 'none' }) })
        .fromTo(o, { d: 0 }, { d: 1, duration: 11, ease: 'none', repeat: -1, repeatDelay: 1.4, onUpdate: move })
      ScrollTrigger.create({
        trigger: chart.current, start: 'top 92%', end: 'bottom top',
        onEnter: () => tl.play(), onEnterBack: () => tl.play(),
        onLeave: () => tl.pause(), onLeaveBack: () => tl.pause(),
      })
    }

    // the quote replaces the copy while the section is pinned (desktop only)
    if (desktop) {
      setSwap(true)
      ScrollTrigger.create({
        trigger: stage.current, start: 'top top', end: '+=140%', pin: true, anticipatePin: 1,
        onUpdate: (self) => setQuote(self.progress > 0.5),
      })
    }
    return undefined
  })

  const readout = (key, i) => {
    if (i < 0) return '–'
    if (key === 'pot') return `${NP[i]} W`
    if (key === 'fc') return `${HR[i]} bpm`
    return `${GL[i]} mg/dL`
  }
  const sub = (key, i) => (key === 'pot' ? `FTP ${i >= 0 ? FTP[i] : '–'} W` : key === 'gl' ? 'Target 70 to 140' : '')

  return (
    <section id="endurance" ref={ref} className="relative bg-ink text-paper">
      <div ref={stage} className="relative flex min-h-[100svh] flex-col overflow-hidden py-24 lg:flex-row lg:items-center lg:py-0">
        {/* background log */}
        <div ref={chart} aria-hidden className="pointer-events-none relative z-0 mt-12 h-[250px] lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:h-[46%]" style={{ order: 3 }}>
          <div className="mx-auto flex h-full max-w-[1680px] flex-col px-5 pb-6 md:px-10" style={{ opacity: 0.42, filter: 'blur(1.6px)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 30%)', maskImage: 'linear-gradient(to bottom, transparent 0%, #000 30%)' }}>
            <div className="flex items-baseline justify-between gap-4 pt-8">
              <p className="micro text-paper/60">Training log · illustrative data</p>
              <p className="micro tabular-nums text-paper/80">{active >= 0 ? `Session ${String(active + 1).padStart(2, '0')} · ${dates[active]}` : `${dates[0]} to ${dates[N - 1]}`}</p>
            </div>
            <div className="relative mt-2 flex min-h-0 flex-1 flex-col">
              {panels.map((pn) => (
                <div key={pn.key} className="grid min-h-0 flex-1 items-center gap-x-6 border-t border-paper/15 lg:grid-cols-[170px_1fr]">
                  <div className="hidden lg:block">
                    <p className="micro text-paper/60">{pn.title}</p>
                    <p className="mt-1 text-[clamp(1.1rem,1.5vw,1.5rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums text-paper">{readout(pn.key, active)}</p>
                    <p className="micro mt-1 min-h-[1.3em] text-paper/50">{sub(pn.key, active)}</p>
                  </div>
                  <div className="relative h-[78%]">
                    {pn.key === 'gl' && <div className="absolute inset-x-0 bg-paper/[0.07]" style={{ top: `${Y(140, pn.min, pn.max)}%`, bottom: `${100 - Y(70, pn.min, pn.max)}%` }} />}
                    <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                      {pn.key === 'pot' && <path d={step(FTP, pn.min, pn.max)} fill="none" stroke="rgba(246,244,239,0.35)" strokeWidth="1.5" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />}
                      <path d={line(pn.arr, pn.min, pn.max)} fill="none" stroke="rgba(246,244,239,0.2)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                    </svg>
                    <div className="absolute inset-0" data-reveal>
                      <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                        <path d={line(pn.arr, pn.min, pn.max)} fill="none" stroke="#14CFB1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                      </svg>
                    </div>
                    {pn.arr.map((v, i) => {
                      const on = lit || i <= active
                      const now = lit && i === active
                      return <span key={i} className={`absolute block -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ${now ? 'h-[11px] w-[11px] border-paper bg-signal' : 'h-[7px] w-[7px]'} ${!now && on ? 'border-signal bg-signal' : ''} ${!now && !on ? 'border-paper/35 bg-ink' : ''}`} style={{ left: `${X(i)}%`, top: `${Y(v, pn.min, pn.max)}%` }} />
                    })}
                  </div>
                </div>
              ))}
              <div className="grid gap-x-6 border-t border-paper/15 pt-2 lg:grid-cols-[170px_1fr]">
                <span className="hidden lg:block" />
                <div className="relative h-4">
                  {dates.map((d, i) => (i % 3 === 0 || i === N - 1) && (
                    <span key={d} className="micro absolute -translate-x-1/2 whitespace-nowrap tabular-nums text-paper/55" style={{ left: `${X(i)}%` }}>{d}</span>
                  ))}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 lg:left-[194px]">
                <span ref={cursor} className="absolute bottom-6 top-0 block w-px bg-signal/80" style={{ left: '100%', opacity: still ? 0 : 0 }} />
              </div>
            </div>
          </div>
        </div>

        {/* copy */}
        <div className="relative z-10 mx-auto w-full max-w-[1680px] px-5 md:px-10 lg:-mt-[18vh]">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(2.6rem,6.4vw,7.2rem)] lg:col-span-6">
              <Lines lines={c.lines} classes={['', 'text-paper/45', 'text-paper/45']} />
            </h2>

            <div className="relative lg:col-span-5 lg:col-start-8 lg:min-h-[390px]">
              <div
                className="max-w-sm space-y-4 border-l-2 border-signal pl-5 text-lg leading-snug text-paper/80 transition-all duration-700 lg:absolute lg:inset-x-0 lg:top-0"
                style={{ opacity: still || !swap || !quote ? 1 : 0, transform: `translateY(${still || !swap || !quote ? 0 : -14}px)` }}
              >
                {c.text.map((t) => <p key={t}>{t}</p>)}
              </div>
              <div
                className="mt-10 transition-all duration-700 lg:absolute lg:inset-x-0 lg:top-0 lg:mt-0"
                style={{ opacity: still || !swap || quote ? 1 : 0, transform: `translateY(${still || !swap || quote ? 0 : 16}px)`, pointerEvents: quote || still || !swap ? 'auto' : 'none' }}
              >
                <Quote tone="ink" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
