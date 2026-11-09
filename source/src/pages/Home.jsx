import Layout from '../components/Layout'
import SportsSpiral from '../components/SportsSpiral'
import Hero from '../components/Hero'
import Philosophy from '../components/Philosophy'
import Expertise from '../components/Expertise'
import Audiences from '../components/Audiences'
import Endurance from '../components/Endurance'
import Testimonials from '../components/Testimonials'

// Secção Endurance escondida por agora. Para voltar a mostrá-la, passar a true.
const SHOW_ENDURANCE = false

export default function Home() {
  return (
    <Layout page="home">
      <Hero />
      <SportsSpiral />
      <Philosophy />
      <Expertise />
      <Audiences />
      {SHOW_ENDURANCE && <Endurance />}
      <Testimonials />
    </Layout>
  )
}
