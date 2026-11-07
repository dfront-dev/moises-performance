import { writeFileSync } from 'node:fs'

const site = 'https://moises-performance.com/'
const pages = [
  {
    file: 'index.html', page: 'home', path: '',
    title: 'JMP, João Moisés Performance Physiology | Fisiologia aplicada à performance',
    desc: 'João Moisés Performance Physiology. Fisiologia aplicada à performance: avaliar, interpretar e transformar informação fisiológica em decisões concretas de treino, em parceria com atletas, treinadores e equipas.',
    h1: 'Fisiologia aplicada à performance.',
    body: '<p>JMP, João Moisés Performance Physiology. Fisiologista do exercício, com mais de 15 anos de experiência em alta competição e três ciclos Olímpicos (Rio 2016, Tóquio 2020, Paris 2024). Avaliar, interpretar e transformar informação fisiológica em decisões concretas de treino, em parceria com atletas, treinadores e equipas.</p>',
    jsonld: true, preload: true,
  },
  {
    file: 'servicos.html', page: 'servicos', path: 'servicos.html',
    title: 'Serviços | JMP, João Moisés Performance Physiology',
    desc: 'Consultoria estratégica de otimização do treino, avaliação física e fisiológica presencial e acompanhamento integrado de performance. Fisiologia aplicada à performance.',
    h1: 'Serviços de performance.',
    body: '<ul><li>Consultoria estratégica de otimização do treino: compreender e orientar. Online, pontual ou periódica.</li><li>Avaliação física e fisiológica presencial: avaliar e aprofundar.</li><li>Acompanhamento Integrado de Performance: acompanhar e otimizar, de forma continuada, personalizada e premium.</li></ul>',
  },
  {
    file: 'resultados.html', page: 'resultados', path: 'resultados.html',
    title: 'Resultados | JMP, João Moisés Performance Physiology',
    desc: 'Resultados na Vela Olímpica (Paris 2024, Tóquio 2020, Rio 2016) e no Surf, Padel e outras modalidades. Resultados dos atletas e das respetivas equipas.',
    h1: 'Resultados desportivos.',
    body: '<p>Três ciclos Olímpicos na Vela e um percurso de referência no Surf nacional e internacional, Padel e outras modalidades.</p>',
  },
  {
    file: 'sobre.html', page: 'sobre', path: 'sobre.html',
    title: 'Sobre | JMP, João Moisés Performance Physiology',
    desc: 'Perfil, método e formação de João Moisés, fisiologista do exercício e preparador físico com mais de 15 anos de experiência em alta competição.',
    h1: 'Da avaliação à prática.',
    body: '<p>João Moisés, fisiologista do exercício e preparador físico. Preparador Físico da Federação Portuguesa de Vela. Mestrado em Treino Desportivo (Alto Rendimento).</p>',
  },
  {
    file: 'contacto.html', page: 'contacto', path: 'contacto.html',
    title: 'Contacto | JMP, João Moisés Performance Physiology',
    desc: 'Contacta João Moisés para acompanhamento de atletas, federações e estruturas técnicas, em Portugal e internacionalmente.',
    h1: 'O teu próximo nível começa aqui.',
    body: '<p><a href="mailto:joaomoises13@gmail.com">joaomoises13@gmail.com</a> · +351 918 669 143</p>',
  },
  {
    file: 'testemunhos.html', page: 'testemunhos', path: 'testemunhos.html',
    title: 'Testemunhos | JMP, João Moisés Performance Physiology',
    desc: 'Testemunhos de atletas, treinadores e federações sobre o acompanhamento de João Moisés.',
    h1: 'Testemunhos.',
    body: '<p>Página em construção, a reunir testemunhos reais e autorizados.</p>',
  },
]

const jsonld = `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "João Moisés",
        "jobTitle": "Fisiologista do Exercício",
        "url": "${site}",
        "email": "joaomoises13@gmail.com",
        "telephone": "+351918669143",
        "worksFor": { "@type": "Organization", "name": "Federação Portuguesa de Vela" },
        "brand": { "@type": "Brand", "name": "JMP, João Moisés Performance Physiology" }
      }
    </script>`

for (const p of pages) {
  const html = `<!doctype html>
<html lang="pt-PT">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${p.title}</title>
    <meta name="description" content="${p.desc}" />
    <meta name="theme-color" content="#080A0B" />
    <meta name="robots" content="noindex" data-dev-only />
    <link rel="canonical" href="${site}${p.path}" />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <link rel="preload" href="./fonts/Satoshi-Variable.woff2" as="font" type="font/woff2" crossorigin />${p.preload ? '\n    <link rel="preload" as="image" href="./images/joao.webp" type="image/webp" fetchpriority="high" />' : ''}
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_PT" />
    <meta property="og:title" content="${p.title}" />
    <meta property="og:description" content="${p.desc}" />
    <meta property="og:url" content="${site}${p.path}" />
    <meta property="og:image" content="${site}images/joao.jpg" />
    <meta name="twitter:card" content="summary_large_image" />${p.jsonld ? jsonld : ''}
  </head>
  <body>
    <div id="root" data-page="${p.page}">
      <main style="font-family:sans-serif;background:#080A0B;color:#F2F3F1;padding:48px;min-height:100vh">
        <h1>${p.h1}</h1>
        ${p.body}
      </main>
    </div>
    <noscript>Este site requer JavaScript para a experiência completa. Contacto: joaomoises13@gmail.com · +351 918 669 143.</noscript>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`
  writeFileSync(new URL(`../${p.file}`, import.meta.url), html.replace(/\n\s*<meta name="robots" content="noindex" data-dev-only \/>/, ''))
}
console.log('generated', pages.length, 'pages')
