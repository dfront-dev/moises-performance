import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import ResultsBlock from '../components/ResultsBlock'
import CtaBand from '../components/CtaBand'
import Testimonials from '../components/Testimonials'
import { results } from '../data/results'

export default function Resultados() {
  return (
    <Layout page="resultados">
      <PageHeader
        label="Resultados"
        lines={['Resultados', 'desportivos.']}
        classes={['', 'text-signal']}
        image="resultados-hero-v2"
        imagePos="50% 0%"
        intro="Três ciclos Olímpicos na Vela, um percurso de referência no Surf nacional e internacional e resultados no Padel."
      />
      <ResultsBlock data={results[0]} tone="ink" />
      <ResultsBlock data={results[1]} tone="paper" />
      <ResultsBlock data={results[2]} tone="ink" />
      <Testimonials />
      <CtaBand
        lines={['Queres resultados', 'assim na tua equipa?']}
        text="Vamos falar dos objetivos da tua época."
        primary={{ label: 'Ver serviços', href: 'servicos.html' }}
        secondary={{ label: 'Contactar', href: 'contacto.html' }}
      />
    </Layout>
  )
}
