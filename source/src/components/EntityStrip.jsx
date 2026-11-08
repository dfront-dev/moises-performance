import { entities } from '../data/content'

// Partner marks on a slow, endless loop. The spacing between marks never changes: the set is simply repeated.
function Row({ paper, hidden = false }) {
  return (
    <ul className={`marquee-row flex shrink-0 items-center ${hidden ? 'marquee-dup' : ''}`} aria-hidden={hidden || undefined} style={{ gap: 'var(--marquee-gap)', paddingRight: 'var(--marquee-gap)' }}>
      {entities.map((e) => (
        <li key={e.name} className="flex shrink-0 items-center">
          {e.logo ? (
            <img
              src={e.logo}
              alt={hidden ? '' : e.name}
              width={e.w}
              height={e.ht}
              decoding="sync"
              className={`${e.h || 'h-9 md:h-11'} w-auto max-w-none grayscale ${paper ? 'opacity-55 invert' : 'opacity-55'}`}
            />
          ) : (
            <span className="micro text-steel">{e.name}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function EntityStrip({ tone = 'paper' }) {
  const paper = tone === 'paper'
  return (
    <section
      aria-label="Entidades com quem trabalhou"
      className={`overflow-hidden border-t py-14 md:py-20 ${paper ? 'border-ink/10 bg-paper text-ink' : 'border-paper/10 bg-ink text-paper'}`}
    >
      <div className="marquee">
        <div className="marquee-track flex w-max">
          <Row paper={paper} />
          <Row paper={paper} hidden />
        </div>
      </div>
    </section>
  )
}
