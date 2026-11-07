import { entities } from '../data/content'

// A still row of partner marks: no marquee, no continuous motion.
export default function EntityStrip({ tone = 'paper' }) {
  const paper = tone === 'paper'
  return (
    <section
      aria-label="Entidades com quem trabalhou"
      className={`border-t py-14 md:py-20 ${paper ? 'border-ink/10 bg-paper text-ink' : 'border-paper/10 bg-ink text-paper'}`}
    >
      <ul className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-center gap-x-14 gap-y-10 px-5 md:justify-between md:gap-x-10 md:px-10">
        {entities.map((e) => (
          <li key={e.name} className="flex items-center">
            {e.logo ? (
              <img
                src={e.logo}
                alt={e.name}
                width={e.w}
                height={e.ht}
                decoding="sync"
                className={`${e.h || 'h-9 md:h-11'} w-auto max-w-none grayscale transition-opacity duration-500 ${paper ? 'opacity-55 invert hover:opacity-90' : 'opacity-55 hover:opacity-90'}`}
              />
            ) : (
              <span className="micro text-steel">{e.name}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
