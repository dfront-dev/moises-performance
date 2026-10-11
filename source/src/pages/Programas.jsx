import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import ProgramTable from '../components/ProgramTable'
import CtaBand from '../components/CtaBand'

export default function Programas() {
  return (
    <Layout page="programas">
      <PageHeader
        label="Programas"
        lines={['Programas de', 'performance.']}
        classes={['', 'text-signal']}
        intro="Três programas para três momentos: iniciação, alto rendimento e reabilitação."
      />
      <ProgramTable />
      <CtaBand
        lines={['Qual é o', 'teu momento?']}
        text="Conta o essencial e o João indica o programa certo."
        primary={{ label: 'Falar com o João', href: 'contacto.html' }}
        secondary={{ label: 'Ver resultados', href: 'resultados.html' }}
      />
    </Layout>
  )
}
