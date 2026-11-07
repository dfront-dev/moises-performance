import { useRef } from 'react'
import { hero } from '../data/content'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

// Calm editorial hero: statement and one action on the left, a single portrait on the right.
export default function Hero() {
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(q('[data-hero-line]'), { yPercent: 50, opacity: 0, duration: 1.3, stagger: 0.12 }, 0.15)
      .from(q('[data-portrait]'), { clipPath: 'inset(0 0 100% 0)', duration: 1.6, ease: 'power3.inOut' }, 0)
      .from(q('[data-portrait-img]'), { scale: 1.06, duration: 2.2 }, 0)
      .from(q('[data-fade]'), { opacity: 0, y: 14, stagger: 0.1, duration: 1 }, 0.7)
      .from(q('[data-rule]'), { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'power3.inOut' }, 0.5)
  })

  return (
    <section id="top" ref={ref} className="relative bg-paper text-ink">
      <div className="mx-auto grid min-h-[100svh] max-w-[1680px] gap-12 px-5 pb-16 pt-32 md:grid-cols-12 md:items-center md:gap-10 md:px-10 md:pb-20 md:pt-28">
        <div className="md:col-span-7">
          <p data-fade className="micro text-[10.5px] text-steel">{hero.role}</p>
          <h1
            aria-label={hero.lines.join(' ')}
            className="display mt-8 text-[clamp(2.5rem,6.4vw,7.2rem)] md:mt-10"
          >
            <Lines lines={hero.lines} classes={['', 'text-ink/50', 'text-ink/50']} dataAttr="data-hero-line" />
          </h1>
          <div data-rule aria-hidden className="mt-12 h-px w-full max-w-md bg-ink/20 md:mt-16" />
          <p data-fade className="mt-8 max-w-md text-lg leading-relaxed text-ink/75 md:text-xl">{hero.support}</p>
          <div data-fade className="mt-10">
            <a href={hero.primary.href} className="btn btn-solid micro">
              {hero.primary.label} <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="md:col-span-5">
          <div data-portrait className="relative aspect-[4/5] overflow-hidden bg-paper-2">
            <picture>
              <source srcSet="images/joao.webp" type="image/webp" />
              <img
                data-portrait-img
                alt="João Moisés, fisiologista do exercício, de braços cruzados num espaço de treino"
                src="images/joao.jpg"
                width="1086"
                height="1448"
                fetchpriority="high"
                className="absolute inset-0 h-full w-full object-cover object-[50%_14%] grayscale contrast-[1.04]"
              />
            </picture>
          </div>
          <p data-fade className="micro mt-4 text-[10px] text-steel">João Moisés</p>
        </div>
      </div>
    </section>
  )
}
