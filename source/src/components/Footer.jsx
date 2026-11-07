import DotField from './DotField'
import { footerLinks, social, EMAIL, PHONE, PHONE_HREF } from '../data/content'

const Icon = ({ href, label, children, external = true, paper = false }) => {
  const svg = (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  )
  const cls = `grid h-9 w-9 place-items-center transition-colors ${paper ? 'text-ink' : 'text-paper'}`
  if (!href) return <span role="img" aria-label={label} className={cls}>{svg}</span>
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`${cls} ${paper ? 'hover:text-ink/60' : 'hover:text-signal'}`}
    >
      {svg}
    </a>
  )
}

export default function Footer({ tone = 'paper' }) {
  const paper = tone === 'paper'
  const hov = paper ? 'hover:text-ink/60' : 'hover:text-signal'
  return (
    <footer className={`relative overflow-hidden border-t border-ink/15 ${paper ? 'bg-paper text-ink' : 'bg-ink text-paper'}`}>
      <DotField />
      <div className="relative mx-auto flex max-w-[1680px] flex-col justify-between gap-10 px-5 pb-10 pt-16 md:flex-row md:items-start md:px-10">
        <div>
          <img src={paper ? 'images/jmp-logo-black.png' : 'images/jmp-logo-white.png'} alt="JMP" width="177" height="59" className="h-7 w-auto" />
          <p className="micro mt-4 text-[10px] text-steel">João Moisés Performance Physiology</p>
          <div className="mt-6 space-y-1.5 text-[15px]">
            <a href={`mailto:${EMAIL}`} className={`block transition-colors ${paper ? 'text-ink/85' : 'text-paper/85'} ${hov}`}>{EMAIL}</a>
            <a href={PHONE_HREF} className={`block transition-colors ${paper ? 'text-ink/85' : 'text-paper/85'} ${hov}`}>{PHONE}</a>
          </div>
          <div className="mt-5 flex gap-2 -ml-2">
            <Icon href={social.instagram} label="Instagram" paper={paper}>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
            </Icon>
            <Icon href={social.linkedin} label="LinkedIn" paper={paper}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M8 10.5V16M8 7.8v.1M12 16v-5.5M12 12.6c0-1.3 1-2.1 2.2-2.1S16.5 11.3 16.5 12.8V16" />
            </Icon>
            <Icon href={`mailto:${EMAIL}`} label="Email" external={false} paper={paper}>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3.5 6.5 12 13l8.5-6.5" />
            </Icon>
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {footerLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} {...(l.download ? { download: true } : {})} className={`micro transition-colors ${paper ? 'text-ink/75' : 'text-paper/75'} ${hov}`}><span className="roll"><span>{l.label}</span><span aria-hidden>{l.label}</span></span></a>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative mx-auto flex max-w-[1680px] justify-between px-5 pb-6 md:px-10">
        <p className="micro text-[10px] text-steel">© 2026 JMP</p>
        <p className="micro flex gap-6 text-[10px] text-steel">
          <a href="privacidade.html" className={`transition-colors ${hov}`}>Política de privacidade</a>
          <a href="termos.html" className={`transition-colors ${hov}`}>Termos e condições</a>
        </p>
      </div>
    </footer>
  )
}
