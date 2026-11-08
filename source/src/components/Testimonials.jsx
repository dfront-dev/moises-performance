import { useRef } from 'react'
import { testimonials } from '../data/content'
import { useGsap, gsap } from '../lib/useGsap'

// Quotes and portraits float over giant type. Each piece tilts in perspective as it crosses the screen:
// it arrives leaning one way, sits flat in the middle and leans the other way as it leaves.
const photos = [
  { src: 'images/atletas/vasco-ribeiro', alt: 'Vasco Ribeiro', box: 'md:right-[6%] md:top-[12%] md:w-[20vw] md:aspect-[3/4]', ry: -20, rx: 8, sk: 3, speed: 110, pos: '50% 20%' },
  { src: 'images/atletas/teresa-bonvalot', alt: 'Teresa Bonvalot', box: 'md:left-[6%] md:top-[70%] md:w-[24vw] md:aspect-[4/3]', ry: 18, rx: -7, sk: -3, speed: 90, pos: '45% 30%' },
]
const draftMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('rascunho')
const list = testimonials.filter((t) => !t.draft || draftMode)
const cardSpots = [
  { box: 'md:left-[22%] md:top-[27%] md:w-[38vw]', ry: 14, rx: -6, sk: -2, speed: 70 },
  { box: 'md:right-[8%] md:top-[55%] md:w-[38vw]', ry: -14, rx: 6, sk: 2, speed: 90 },
  { box: 'md:left-[16%] md:top-[78%] md:w-[38vw]', ry: 14, rx: -6, sk: -2, speed: 80 },
]
const portraitSpots = [
  { box: 'md:left-[4%] md:top-[33%] md:w-[15vw] md:aspect-square', ry: 22, rx: -8, sk: -3, speed: 130 },
  { box: 'md:right-[28%] md:top-[50%] md:w-[13vw] md:aspect-square', ry: -22, rx: 8, sk: 3, speed: 120 },
  { box: 'md:right-[18%] md:top-[74%] md:w-[13vw] md:aspect-square', ry: 22, rx: -8, sk: -3, speed: 110 },
]

function Photo({ src, alt, pos, className = '', initials }) {
  if (!src) return <div className={`grid place-items-center rounded-[14px] bg-[#1a1d1f] text-[clamp(1.4rem,3vw,3rem)] font-semibold tracking-[-0.05em] text-white/70 ${className}`}>{initials}</div>
  return (
    <div className={`overflow-hidden rounded-[14px] bg-[#111] ${className}`}>
      <picture>
        <source srcSet={`${src}.webp`} type="image/webp" />
        <img src={`${src}.jpg`} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover brightness-[0.82] grayscale" style={{ objectPosition: pos || '50% 50%' }} />
      </picture>
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)

  useGsap(ref, ({ q, desktop }) => {
    gsap.from(q('[data-line]'), { yPercent: 50, opacity: 0, duration: 1.3, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 70%' } })
    if (!desktop) {
      // phone: cards rise in one by one, the two photos drift and straighten as they pass
      q('[data-mcard]').forEach((el) => gsap.from(el, { opacity: 0, y: 36, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }))
      q('[data-mphoto]').forEach((el, i) => {
        gsap.fromTo(el, { y: i ? 70 : 30, rotate: i ? 3 : -3 }, { y: i ? -10 : -30, rotate: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom 40%', scrub: 0.6 } })
      })
      return undefined
    }
    q('[data-item]').forEach((el) => {
      const t = el.querySelector('[data-tilt]')
      const ry = Number(el.dataset.ry), rx = Number(el.dataset.rx), sk = Number(el.dataset.sk), sp = Number(el.dataset.speed)
      gsap.fromTo(
        t,
        { rotateY: ry, rotateX: rx, skewY: sk, y: sp },
        { rotateY: -ry, rotateX: -rx, skewY: -sk, y: -sp, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 } }
      )
    })
    return undefined
  })

  const tiltData = (s) => ({ 'data-ry': s.ry, 'data-rx': s.rx, 'data-sk': s.sk, 'data-speed': s.speed })

  return (
    <section id="testemunhos" ref={ref} className="relative isolate overflow-hidden bg-ink text-white">
      <div className={`relative mx-auto max-w-[1680px] px-5 pb-28 pt-28 ${list.length > 2 ? 'md:min-h-[220svh]' : 'md:min-h-[178svh]'} md:px-10 md:pb-0 md:pt-40`}>
        {/* giant type: it inverts wherever a photo sits behind it */}
        <h2 aria-label="Impacto nos atletas" className="display relative z-10 text-[clamp(3.4rem,15vw,5rem)] leading-[0.95] md:text-[clamp(3.4rem,13vw,15rem)]" style={{ mixBlendMode: 'difference' }}>
          <span className="line"><span className="line-inner" data-line>Impacto</span></span>
          <span className="line"><span className="line-inner text-white/55" data-line>nos atletas.</span></span>
        </h2>

        {/* floating photos (desktop) */}
        {photos.map((p) => (
          <div key={p.src} data-item {...tiltData(p)} className={`pointer-events-none absolute z-0 hidden md:block ${p.box}`} style={{ perspective: 1300 }}>
            <div data-tilt className="h-full w-full"><Photo src={p.src} alt={p.alt} pos={p.pos} className="h-full w-full" /></div>
          </div>
        ))}
        {list.map((t, i) => (
          <div key={t.name} data-item {...tiltData(portraitSpots[i])} className={`pointer-events-none absolute z-0 hidden md:block ${portraitSpots[i].box}`} style={{ perspective: 1300 }}>
            <div data-tilt className="h-full w-full"><Photo src={t.photo} alt={t.name} initials={t.initials} className="h-full w-full" /></div>
          </div>
        ))}

        {/* phone layout: one clear column */}
        <div className="mt-12 md:hidden">
          <div className="space-y-4">
            {list.map((t) => (
              <figure key={t.name} data-mcard className="rounded-[14px] border border-white/12 bg-[#0e1012] p-6">
                <div className="flex items-center gap-4">
                  <Photo src={t.photo} alt={t.name} initials={t.initials} className="h-16 w-16 shrink-0" />
                  <figcaption className="min-w-0">
                    <span className="block text-[17px] font-semibold leading-tight tracking-[-0.01em]">{t.name}</span>
                    <span className="mt-1 block text-[14px] leading-snug text-white/55">{t.role}</span>
                  </figcaption>
                </div>
                <blockquote className="mt-5 border-t border-white/12 pt-5 text-[16px] font-medium leading-[1.55] text-white/95">“{t.quote}”</blockquote>
              </figure>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 items-start gap-3">
            {photos.map((p, i) => (
              <div key={p.src} data-mphoto className={i ? 'mt-12' : ''}>
                <Photo src={p.src} alt={p.alt} pos={p.pos} className="aspect-[3/4] w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* the quotes */}
        <div className="hidden md:block">
          {list.map((t, i) => (
            <div key={t.name} data-item {...tiltData(cardSpots[i])} className={`relative z-20 md:absolute ${cardSpots[i].box}`} style={{ perspective: 1300 }}>
              <figure data-tilt data-card className="rounded-[14px] border border-white/12 bg-[#0e1012]/90 p-7 backdrop-blur-md md:p-9">
                <blockquote className="text-[15px] font-medium leading-[1.5] text-white md:text-[clamp(1rem,1.3vw,1.3rem)]">“{t.quote}”</blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-white/12 pt-6">
                  <span className="block text-[17px] font-semibold tracking-[-0.01em]">{t.name}</span>
                  <span aria-hidden className="text-white/35">•</span>
                  <span className="text-[15px] text-white/55">{t.role}</span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
