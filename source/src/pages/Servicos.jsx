import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import ServiceTable from '../components/ServiceTable'
import ServiceDetail from '../components/ServiceDetail'
import ResultsBlock from '../components/ResultsBlock'
import CtaBand from '../components/CtaBand'
import { services, details, intro, statement, otherAreas } from '../data/services'

export default function Servicos() {
  return (
    <Layout page="servicos">
      <PageHeader
        label="Serviços"
        lines={['Consultoria de', 'fisiologia']}
        classes={['', 'text-signal']}
        intro={intro}
      />
      <ServiceTable />
      {services.map((s, i) => (
        <ServiceDetail key={s.id} s={s} d={details[s.id]} tone={i % 2 === 0 ? 'paper' : 'ink'} />
      ))}
      <section className="bg-ink px-5 py-24 text-paper md:px-10 md:py-36">
        <p className="display mx-auto max-w-[1680px] text-[clamp(2rem,6vw,7rem)] leading-[0.95]">{statement}</p>
      </section>
      <ResultsBlock data={otherAreas} tone="paper" />
      <CtaBand
        lines={['Qual é o', 'serviço certo?']}
        text="Conta o essencial e o João indica a melhor forma de intervir."
        primary={{ label: 'Falar com o João', href: 'contacto.html' }}
        secondary={{ label: 'Ver resultados', href: 'resultados.html' }}
      />
    </Layout>
  )
}
