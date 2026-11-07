import { useRef } from 'react'
import { coach as c } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

const pad = (n, p = 0) => String(n).padStart(p, '0')

export default function Coach({ index, lean = false }) {
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('h2')[0], start: 'top 82%' },
    })
    gsap.from(q('[data-fade]'), {
      opacity: 0, y: 24, duration: 1, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('[data-fade]')[0], start: 'top 88%' },
    })

    // Black and white to colour as the portrait travels through the viewport.
    const img = q('[data-coach-img]')[0]
    gsap.fromTo(img, { filter: 'grayscale(1) contrast(1.15) brightness(0.92)' }, {
      filter: 'grayscale(0) contrast(1.04) brightness(1)', ease: 'none',
      scrollTrigger: { trigger: q('[data-coach-frame]')[0], start: 'top 75%', end: 'bottom 35%', scrub: true },
    })
    gsap.from(q('[data-coach-frame]'), {
      clipPath: 'inset(0 0 100% 0)', duration: 1.4, ease: 'power3.inOut',
      scrollTrigger: { trigger: q('[data-coach-frame]')[0], start: 'top 85%' },
    })
    gsap.to(img, {
      yPercent: -3, ease: 'none',
      scrollTrigger: { trigger: q('[data-coach-frame]')[0], start: 'top bottom', end: 'bottom top', scrub: true },
    })

    q('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count)
      const p = Number(el.dataset.pad || 0)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: end, duration: 1.8, ease: 'power3.out', snap: { v: 1 },
        scrollTrigger: { trigger: el, start: 'top 88%' },
        onUpdate: () => { el.firstChild.textContent = pad(obj.v, p) },
      })
    })

    q('[data-row]').forEach((row) => {
      gsap.from(row, { opacity: 0, y: 14, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 94%' } })
    })
  })

  return (
    <section id="sobre" ref={ref} className="relative bg-paper pt-28 text-ink md:pt-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div aria-hidden data-fade className="section-index h-px bg-ink/20" />

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12">
          {/* portrait */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <div data-coach-frame className="relative aspect-[3/4] overflow-hidden bg-steel/20">
                <picture>
                  <source srcSet="images/joao-sobre.webp" type="image/webp" />
                  <img
                    data-coach-img
                    src="images/joao-sobre.jpg"
                    alt="João Moisés sentado num degrau de betão, a sorrir para a câmara"
                    width="1435"
                    height="1096"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-[112%] w-full object-cover object-[86%_30%]"
                    style={{ filter: 'grayscale(1) contrast(1.15) brightness(0.92)' }}
                  />
                </picture>
                <p className="micro absolute bottom-5 left-5 bg-paper px-3 py-2 text-[10px] text-ink">
                  João Moisés / Fisiologista do Exercício
                </p>
              </div>
            </div>
          </div>

          {/* copy */}
          <div className="md:col-span-7 md:pl-6">
            <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(1.72rem,3.24vw,3.72rem)]">
              <Lines lines={c.lines} />
            </h2>

            <div className="mt-14 max-w-2xl space-y-6 text-lg leading-relaxed text-ink/80 md:text-xl">
              {c.body.map((p) => (
                <p key={p} data-fade>{p}</p>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-ink/20 pt-8">
              {c.numbers.map((n) => (
                <div key={n.label}>
                  <p className="display text-[clamp(2.34rem,3.84vw,4.2rem)] leading-none">
                    <span data-count={n.value} data-pad={n.pad || 0}>{pad(n.value, n.pad || 0)}</span>
                    <span className="text-ink/40">{n.suffix}</span>
                  </p>
                  <p className="micro mt-3 text-[10px] text-steel">{n.label}</p>
                </div>
              ))}
            </div>

            <dl className="mt-16 border-t border-ink/20">
              {c.credentials.map(([t, m]) => (
                <div data-row key={t} className="grid gap-1 border-b border-ink/10 py-4 md:grid-cols-12 md:gap-6">
                  <dt className={`text-[15px] font-bold leading-snug ${lean ? 'md:col-span-12' : 'md:col-span-7'}`}>{t}</dt>
                  {!lean && <dd className="micro text-[10px] text-steel md:col-span-5 md:text-right">{m}</dd>}
                </div>
              ))}
            </dl>

            {!lean && (
              <div className="mt-10">
                <p className="micro text-[10px] text-steel">Curriculum</p>
                <a href="CV-Joao-Moises.pdf" download className="underline-link text-[clamp(1.3rem,2.2vw,2.1rem)] font-bold tracking-tight">Descarregar ↓</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
