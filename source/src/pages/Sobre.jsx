import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Coach from '../components/Coach'
import System from '../components/System'
import Differentiators from '../components/Differentiators'
import Collaboration from '../components/Collaboration'
import CtaBand from '../components/CtaBand'

export default function Sobre() {
  return (
    <Layout page="sobre">
      <PageHeader
        label="Sobre"
        lines={['Da avaliação', 'à prática.']}
        classes={['', 'text-signal']}
        intro="Decisões construídas em cima de dados e do terreno. Fisiologista do exercício e preparador físico, com mais de 15 anos de alta competição."
      />
      <Coach index="01 / Percurso" />
      <System />
      <Differentiators />
      <Collaboration />
      <CtaBand
        lines={['Vamos falar', 'de performance.']}
        text="Atletas, federações e estruturas técnicas, em Portugal e internacionalmente."
        primary={{ label: 'Falar com o João', href: 'contacto.html' }}
        secondary={{ label: 'Ver programas', href: 'programas.html' }}
      />
    </Layout>
  )
}
