import { useRef, useState } from 'react'
import { endurance as c } from '../data/content'
import { Lines } from '../lib/split'
import Quote from './Quote'
import { useGsap, gsap, ScrollTrigger } from '../lib/useGsap'

// An illustrative training log: twelve weekly sessions, drawn by the scroll.
// Power (FTP and normalised power), average heart rate and glucose, all on one date axis.
const dates = ['08 set', '15 set', '22 set', '29 set', '06 out', '13 out', '20 out', '27 out', '03 nov', '10 nov', '17 nov', '24 nov']
const NP = [196, 205, 201, 214, 210, 222, 218, 229, 226, 238, 233, 241]
const FTP = [238, 238, 238, 244, 244, 244, 251, 251, 251, 258, 258, 262]
const HR = [148, 151, 149, 150, 147, 148, 146, 147, 145, 146, 144, 145]
const GL = [92, 118, 101, 126, 88, 112, 97, 122, 86, 108, 94, 115]
const N = dates.length
const X = (i) => (i / (N - 1)) * 100
const Y = (v, min, max) => 10 + (1 - (v - min) / (max - min)) * 80

const panels = [
  { key: 'pot', title: 'Potência', unit: 'W', min: 180, max: 270 },
  { key: 'fc', title: 'Frequência cardíaca', unit: 'bpm', min: 141, max: 155 },
  { key: 'gl', title: 'Glicose', unit: 'mg/dL', min: 60, max: 150 },
]
const line = (arr, min, max) => arr.map((v, i) => `${i ? 'L' : 'M'}${(X(i) * 10).toFixed(1)},${Y(v, min, max).toFixed(1)}`).join(' ')
const step = (arr, min, max) => arr.map((v, i) => (i ? `H${(X(i) * 10).toFixed(1)}V${Y(v, min, max).toFixed(1)}` : `M0,${Y(v, min, max).toFixed(1)}`)).join(' ') + 'H1000'

