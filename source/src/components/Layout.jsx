import { useEffect } from 'react'
import Nav from './Nav'
import Spine from './Spine'
import Footer from './Footer'
import EntityStrip from './EntityStrip'
import { ScrollTrigger } from '../lib/gsap'

export default function Layout({ page, tone = 'ink', children }) {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <div className="grain">
      <Nav page={page} tone={tone} />
      <Spine />
      <main id="main">{children}</main>
      <EntityStrip tone={tone} />
      <Footer tone={tone} />
    </div>
  )
}
