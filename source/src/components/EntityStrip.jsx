import { entities } from '../data/content'

function Item({ e, paper }) {
  return (
    <li className="flex shrink-0 items-center gap-14">
      {e.logo ? (
        <img src={e.logo} alt={e.name} className={`${e.h || 'h-9 md:h-11'} w-auto max-w-none grayscale transition-opacity ${paper ? 'opacity-60 invert hover:opacity-100' : 'opacity-55 hover:opacity-95'}`} />
      ) : (
        <span className="display whitespace-nowrap text-[clamp(1.2rem,2.2vw,2rem)] leading-none text-paper/45 grayscale transition-colors hover:text-paper/85">{e.name}</span>
      )}
      <span aria-hidden className={`inline-block h-[9px] w-[9px] -skew-x-12 ${paper ? 'bg-ink/25' : 'bg-paper/25'}`} />
    </li>
  )
}

export default function EntityStrip({ tone = 'ink' }) {
  const paper = tone === 'paper'
  // enough repeats to fill wide screens; the second copy makes the loop seamless
  const set = [...entities, ...entities, ...entities]
  return (
    <section aria-label="Entidades com quem trabalhou" className={`strip relative overflow-hidden border-t py-10 md:py-14 ${paper ? 'border-ink/10 bg-paper text-ink' : 'border-paper/10 bg-ink text-paper'}`}>
      <div className="flex w-max" style={{ animation: 'marquee 46s linear infinite' }}>
        <ul className="marquee-set flex shrink-0 items-center gap-14 pr-14">
          {set.map((e, i) => (
            <Item key={i} e={e} paper={paper} />
          ))}
        </ul>
        <ul aria-hidden className="marquee-set flex shrink-0 items-center gap-14 pr-14">
          {set.map((e, i) => (
            <Item key={i} e={e} paper={paper} />
          ))}
        </ul>
      </div>
    </section>
  )
}
