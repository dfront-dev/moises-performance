import { testimonials } from '../data/content'

export default function Quote({ tone = 'paper' }) {
  const t = testimonials[0]
  const dark = tone === 'ink'
  return (
    <figure data-fade className={`relative border border-t border-t-signal p-8 md:p-12 ${dark ? 'border-paper/15 bg-paper/[0.04] text-paper' : 'border-ink/10 bg-paper-2 text-ink'}`}>
      <span aria-hidden className={`display block text-7xl leading-none ${dark ? 'text-signal' : 'text-signal'}`}>"</span>
      <blockquote className="mt-2 text-[clamp(1.05rem,1.5vw,1.45rem)] leading-snug">{t.quote}</blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        <span aria-hidden className="grid h-11 w-11 place-items-center border border-ink/20 text-[12px] font-medium text-ink/70">{t.initials}</span>
        <span>
          <span className="block text-sm font-bold">{t.name}</span>
          <span className={`micro text-[10px] ${dark ? 'text-paper/65' : 'text-ink/60'}`}>{t.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}
