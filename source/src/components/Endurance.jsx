import { useRef, useState } from 'react'
import { endurance as c } from '../data/content'
import { Lines } from '../lib/split'
import Quote from './Quote'
import { useGsap, gsap, ScrollTrigger } from '../lib/useGsap'

// A pacing profile. It is drawn by the scroll; the three disciplines named in the copy light up along it.
const PATH = 'M0,388 C110,388 150,308 250,306 S400,388 500,336 S630,150 750,168 S900,310 1010,262 S1160,60 1290,92 S1450,262 1600,196'
const stops = [
  { label: 'Ciclismo', at: 0.2 },
  { label: 'Corrida', at: 0.5 },
  { label: 'Natação', at: 0.8 },
]

export default function Endurance() {
  const ref = useRef(null)
  const stage = useRef(null)
  const path = useRef(null)
  const dot = useRef(null)
  const [pts, setPts] = useState(stops.map(() => ({ x: 0, y: 0 })))
  const [active, setActive] = useState(-1)
  const [quote, setQuote] = useState(false)
  const [still] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  // where the markers sit along the line
  const place = (el) => {
    if (!el || pts[0].x) return
    const L = el.getTotalLength()
    setPts(stops.map((s) => { const p = el.getPointAtLength(L * s.at); return { x: p.x, y: p.y } }))
  }

  useGsap(ref, ({ q, desktop }) => {
    const el = path.current
    place(el)
    gsap.from(q('[data-line]'), {
      yPercent: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 70%' },
    })
    if (!desktop) { setActive(stops.length - 1); return undefined }
    const L = el.getTotalLength()
    gsap.set(el, { strokeDasharray: L, strokeDashoffset: L })
    gsap.set(dot.current, { opacity: 0 })
    ScrollTrigger.create({
      trigger: stage.current, start: 'top top', end: '+=260%', pin: true, anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress
        const d = Math.min(1, p / 0.8)
        el.style.strokeDashoffset = String(L * (1 - d))
        const pt = el.getPointAtLength(L * d)
        gsap.set(dot.current, { left: `${(pt.x / 1600) * 100}%`, top: `${(pt.y / 500) * 100}%`, opacity: p > 0.01 && p < 0.99 ? 1 : p >= 0.99 ? 1 : 0 })
        setActive(stops.reduce((a, s, i) => (d >= s.at - 0.02 ? i : a), -1))
        setQuote(p > 0.84)
      },
    })
    return undefined
  })

  return (
    <section id="endurance" ref={ref} className="relative bg-ink text-paper">
      <div ref={stage} className="relative flex min-h-[100svh] items-center py-24 lg:py-0">
        <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10 lg:pt-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(2.6rem,6.4vw,7.2rem)] lg:col-span-6">
              <Lines lines={c.lines} classes={['', 'text-paper/45', 'text-paper/45']} />
            </h2>

            <div className="relative lg:col-span-5 lg:col-start-8 lg:min-h-[390px]">
              <p
                className="max-w-sm border-l-2 border-signal pl-5 text-lg leading-snug text-paper/80 transition-all duration-700 lg:absolute lg:inset-x-0 lg:top-0"
                style={{ opacity: still || !quote ? 1 : 0, transform: `translateY(${still || !quote ? 0 : -14}px)` }}
              >
                {c.text}
              </p>
              <div
                className="mt-10 transition-all duration-700 lg:absolute lg:inset-x-0 lg:top-0 lg:mt-0"
                style={{ opacity: still || quote ? 1 : 0, transform: `translateY(${still || quote ? 0 : 16}px)`, pointerEvents: quote || still ? 'auto' : 'none' }}
              >
                <Quote tone="ink" />
              </div>
            </div>
          </div>

          {/* the profile */}
          <div className="relative mt-14 h-[38vw] max-h-[340px] min-h-[200px] lg:mt-24 lg:h-[26vh]" aria-hidden>
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(circle, rgba(246,244,239,0.18) 1px, transparent 1.4px)', backgroundSize: '22px 22px' }} />
            <svg viewBox="0 0 1600 500" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <path d={PATH} fill="none" stroke="rgba(246,244,239,0.14)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path ref={path} d={PATH} fill="none" stroke="#14CFB1" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
            {stops.map((s, i) => (
              <div key={s.label} className="absolute" style={{ left: `${(pts[i].x / 1600) * 100}%`, top: `${(pts[i].y / 500) * 100}%`, opacity: pts[i].x ? 1 : 0 }}>
                <span className="absolute left-0 top-0 block h-[200px] w-px -translate-x-1/2 bg-paper/15" style={{ opacity: active >= i ? 1 : 0.25, transition: 'opacity .6s' }} />
                <span className={`absolute -left-[5px] -top-[5px] block h-[10px] w-[10px] rounded-full border transition-colors duration-500 ${active >= i ? 'border-signal bg-signal' : 'border-paper/40 bg-ink'}`} />
                <span className={`micro absolute -top-9 -translate-x-1/2 whitespace-nowrap transition-colors duration-500 ${active >= i ? 'text-paper' : 'text-paper/35'}`}>{s.label}</span>
              </div>
            ))}
            <span ref={dot} className="absolute block h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal ring-4 ring-ink" style={{ left: '0%', top: '78%', opacity: still ? 0 : 0 }} />
          </div>
        </div>
      </div>
    </section>
  )
}
