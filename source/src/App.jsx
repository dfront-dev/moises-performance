import { useEffect } from 'react'
import Nav from './components/Nav'
import Spine from './components/Spine'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import System from './components/System'
import Expertise from './components/Expertise'
import Coach from './components/Coach'
import Mindset from './components/Mindset'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ScrollTrigger } from './lib/gsap'

export default function App() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <div className="grain">
      <Nav />
      <Spine />
      <main id="main">
        <Hero />
        <Philosophy />
        <System />
        <Expertise />
        <Coach />
        <Mindset />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
