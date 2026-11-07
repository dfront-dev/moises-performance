import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Philosophy from '../components/Philosophy'
import System from '../components/System'
import Expertise from '../components/Expertise'
import Audiences from '../components/Audiences'
import Endurance from '../components/Endurance'
import Coach from '../components/Coach'
import Mindset from '../components/Mindset'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <Layout page="home">
      <Hero />
      <Philosophy />
      <System />
      <Expertise />
      <Audiences />
      <Endurance />
      <Coach lean />
      <Mindset />
      <Contact />
    </Layout>
  )
}
