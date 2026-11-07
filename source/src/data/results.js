export const results = [
  {
    id: 'vela',
    index: '01 / Vela Olímpica',
    lines: ['Vela', 'Olímpica.'],
    bullets: [
      'Avaliação, planeamento, implementação e controlo do treino físico de atletas de alto rendimento',
      'Em articulação com treinadores, fisioterapeutas e restantes elementos da equipa multidisciplinar',
      'Ao longo de três ciclos olímpicos consecutivos',
    ],
    image: 'vela-bandeira',
    alt: 'João Moisés com atletas da Vela Olímpica Portuguesa',
    blocks: [
      {
        label: 'Paris 2024',
        title: 'Quatro embarcações, um resultado coletivo de destaque',
        rows: [
          ['Diogo Costa & Carolina João', '5.º lugar, 470 Mixed'],
          ['Eduardo Marques', '11.º lugar, ILCA 7'],
          ['Mafalda Pires de Lima', '14.º lugar, Formula Kite'],
          ['Hernán Umpierre & Fernando Diz (URU)', '10.º lugar, 49er'],
        ],
      },
      {
        label: 'Tóquio 2020 e Rio 2016',
        title: 'Acompanhamento presencial em contexto pandémico e dois ciclos anteriores',
        rows: [
          ['Jorge Lima & José Costa', '7.º lugar, 49er, Tóquio 2020'],
          ['Diogo Costa & Pedro Costa', '15.º lugar, 470 Masculino, Tóquio 2020'],
          ['Diogo Costa & Pedro Costa', 'Vice-campeões do mundo, 470 Masculino, 2021'],
          ['Carolina João', '34.º lugar, Laser Radial, Tóquio 2020'],
          ['Gustavo Lima & Jorge Lima', 'Preparação Olímpica, Rio 2016'],
          ['Umpierre & Diz', 'Medalha de prata, Jogos Pan-Americanos, Santiago 2023'],
        ],
      },
    ],
  },
  {
    id: 'surf',
    index: '02 / Surf',
    lines: ['Surf.'],
    intro:
      'Percurso de referência no Surf nacional e internacional, com campeões nacionais, europeus e mundiais de júnior.',
    image: 'trofeu',
    alt: 'João Moisés com um atleta e troféu de Surf',
    blocks: [
      {
        label: 'Surf',
        title: 'Referências nacionais',
        rows: [
          ['Teresa Bonvalot', 'Bicampeã europeia júnior 2016 e 2017, campeã nacional (2015 a 2020)'],
          ['Vasco Ribeiro', 'Campeão mundial e europeu júnior, e nacional, em 2014'],
          ['Pedro Henrique', 'Campeão europeu 2015, vice-campeão mundial nos ISA Games'],
          ['Nicolau von Rupp', 'Vice-campeão mundial, ISA World Surfing Games 2015'],
          ['José Ferreira', 'Campeão nacional Pro Júnior 2012 (2010 a 2017)'],
          ['Tomás Fernandes', '3.º no Mundial de Juniores de Surf, 2014'],
          ['Carol Henrique', 'Campeã nacional de Surf, 2016'],
          ['Maria Abecassis', 'Bicampeã nacional de Surf, 2011 e 2012'],
        ],
      },
    ],
  },
  {
    id: 'padel',
    index: '03 / Padel',
    lines: ['Padel.'],
    intro: 'Preparação física de atletas de Padel.',
    blocks: [
      {
        label: 'Padel',
        title: 'Do pódio nacional ao mundial',
        rows: [['Sebastião Mendonça', '5.º no Mundial de Seleções de Padel, 2018']],
      },
    ],
  },
  {
    id: 'outras',
    index: '04 / Outras modalidades',
    lines: ['Outras', 'modalidades.'],
    intro: 'Trabalho noutras modalidades, além da Vela, do Surf e do Padel.',
    blocks: [
      {
        label: 'Atividade',
        title: 'Freediving e Ténis',
        trophy: false,
        rows: [
          ['Instrutor de Freediving', 'Desde 2020'],
          ['Preparação física de Ténis', 'Desde 2021'],
        ],
      },
    ],
    highlight: {
      label: 'Em foco',
      text: 'Desportos de endurance, com foco em triatlo, em articulação com equipas e treinadores.',
    },
  },
]

export const resultsFootnote =
  'Resultados dos atletas e das respetivas equipas. O papel do João integra a preparação física e fisiológica dentro de processos multidisciplinares de alto rendimento.'