export default function Endurance() {
  const ref = useRef(null)
  const stage = useRef(null)
  const cursor = useRef(null)
  const [active, setActive] = useState(N - 1)
  const [quote, setQuote] = useState(false)
  const [still] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useGsap(ref, ({ q, desktop }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 70%' },
    })
    if (!desktop) { setActive(N - 1); return undefined }
    setActive(-1)
    const reveals = q('[data-reveal]')
    gsap.set(reveals, { clipPath: 'inset(0 100% 0 0)' })
    gsap.set(cursor.current, { opacity: 0 })
    ScrollTrigger.create({
      trigger: stage.current, start: 'top top', end: '+=260%', pin: true, anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress
        const d = Math.min(1, p / 0.8)
        const clip = `inset(0 ${(100 - d * 100).toFixed(2)}% 0 0)`
        reveals.forEach((el) => { el.style.clipPath = clip })
        gsap.set(cursor.current, { left: `${d * 100}%`, opacity: p > 0.005 ? 1 : 0 })
        setActive(p > 0.005 ? Math.min(N - 1, Math.floor(d * (N - 1) + 1e-6)) : -1)
        setQuote(p > 0.84)
      },
    })
    return undefined
  })

  const readout = (key, i) => {
    if (i < 0) return '–'
    if (key === 'pot') return `${NP[i]} W`
    if (key === 'fc') return `${HR[i]} bpm`
    return `${GL[i]} mg/dL`
  }
  const dot = (i, v, min, max, on) => (
    <span key={i} className={`absolute block h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-300 ${on ? 'border-signal bg-signal' : 'border-paper/35 bg-ink'}`} style={{ left: `${X(i)}%`, top: `${Y(v, min, max)}%` }} />
  )

  return (
    <section id="endurance" ref={ref} className="relative bg-ink text-paper">
      <div ref={stage} className="relative flex min-h-[100svh] items-center py-24 lg:py-0">
        <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10 lg:pt-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(2.6rem,6.4vw,7.2rem)] lg:col-span-6">
              <Lines lines={c.lines} classes={['', 'text-paper/45', 'text-paper/45']} />
            </h2>

            <div className="relative lg:col-span-5 lg:col-start-8 lg:min-h-[390px]">
              <div
                className="max-w-sm space-y-4 border-l-2 border-signal pl-5 text-lg leading-snug text-paper/80 transition-all duration-700 lg:absolute lg:inset-x-0 lg:top-0"
                style={{ opacity: still || !quote ? 1 : 0, transform: `translateY(${still || !quote ? 0 : -14}px)` }}
              >
                {c.text.map((t) => <p key={t}>{t}</p>)}
              </div>
              <div
                className="mt-10 transition-all duration-700 lg:absolute lg:inset-x-0 lg:top-0 lg:mt-0"
                style={{ opacity: still || quote ? 1 : 0, transform: `translateY(${still || quote ? 0 : 16}px)`, pointerEvents: quote || still ? 'auto' : 'none' }}
              >
                <Quote tone="ink" />
              </div>
            </div>
          </div>

          {/* the log */}
          <div className="mt-10 lg:mt-12" role="img" aria-label="Exemplo ilustrativo de um registo de sessões, com potência (FTP e NP), frequência cardíaca e glicose ao longo de doze semanas">
            <div className="flex items-baseline justify-between gap-4">
              <p className="micro text-paper/45">Registo de sessões · exemplo ilustrativo</p>
              <p className="micro tabular-nums text-paper/70" aria-hidden>{active >= 0 ? `Sessão ${String(active + 1).padStart(2, '0')} · ${dates[active]}` : `${dates[0]} a ${dates[N - 1]}`}</p>
            </div>

            <div className="relative mt-4" aria-hidden>
              {panels.map((pn) => (
                <div key={pn.key} className="grid items-stretch gap-x-6 border-t border-paper/12 py-3 lg:grid-cols-[170px_1fr]">
                  <div className="flex items-baseline justify-between gap-4 pb-2 lg:block lg:pb-0">
                    <p className="micro text-paper/55">{pn.title}</p>
                    <p className="text-[clamp(1.1rem,1.6vw,1.6rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums text-paper lg:mt-2">{readout(pn.key, active)}</p>
                    {pn.key === 'pot' && <p className="micro hidden text-paper/45 lg:mt-2 lg:block">FTP {active >= 0 ? `${FTP[active]} W` : '–'}</p>}
                    {pn.key === 'gl' && <p className="micro hidden text-paper/45 lg:mt-2 lg:block">Alvo 70 a 140</p>}
                  </div>
                  <div className="relative h-[64px] lg:h-[clamp(52px,7.4vh,78px)]">
                    <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(circle, rgba(246,244,239,0.16) 1px, transparent 1.4px)', backgroundSize: '22px 22px' }} />
                    {pn.key === 'gl' && <div className="absolute inset-x-0 bg-paper/[0.06]" style={{ top: `${Y(140, pn.min, pn.max)}%`, bottom: `${100 - Y(70, pn.min, pn.max)}%` }} />}
                    {/* faint full line, then the lit line revealed by scroll */}
                    <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                      {pn.key === 'pot' && <path d={step(FTP, pn.min, pn.max)} fill="none" stroke="rgba(246,244,239,0.28)" strokeWidth="1.5" strokeDasharray="5 5" vectorEffect="non-scaling-stroke" />}
                      <path d={line(pn.key === 'pot' ? NP : pn.key === 'fc' ? HR : GL, pn.min, pn.max)} fill="none" stroke="rgba(246,244,239,0.16)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                    </svg>
                    <div className="absolute inset-0" data-reveal>
                      <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                        <path d={line(pn.key === 'pot' ? NP : pn.key === 'fc' ? HR : GL, pn.min, pn.max)} fill="none" stroke="#14CFB1" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                      </svg>
                    </div>
                    {(pn.key === 'pot' ? NP : pn.key === 'fc' ? HR : GL).map((v, i) => dot(i, v, pn.min, pn.max, i <= active))}
                  </div>
                </div>
              ))}
              {/* date axis */}
              <div className="grid gap-x-6 border-t border-paper/12 pt-3 lg:grid-cols-[170px_1fr]">
                <span className="hidden lg:block" />
                <div className="relative h-4">
                  {dates.map((d, i) => (i % 3 === 0 || i === N - 1) && (
                    <span key={d} className={`micro absolute -translate-x-1/2 whitespace-nowrap tabular-nums transition-colors duration-300 ${i <= active ? 'text-paper/80' : 'text-paper/35'}`} style={{ left: `${X(i)}%` }}>{d}</span>
                  ))}
                </div>
              </div>
              {/* scroll cursor */}
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden lg:left-[194px] lg:block">
                <span ref={cursor} className="absolute bottom-6 top-0 block w-px bg-signal/70" style={{ left: '0%', opacity: still ? 0 : 0 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
