import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from './gsap'

// Runs `setup` only when the user has not asked for reduced motion.
// Initial hidden states are created inside `setup`, so with reduced motion
// everything simply stays visible.
export function useGsap(scopeRef, setup) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(
      { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1024px)' },
      (ctx) => {
        const { motion, desktop } = ctx.conditions
        if (!motion || !scopeRef.current) return
        const q = gsap.utils.selector(scopeRef)
        return setup({ q, desktop, root: scopeRef.current })
      },
      scopeRef
    )
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export { gsap, ScrollTrigger }
