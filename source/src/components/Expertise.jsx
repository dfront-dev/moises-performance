import { useRef, useState, useEffect } from 'react'
import { expertise as c } from '../data/content'
import { services } from '../data/services'
import { Lines } from '../lib/split'
import TechVisual from './TechVisual'
import Crosses from './Crosses'
import { useGsap, gsap } from '../lib/useGsap'

function Visual({ s }) {
  return s.image ? (
    <picture>
      <source srcSet={`images/${s.image}.webp`} type="image/webp" />
      <img src={`images/${s.image}.jpg`} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover grayscale" style={{ objectPosition: s.pos || '50% 50%' }} />
    </picture>
  ) : (
    <TechVisual variant={s.visual} label="" />
  )
}

// Services as a typographic index. Over a row, a portrait card follows the pointer and the other rows step back.
export default function Expertise() {
  const ref = useRef(null)
  const tip = useRef(null)
  const [active, setActive] = useState(-1)

  useGsap(ref, ({ q, desktop }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('h2')[0], start: 'top 82%' },
    })
    gsap.from(q('[data-fade]'), {
      opacity: 0, y: 24, duration: 1, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('[data-fade]')[0], start: 'top 88%' },
    })
    q('[data-row]').forEach((row) => {
      gsap.from(row, { opacity: 0, y: 36, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 92%' } })
      gsap.from(row.querySelector('[data-hair]'), { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'power3.inOut', scrollTrigger: { trigger: row, start: 'top 92%' } })
    })
    if (!desktop) return undefined
    const el = tip.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3' })
    const rTo = gsap.quickTo(el, 'rotation', { duration: 0.6, ease: 'power3' })
    let lx = 0
    let fresh = true
    const onMove = (e) => {
      if (fresh) { gsap.set(el, { x: e.clientX + 36, y: e.clientY - 150 }); fresh = false; lx = e.clientX }
      xTo(e.clientX + 36); yTo(e.clientY - 150)
      rTo(Math.max(-5, Math.min(5, (e.clientX - lx) * 0.35))); lx = e.clientX
    }
    const list = ref.current.querySelector('[data-list]')
    const onLeave = () => { fresh = true }
    list.addEventListener('mousemove', onMove, { passive: true })
    list.addEventListener('mouseleave', onLeave)
    return () => { list.removeEventListener('mousemove', onMove); list.removeEventListener('mouseleave', onLeave) }
  })

  useEffect(() => {
    const el = tip.current
    if (!el) return
    gsap.to(el, { clipPath: active >= 0 ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)', duration: 0.7, ease: 'power3.inOut', overwrite: 'auto' })
  }, [active])

  return (
    <section id="expertise" ref={ref} className="relative bg-paper py-28 text-ink md:py-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-ink/20" />

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(2.2rem,5.6vw,6.4rem)] md:col-span-8">
            <Lines lines={c.lines} classes={['', 'text-ink/50']} />
          </h2>
          <p data-fade className="max-w-md text-base leading-relaxed text-ink/60 md:col-span-4 md:justify-self-end">{c.intro}</p>
        </div>

        <ul data-list className="svc-list mt-20 md:mt-28">
          {services.map((s, i) => (
            <li key={s.id} data-row className="svc-row relative" onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(-1)}>
              <span data-hair aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/20" />
              <a href={`servicos.html#${s.id}`} aria-label={s.full} className="grid items-baseline gap-x-8 gap-y-3 py-9 md:grid-cols-12 md:py-14">
                <span className="micro text-steel md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <span className="svc-name display text-[clamp(2rem,5.3vw,6rem)] leading-[1] md:col-span-7">{s.short}</span>
                <span className="md:col-span-3">
                  <span className="micro block text-steel">{s.full}</span>
                  <span className="mt-3 block max-w-sm text-[15px] leading-relaxed text-ink/60">{s.desc}</span>
                </span>
                <span aria-hidden className="svc-arrow hidden text-2xl md:col-span-1 md:block md:justify-self-end">↗</span>
                {/* touch: the image sits in the row */}
                <span className="relative mt-4 block md:hidden"><span className="block aspect-[4/3] overflow-hidden rounded-[8px] bg-paper-2"><Visual s={s} /></span><Crosses /></span>
              </a>
            </li>
          ))}
          <li aria-hidden className="h-px bg-ink/20" />
        </ul>

        <div data-fade className="mt-20 flex justify-center">
          <a href="servicos.html" className="btn btn-solid micro">Ver todos os serviços <span aria-hidden>→</span></a>
        </div>
      </div>

      {/* pointer-following card (desktop) */}
      <div ref={tip} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[300px] w-[240px] overflow-hidden rounded-[8px] bg-paper-2 md:block" style={{ clipPath: 'inset(100% 0 0 0)' }}>
        {services.map((s, i) => (
          <div key={s.id} className="absolute inset-0 transition-opacity duration-500" style={{ opacity: active === i ? 1 : 0 }}>
            <Visual s={s} />
          </div>
        ))}
      </div>
    </section>
  )
}
