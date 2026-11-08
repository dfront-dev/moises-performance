import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import ResultsBlock from '../components/ResultsBlock'
import Testimonials from '../components/Testimonials'
import { results } from '../data/results'

export default function Resultados() {
  return (
    <Layout page="resultados" tone="paper">
      <PageHeader
        tone="paper"
        label="Resultados"
        lines={['Resultados', 'desportivos.']}
        classes={['', 'text-ink/50']}
        framedImage="resultados-hero-v2"
        framedPos="28% 30%"
        framedAlt="Atletas da Vela a abraçarem-se, em festa, com o preparador físico num barco"
        intro="Três ciclos Olímpicos na Vela, um percurso de referência no Surf nacional e internacional e resultados no Padel."
      />
      <ResultsBlock data={results[0]} tone="paper" saturated compact />
      <ResultsBlock data={results[1]} tone="paper" saturated compact />
      <ResultsBlock data={results[2]} tone="paper" saturated compact />
      <Testimonials tone="paper" />
    </Layout>
  )
}
