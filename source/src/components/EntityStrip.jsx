import { entities } from '../data/content'

function Item({ e }) {
  return (
    <li className="flex shrink-0 items-center gap-14">
      {e.logo ? (
        <img src={e.logo} alt={e.name} className={`${e.h || 'h-9 md:h-11'} w-auto max-w-none opacity-55 grayscale transition-opacity hover:opacity-95`} />
      ) : (
        <span className="display whitespace-nowrap text-[clamp(1.2rem,2.2vw,2rem)] leading-none text-paper/45 grayscale transition-colors hover:text-paper/85">{e.name}</span>
      )}
      <span aria-hidden className="inline-block h-[9px] w-[9px] -skew-x-12 bg-paper/25" />
    </li>
  )
}

export default function EntityStrip() {
  // enough repeats to fill wide screens; the second copy makes the loop seamless
  const set = [...entities, ...entities, ...entities]
  return (
    <section aria-label="Entidades com quem trabalhou" className="strip relative overflow-hidden border-t border-paper/10 bg-ink py-10 text-paper md:py-14">
      <div className="flex w-max" style={{ animation: 'marquee 46s linear infinite' }}>
        <ul className="marquee-set flex shrink-0 items-center gap-14 pr-14">
          {set.map((e, i) => (
            <Item key={i} e={e} />
          ))}
        </ul>
        <ul aria-hidden className="marquee-set flex shrink-0 items-center gap-14 pr-14">
          {set.map((e, i) => (
            <Item key={i} e={e} />
          ))}
        </ul>
      </div>
    </section>
  )
}
