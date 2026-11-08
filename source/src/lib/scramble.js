// "Calculating" text: letters flip through random characters and settle from left to right,
// like a readout resolving. Used on hover for calls to action and once on entry for short pieces of text.
const LOWER = 'abcdefghijklmnopqrstuvwxyz0123456789'
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const DIGITS = '0123456789'

const pick = (set) => set[(Math.random() * set.length) | 0]
const isLetter = (c) => /[A-Za-zÀ-ÿ]/.test(c)
const isUpper = (c) => c === c.toUpperCase() && c !== c.toLowerCase()

// Pure: what the text looks like at `progress` (0 to 1). Spaces and punctuation never change.
export function scrambleText(text, progress) {
  const n = text.length
  const settled = Math.floor(progress * n)
  let out = ''
  for (let i = 0; i < n; i++) {
    const c = text[i]
    if (i < settled || progress >= 1 || !/[A-Za-zÀ-ÿ0-9]/.test(c)) out += c
    else if (/[0-9]/.test(c)) out += pick(DIGITS)
    else out += pick(isUpper(c) ? UPPER : LOWER)
  }
  return out
}

function textNodes(el) {
  const nodes = []
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  let n
  while ((n = w.nextNode())) if (n.nodeValue.trim()) nodes.push({ node: n, text: n.nodeValue })
  return nodes
}

export function scramble(el, { duration = 480, delay = 0, lock = true } = {}) {
  if (!el || el._scrambling) return
  const nodes = textNodes(el)
  if (!nodes.length) return
  el._scrambling = true
  if ((el.tagName === 'A' || el.tagName === 'BUTTON') && !el.hasAttribute('aria-label')) el.setAttribute('aria-label', el.textContent.trim())
  const total = nodes.reduce((a, b) => a + b.text.length, 0)
  const prevMin = el.style.minWidth
  if (lock) el.style.minWidth = `${el.getBoundingClientRect().width}px` // no layout jitter while letters change width
  const t0 = performance.now() + delay
  let last = 0
  const frame = (now) => {
    const p = Math.max(0, Math.min(1, (now - t0) / duration))
    if (now - last > 34 || p >= 1) {
      last = now
      let offset = 0
      for (const { node, text } of nodes) {
        const local = Math.max(0, Math.min(1, (p * total - offset) / text.length))
        node.nodeValue = p <= 0 ? text : scrambleText(text, local)
        offset += text.length
      }
    }
    if (p < 1) requestAnimationFrame(frame)
    else { nodes.forEach(({ node, text }) => { node.nodeValue = text }); el.style.minWidth = prevMin; el._scrambling = false }
  }
  requestAnimationFrame(frame)
}

const HOVER = '.btn, [data-scramble-hover]'
const ENTER = '[data-scramble-in], .chip'

export function initScramble() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  // hover and keyboard focus on calls to action
  const over = (e) => {
    const host = e.target.closest && e.target.closest(HOVER)
    if (!host) return
    // a card link scrambles only its call-to-action label
    const el = host.matches('a') && host.querySelector('[data-scramble-hover]') ? host.querySelector('[data-scramble-hover]') : host
    scramble(el, { duration: 460 })
  }
  document.addEventListener('mouseover', over)
  document.addEventListener('focusin', over)

  // entry: once, when the text first scrolls into view
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      io.unobserve(e.target)
      const run = () => scramble(e.target, { duration: Number(e.target.dataset.scrambleIn) || 900, delay: 120, lock: false })
      if (window.__jmpReady) run(); else window.addEventListener('jmp:ready', run, { once: true })
    })
  }, { threshold: 0.6 })
  const seen = new WeakSet()
  const scan = () => document.querySelectorAll(ENTER).forEach((el) => { if (!seen.has(el)) { seen.add(el); io.observe(el) } })
  scan()
  const mo = new MutationObserver(() => { clearTimeout(scan.t); scan.t = setTimeout(scan, 120) })
  mo.observe(document.getElementById('root') || document.body, { childList: true, subtree: true })

  return () => { document.removeEventListener('mouseover', over); document.removeEventListener('focusin', over); io.disconnect(); mo.disconnect() }
}
