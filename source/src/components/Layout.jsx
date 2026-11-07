import { useEffect } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import EntityStrip from './EntityStrip'
import { ScrollTrigger } from '../lib/gsap'
import { startSmoothScroll } from '../lib/smooth'

export default function Layout({ page, tone = 'paper', children }) {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    const stopSmooth = startSmoothScroll()
    return () => {
      window.removeEventListener('load', refresh)
      stopSmooth()
    }
  }, [])

  return (
    <div>
      <Nav page={page} tone={tone} />
      <main id="main">{children}</main>
      <EntityStrip tone={tone} />
      <Footer tone={tone} />
    </div>
  )
}
