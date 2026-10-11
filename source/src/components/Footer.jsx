import { footerLinks } from '../data/content'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-[6px] border-signal bg-ink text-paper">
      <div className="mx-auto flex max-w-[1680px] flex-col justify-between gap-10 px-5 pb-6 pt-14 md:flex-row md:items-start md:px-10">
        <div>
          <img src="images/jmp-logo-white.png" alt="JMP" width="177" height="59" loading="lazy" className="h-7 w-auto" />
          <p className="micro mt-4 text-[10px] text-steel">João Moisés Performance</p>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {footerLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} {...(l.download ? { download: true } : {})} className="micro text-paper/75 transition-colors hover:text-signal">{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <p aria-hidden className="display pointer-events-none -mb-[0.16em] mt-6 select-none whitespace-nowrap text-center text-[clamp(8rem,34vw,44rem)] italic leading-[0.8] text-signal/[0.16]" style={{ transform: 'skewX(-10deg)' }}>
        JMP
      </p>
      <div className="mx-auto flex max-w-[1680px] justify-between px-5 pb-6 md:px-10">
        <p className="micro text-[10px] text-steel">© 2026 JMP</p>
        <p className="micro text-[10px] text-steel">Precisão. Disciplina. Progresso.</p>
      </div>
    </footer>
  )
}
