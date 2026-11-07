import { useRef } from 'react'
import { footerLinks, social, EMAIL, PHONE, PHONE_HREF } from '../data/content'
import { services } from '../data/services'
import DotField from './DotField'
import Crosses from './Crosses'
import { useGsap, gsap } from '../lib/useGsap'

const big = 'text-[clamp(1.35rem,2.3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em]'

function Group({ label, children }) {
  return (
    <div data-fgroup>
      <p className="micro text-steel">{label}</p>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-8 gap-y-2">{children}</div>
    </div>
  )
}

export default function Footer() {
  const ref = useRef(null)

  useGsap(ref, ({ q }) => {
    gsap.from(q('[data-fphoto]'), { clipPath: 'inset(0 0 100% 0)', duration: 1.5, ease: 'power3.inOut', scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    gsap.from(q('[data-fphoto] img'), { scale: 1.12, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 80%' } })
    gsap.from(q('[data-fgroup], [data-fcta]'), { opacity: 0, y: 22, stagger: 0.09, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 75%' } })
  })

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-ink/15 bg-paper text-ink">
      <DotField />
      <div className="relative mx-auto grid max-w-[1680px] gap-14 px-5 pb-12 pt-16 md:grid-cols-12 md:gap-10 md:px-10 md:pb-16 md:pt-24">
        <div className="md:col-span-6">
          <div className="relative">
          <div data-fphoto className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-paper-2">
            <picture>
              <source srcSet="images/recovery.webp" type="image/webp" />
              <img src="images/recovery.jpg" alt="Treinador a orientar um atleta num exercício de mobilidade com banda elástica" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover grayscale" style={{ objectPosition: '42% 50%' }} />
            </picture>
          </div>
            <Crosses />
          </div>
        </div>

        <div className="space-y-9 md:col-span-5 md:col-start-8">
          <Group label="Serviços">
            {services.map((s) => (
              <a key={s.id} href={`servicos.html#${s.id}`} className={`underline-link ${big}`}>{s.short}</a>
            ))}
          </Group>
          <Group label="Navegação">
            {footerLinks.map((l) => (
              <a key={l.label} href={l.href} {...(l.download ? { download: true } : {})} className={`underline-link ${big}`}>{l.label}</a>
            ))}
          </Group>
          <Group label="Contactos">
            <a href={`mailto:${EMAIL}`} className={`underline-link break-all ${big}`}>{EMAIL}</a>
            <a href={PHONE_HREF} className={`underline-link ${big}`}>{PHONE}</a>
          </Group>
          <Group label="Redes">
            {[['Instagram', social.instagram], ['LinkedIn', social.linkedin]].map(([name, href]) =>
              href ? (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" className={`underline-link ${big}`}>{name}</a>
              ) : (
                <span key={name} className={`${big} text-ink/35`}>{name}</span>
              )
            )}
          </Group>
          <div data-fcta className="pt-2">
            <a href="contacto.html" className="btn btn-solid micro">
              Agendar consulta <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-4 border-t border-ink/10 px-5 py-6 md:px-10">
        <div className="flex items-center gap-5">
          <img src="images/jmp-logo.svg" alt="JMP" width="72" height="29" className="h-5 w-auto" />
          <p className="micro text-steel">© 2026 JMP</p>
        </div>
        <p className="micro bullets text-steel">
          <a href="privacidade.html" className="transition-colors hover:text-ink">Política de privacidade</a>
          <a href="termos.html" className="transition-colors hover:text-ink">Termos e condições</a>
        </p>
      </div>
    </footer>
  )
}
