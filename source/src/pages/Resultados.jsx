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
        intro="Três ciclos Olímpicos na Vela e um percurso de referência no Surf nacional e internacional, Padel e outras modalidades."
      />
      <ResultsBlock data={results[0]} tone="ink" />
      <ResultsBlock data={results[1]} tone="paper" />
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
