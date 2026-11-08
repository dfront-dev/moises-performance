import { useRef } from 'react'
import { testimonials } from '../data/content'
import { useGsap, gsap } from '../lib/useGsap'

// Quotes and portraits float over giant type. Each piece tilts in perspective as it crosses the screen:
// it arrives leaning one way, sits flat in the middle and leans the other way as it leaves.
const photos = [
  { src: 'images/atletas/vasco-ribeiro', alt: 'Vasco Ribeiro', box: 'right-[6%] top-[12%] w-[20vw] aspect-[3/4]', ry: -20, rx: 8, sk: 3, speed: 110, pos: '50% 20%' },
  { src: 'images/atletas/teresa-bonvalot', alt: 'Teresa Bonvalot', box: 'left-[6%] top-[70%] w-[24vw] aspect-[4/3]', ry: 18, rx: -7, sk: -3, speed: 90, pos: '45% 30%' },
]
const cardSpots = [
  { box: 'left-[22%] top-[27%] w-[38vw]', ry: 14, rx: -6, sk: -2, speed: 70 },
  { box: 'right-[8%] top-[55%] w-[38vw]', ry: -14, rx: 6, sk: 2, speed: 90 },
]
const portraitSpots = [
  { box: 'left-[4%] top-[33%] w-[15vw] aspect-square', ry: 22, rx: -8, sk: -3, speed: 130 },
  { box: 'right-[28%] top-[50%] w-[13vw] aspect-square', ry: -22, rx: 8, sk: 3, speed: 120 },
]

function Photo({ src, alt, pos, className = '' }) {
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
      q('[data-card]').forEach((el) => gsap.from(el, { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }))
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
      <div className="relative mx-auto max-w-[1680px] px-5 pb-28 pt-28 md:min-h-[178svh] md:px-10 md:pb-0 md:pt-40">
        {/* giant type: it inverts wherever a photo sits behind it */}
        <h2 aria-label="Impacto nos atletas" className="display relative z-10 text-[clamp(3.4rem,13vw,15rem)] leading-[0.95]" style={{ mixBlendMode: 'difference' }}>
          <span className="line"><span className="line-inner" data-line>Impacto</span></span>
          <span className="line"><span className="line-inner text-white/55" data-line>nos atletas.</span></span>
        </h2>

        {/* floating photos (desktop) */}
        {photos.map((p) => (
          <div key={p.src} data-item {...tiltData(p)} className={`pointer-events-none absolute z-0 hidden md:block ${p.box}`} style={{ perspective: 1300 }}>
            <div data-tilt className="h-full w-full"><Photo src={p.src} alt={p.alt} pos={p.pos} className="h-full w-full" /></div>
          </div>
        ))}
        {testimonials.slice(0, 2).map((t, i) => (
          <div key={t.name} data-item {...tiltData(portraitSpots[i])} className={`pointer-events-none absolute z-0 hidden md:block ${portraitSpots[i].box}`} style={{ perspective: 1300 }}>
            <div data-tilt className="h-full w-full"><Photo src={t.photo} alt={t.name} className="h-full w-full" /></div>
          </div>
        ))}

        {/* the quotes */}
        <div className="mt-14 space-y-6 md:mt-0 md:space-y-0">
          {testimonials.slice(0, 2).map((t, i) => (
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
