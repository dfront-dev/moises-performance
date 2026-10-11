import { useRef } from 'react'
import { coach as c } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

const pad = (n, p = 0) => String(n).padStart(p, '0')

export default function Coach() {
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 118, duration: 1.3, stagger: 0.12, ease: 'power4.out',
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
      clipPath: 'inset(0 0 100% 0)', duration: 1.4, ease: 'power4.inOut',
      scrollTrigger: { trigger: q('[data-coach-frame]')[0], start: 'top 85%' },
    })
    gsap.to(img, {
      yPercent: -7, ease: 'none',
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

  const loop = [...c.highlights, ...c.highlights]

  return (
    <section id="sobre" ref={ref} className="relative bg-ink pt-28 text-paper md:pt-44">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <p data-fade className="micro flex justify-between border-t border-paper/20 pt-4">
          <span>{c.index}</span>
          <span className="text-steel">João Moisés</span>
        </p>

        <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12">
          {/* portrait */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <div data-coach-frame className="relative aspect-[3/4] overflow-hidden bg-steel/20">
                <picture>
                  <source srcSet="images/joao.webp" type="image/webp" />
                  <img
                    data-coach-img
                    src="images/joao.jpg"
                    alt="Retrato de João Moisés"
                    width="1086"
                    height="1448"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-[112%] w-full object-cover object-[50%_20%]"
                    style={{ filter: 'grayscale(1) contrast(1.15) brightness(0.92)' }}
                  />
                </picture>
                <span aria-hidden className="absolute left-0 top-0 h-5 w-5 border-l border-t border-paper/70" />
                <span aria-hidden className="absolute right-0 top-0 h-5 w-5 border-r border-t border-paper/70" />
                <span aria-hidden className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-paper/70" />
                <span aria-hidden className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-paper/70" />
                <p className="micro absolute bottom-5 left-5 bg-ink/80 px-3 py-2 text-[10px]">
                  Fisiologista do Exercício <span className="text-signal">/</span> Preparador Físico
                </p>
              </div>
            </div>
          </div>

          {/* copy */}
          <div className="md:col-span-7 md:pl-6">
            <h2 aria-label={c.lines.join(' ')} className="display text-[clamp(3rem,8.2vw,9.5rem)]">
              <Lines lines={c.lines} />
            </h2>

            <div className="mt-14 max-w-2xl space-y-6 text-lg leading-relaxed text-paper/80 md:text-xl">
              {c.body.map((p) => (
                <p key={p} data-fade>{p}</p>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-paper/20 pt-8">
              {c.numbers.map((n) => (
                <div key={n.label}>
                  <p className="display text-[clamp(3rem,6.4vw,7rem)] leading-none">
                    <span data-count={n.value} data-pad={n.pad || 0}>{pad(n.value, n.pad || 0)}</span>
                    <span className="text-signal">{n.suffix}</span>
                  </p>
                  <p className="micro mt-3 text-[10px] text-steel">{n.label}</p>
                </div>
              ))}
            </div>
            <p className="micro mt-6 text-[10px] text-steel">{c.numbersNote}</p>

            <dl className="mt-16 border-t border-paper/20">
              {c.credentials.map(([t, m]) => (
                <div data-row key={t} className="grid gap-1 border-b border-paper/10 py-4 md:grid-cols-12 md:gap-6">
                  <dt className="text-[15px] font-bold leading-snug md:col-span-7">{t}</dt>
                  <dd className="micro text-[10px] text-steel md:col-span-5 md:text-right">{m}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* results ticker */}
      <div className="mt-28 overflow-hidden border-y border-paper/15 py-6 md:mt-40" role="region" aria-label="Resultados dos atletas">
        <div className="marquee-track flex w-max gap-14 whitespace-nowrap">
          {loop.map((h, i) => (
            <p key={i} aria-hidden={i >= c.highlights.length} className="display flex items-center gap-14 text-[clamp(1.4rem,2.6vw,2.6rem)] leading-none">
              {h}
              <span aria-hidden className="inline-block h-2 w-2 bg-signal" />
            </p>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1680px] flex-col justify-between gap-5 px-5 py-8 md:flex-row md:items-start md:px-10">
        <p className="micro max-w-2xl text-[10px] leading-relaxed text-steel">{c.footnote}</p>
        <a href="resultados.html" className="micro underline-link shrink-0 pb-1">Ver todos os resultados →</a>
      </div>
    </section>
  )
}
