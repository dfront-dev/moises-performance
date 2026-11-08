import { useRef } from 'react'
import { Lines } from '../lib/split'
import { useGsap, gsap } from '../lib/useGsap'

function Block({ b, dark }) {
  const hair = dark ? 'border-paper/15' : 'border-ink/15'
  const sub = dark ? 'text-paper/70' : 'text-ink/60'
  const accent = 'text-steel'
  return (
    <div>
      <p data-fade className="micro chip">{b.label}</p>
      <h3 data-fade className="display subhead mt-6 max-w-2xl text-[clamp(1.3rem,2.1vw,2.3rem)]">{b.title}</h3>

      {b.kind === 'steps' && (
        <ol className={`mt-8 border-t ${hair}`}>
          {b.items.map((it, i) => (
            <li key={it.title} data-fade className={`grid gap-2 border-b py-6 md:grid-cols-12 md:gap-6 ${hair}`}>
              <span aria-hidden className={`display text-3xl leading-none md:col-span-1 ${accent}`}>{i + 1}</span>
              <div className="md:col-span-11">
                <p className="text-lg font-bold leading-snug">{it.title}</p>
                <p className={`mt-1 text-[15px] leading-relaxed ${sub}`}>{it.text}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {b.kind === 'list' && (
        <ul className={`mt-8 border-t ${hair}`}>
          {b.items.map((it) => (
            <li key={it.title} data-fade className={`flex gap-4 border-b py-6 ${hair}`}>
              <span aria-hidden className="mt-[9px] h-[8px] w-[8px] shrink-0 bg-signal" />
              <div>
                <p className="text-lg font-bold leading-snug">{it.title}</p>
                <p className={`mt-1 text-[15px] leading-relaxed ${sub}`}>{it.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {b.kind === 'cards' && (
        <>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {b.items.map((it) => (
              <div key={it.title} data-fade className={`border border-t-[4px] border-t-signal p-7 ${hair}`}>
                <p className="display text-[1.35rem] leading-[1]">{it.title}</p>
                {it.text && <p className={`mt-4 text-[15px] leading-relaxed ${sub}`}>{it.text}</p>}
                {it.example && <p className={`mt-4 text-[14px] italic leading-relaxed ${sub}`}>{it.example}</p>}
                {it.list && (
                  <ul className="mt-5 space-y-2.5">
                    {it.list.map((l) => (
                      <li key={l} className={`flex gap-3 text-[14.5px] leading-snug ${sub}`}>
                        <span aria-hidden className="mt-[7px] h-[6px] w-[6px] shrink-0 bg-signal" />
                        {l}
                      </li>
                    ))}
                  </ul>
                )}
                {it.closing && <p className="mt-6 border-t border-current/15 pt-4 text-[15px] font-bold leading-snug">{it.closing}</p>}
              </div>
            ))}
          </div>
          {b.footnote && <p data-fade className={`mt-6 max-w-2xl text-[15px] leading-relaxed ${sub}`}>{b.footnote}</p>}
        </>
      )}

      {b.kind === 'note' && (
        <p data-fade className="mt-6 max-w-xl border-l-[3px] border-signal pl-5 text-lg leading-snug">{b.text}</p>
      )}
    </div>
  )
}

export default function ServiceDetail({ s, d, tone = 'paper' }) {
  const ref = useRef(null)
  const dark = false

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-line]'), {
      yPercent: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: q('h2')[0], start: 'top 85%' },
    })
    q('[data-fade]').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 22, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } })
    })
  })

  return (
    <section id={s.id} ref={ref} className={`relative scroll-mt-0 py-28 md:py-40 ${tone === 'ink' ? 'bg-paper-2' : 'bg-paper'} text-ink`}>
      <div className="mx-auto grid max-w-[1680px] gap-16 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <div className="flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className={`micro px-3 py-2 ${dark ? 'border border-paper/25 text-paper/80' : 'border border-ink/25 text-ink/65'}`}>{t}</span>
              ))}
            </div>
            <h2 aria-label={s.short} className="display mt-8 text-[clamp(1.7rem,1.98vw,2.4rem)]">
              <Lines lines={[s.short]} classes={['text-ink']} />
            </h2>
            <p className={`micro mt-4 ${dark ? 'text-paper/75' : 'text-ink/65'}`}>{s.full}</p>
            <p className={`mt-8 max-w-md text-lg leading-snug ${dark ? 'text-paper/85' : 'text-ink/70'}`}>{d.intro}</p>
          </div>
        </div>
        <div className="space-y-20 md:col-span-7">
          {d.blocks.map((b) => (
            <Block key={b.label} b={b} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  )
}
