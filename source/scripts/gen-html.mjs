import { writeFileSync } from 'node:fs'

const site = 'https://moises-performance.com/'
const pages = [
  {
    file: 'index.html', page: 'home', path: '',
    title: 'JMP, João Moisés Performance Physiology | Fisiologia aplicada à performance',
    desc: 'Fisiologia aplicada à performance. Avaliação, interpretação e transformação de informação fisiológica em estratégias inteligentes de treino, em parceria com atletas, treinadores e equipas.',
    h1: 'Fisiologia aplicada à performance.',
    body: '<p>JMP, João Moisés Performance Physiology. Fisiologista do exercício, com mais de 15 anos de experiência em alta competição e três ciclos Olímpicos (Rio 2016, Tóquio 2020, Paris 2024). Avaliação, interpretação e transformação de informação fisiológica em estratégias inteligentes de treino, em parceria com atletas, treinadores e equipas.</p>',
    jsonld: true, preload: true,
  },
  {
    file: 'servicos.html', page: 'servicos', path: 'servicos.html',
    title: 'Serviços | JMP, João Moisés Performance Physiology',
    desc: 'Consultoria estratégica de otimização do treino, avaliação física e fisiológica presencial e acompanhamento integrado de performance. Fisiologia aplicada à performance.',
    h1: 'Consultoria de fisiologia',
    body: '<ul><li>Consultoria estratégica de otimização do treino: compreender e orientar. Online, pontual ou periódica.</li><li>Avaliação física e fisiológica presencial: avaliar e aprofundar.</li><li>Acompanhamento Integrado de Performance: acompanhar e otimizar, de forma continuada, personalizada e premium.</li></ul>',
  },
  {
    file: 'resultados.html', page: 'resultados', path: 'resultados.html',
    title: 'Resultados | JMP, João Moisés Performance Physiology',
    desc: 'Resultados na Vela Olímpica (Paris 2024, Tóquio 2020, Rio 2016), no Surf e no Padel. Resultados dos atletas e das respetivas equipas.',
    h1: 'Resultados desportivos.',
    body: '<p>Três ciclos Olímpicos na Vela e um percurso de referência no Surf nacional e internacional e resultados no Padel.</p>',
  },
  {
    file: 'metodo.html', page: 'metodo', path: 'metodo.html',
    title: 'Método | JMP, João Moisés Performance Physiology',
    desc: 'O sistema de performance JMP: seis momentos, um processo contínuo. Dados objetivos para decidir melhor, com interpretação individual e ligação direta à prática.',
    h1: 'O sistema de performance.',
    body: '<ol><li>Compreender: a pessoa, a modalidade e o contexto do atleta.</li><li>Avaliar: apenas o que acrescenta informação relevante.</li><li>Interpretar: os resultados em conjunto com a realidade do atleta.</li><li>Orientar: a informação traduzida em estratégias de treino individualizadas e aplicáveis.</li><li>Acompanhar: a execução no terreno, com ajustes sempre que necessário.</li><li>Reavaliar: a resposta ao treino orienta as decisões seguintes.</li></ol>',
  },
  {
    file: 'sobre.html', page: 'sobre', path: 'sobre.html',
    title: 'Sobre | JMP, João Moisés Performance Physiology',
    desc: 'Perfil e formação de João Moisés, fisiologista do exercício e preparador físico com mais de 15 anos de experiência em alta competição.',
    h1: 'Da avaliação à prática.',
    body: '<p>João Moisés, fisiologista do exercício e preparador físico. Preparador Físico da Federação Portuguesa de Vela. Mestrado em Treino Desportivo (Alto Rendimento).</p>',
  },
  {
    file: 'contacto.html', page: 'contacto', path: 'contacto.html',
    title: 'Contacto | JMP, João Moisés Performance Physiology',
    desc: 'Contacta João Moisés para acompanhamento de atletas, federações e estruturas técnicas, em Portugal e internacionalmente.',
    h1: 'Contacto',
    body: '<p><a href="mailto:joaomoises13@gmail.com">joaomoises13@gmail.com</a> · +351 918 669 143</p>',
  },
  {
    file: 'privacidade.html', page: 'privacidade', path: 'privacidade.html',
    title: 'Política de privacidade | JMP, João Moisés Performance Physiology',
    desc: 'Como são tratados os dados pessoais de quem visita o site e contacta o João Moisés, em conformidade com o RGPD.',
    h1: 'Política de privacidade.',
    body: '<p>Informação sobre o tratamento de dados pessoais. Contacto: joaomoises13@gmail.com.</p>',
  },
  {
    file: 'termos.html', page: 'termos', path: 'termos.html',
    title: 'Termos e condições | JMP, João Moisés Performance Physiology',
    desc: 'Termos e condições de utilização do site JMP, João Moisés Performance Physiology.',
    h1: 'Termos e condições.',
    body: '<p>Condições de utilização do site e dos serviços. Contacto: joaomoises13@gmail.com.</p>',
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
        "image": "${site}images/og-image.jpg",
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
    <meta name="theme-color" content="#F6F4EF" />
    <meta name="robots" content="noindex" data-dev-only />
    <link rel="canonical" href="${site}${p.path}" />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg?v=2" />
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32.png?v=2" />
    <link rel="apple-touch-icon" href="./apple-touch-icon.png?v=2" />
    <link rel="preload" href="./fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossorigin />${p.preload ? '\n    <link rel="preload" as="image" href="./images/joao-hero.webp" type="image/webp" fetchpriority="high" />' : ''}
    <style>
      html{background:#F6F4EF}
      #curtain{position:fixed;inset:0;z-index:200;background:#0F1213;color:#F6F4EF;display:grid;place-items:center;animation:curtain-failsafe .01s 6s forwards}
      #curtain .curtain-mark{width:160px;height:auto}
      #curtain .curtain-count{position:absolute;left:24px;bottom:22px;font:600 11px/1 'Inter',system-ui,sans-serif;letter-spacing:.18em}
      #curtain .curtain-line{position:absolute;left:0;bottom:0;height:2px;width:100%;background:#14CFB1;transform:scaleX(0);transform-origin:left}
      @keyframes curtain-failsafe{to{opacity:0;visibility:hidden}}
    </style>
    <noscript><style>#curtain{display:none}</style></noscript>
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_PT" />
    <meta property="og:title" content="${p.title}" />
    <meta property="og:description" content="${p.desc}" />
    <meta property="og:url" content="${site}${p.path}" />
    <meta property="og:site_name" content="JMP, João Moisés Performance Physiology" />
    <meta property="og:image" content="${site}images/og-image.jpg" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="João Moisés, fisiologista do exercício, de braços cruzados. JMP, Fisiologia aplicada à performance." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${p.title}" />
    <meta name="twitter:description" content="${p.desc}" />
    <meta name="twitter:image" content="${site}images/og-image.jpg" />${p.jsonld ? jsonld : ''}
  </head>
  <body>
    <div id="curtain" aria-hidden="true"><img class="curtain-mark" src="./images/jmp-logo-light-v2.svg" alt="" width="83" height="29" /><span class="curtain-count">000</span><span class="curtain-line"></span></div>
    <div id="root" data-page="${p.page}">
      <main style="font-family:sans-serif;background:#F6F4EF;color:#0F1213;padding:48px;min-height:100vh">
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
