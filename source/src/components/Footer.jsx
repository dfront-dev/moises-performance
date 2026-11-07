import { footerLinks, social, EMAIL, PHONE, PHONE_HREF } from '../data/content'

const Icon = ({ href, label, children, external = true }) => (
  <a
    href={href}
    aria-label={label}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className="grid h-11 w-11 place-items-center border border-paper/25 text-paper transition-colors hover:border-signal hover:bg-signal hover:text-ink"
  >
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  </a>
)

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-[6px] border-signal bg-ink text-paper">
      <div className="mx-auto flex max-w-[1680px] flex-col justify-between gap-10 px-5 pb-6 pt-14 md:flex-row md:items-start md:px-10">
        <div>
          <img src="images/jmp-logo-white.png" alt="JMP" width="177" height="59" loading="lazy" className="h-7 w-auto" />
          <p className="micro mt-4 text-[10px] text-steel">João Moisés Performance Physiology</p>
          <div className="mt-6 space-y-1.5 text-[15px]">
            <a href={`mailto:${EMAIL}`} className="block text-paper/85 transition-colors hover:text-signal">{EMAIL}</a>
            <a href={PHONE_HREF} className="block text-paper/85 transition-colors hover:text-signal">{PHONE}</a>
          </div>
          <div className="mt-6 flex gap-3">
            {social.instagram && (
              <Icon href={social.instagram} label="Instagram">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
              </Icon>
            )}
            {social.linkedin && (
              <Icon href={social.linkedin} label="LinkedIn">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M8 10.5V16M8 7.8v.1M12 16v-5.5M12 12.6c0-1.3 1-2.1 2.2-2.1S16.5 11.3 16.5 12.8V16" />
              </Icon>
            )}
            <Icon href={`mailto:${EMAIL}`} label="Email" external={false}>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3.5 6.5 12 13l8.5-6.5" />
            </Icon>
          </div>
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
        <p className="micro flex gap-6 text-[10px] text-steel">
          <a href="privacidade.html" className="transition-colors hover:text-signal">Política de privacidade</a>
          <a href="termos.html" className="transition-colors hover:text-signal">Termos e condições</a>
        </p>
      </div>
    </footer>
  )
}
