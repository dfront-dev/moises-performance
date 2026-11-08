export const intro =
  'Consultoria de fisiologia aplicada à performance, com intervenção em diferentes momentos e níveis de profundidade no processo de treino.'

export const services = [
  {
    id: 'consultoria',
    short: 'Consultoria',
    full: 'Consultoria estratégica de otimização do treino',
    verb: 'Compreender e orientar',
    desc: 'Identificar obstáculos e definir estratégias para otimizar o processo de treino.',
    tags: ['Intervenção estratégica', 'Online', 'Pontual ou periódica'],
    role: 'Analisa e orienta',
    relation: 'Intervenção estratégica pontual ou periódica',
    format: 'Online',
    visual: 'analysis',
    subject: 'Serviço: Consultoria',
  },
  {
    id: 'avaliacao',
    short: 'Avaliação',
    full: 'Avaliação física e fisiológica presencial',
    verb: 'Avaliar e aprofundar',
    desc: 'Conhecer o atleta em profundidade, através de avaliação objetiva e interpretação especializada.',
    tags: ['Intervenção técnica', 'Presencial', 'Avaliação ou reavaliação'],
    role: 'Mede, avalia e interpreta',
    relation: 'Intervenção técnica presencial',
    format: 'Presencial',
    image: 'recovery',
    pos: '42% 50%',
    alt: 'Treinador a orientar um atleta num exercício de mobilidade com banda elástica',
    subject: 'Serviço: Avaliação',
  },
  {
    id: 'acompanhamento',
    short: 'Acompanhamento',
    full: 'Acompanhamento Integrado de Performance',
    verb: 'Acompanhar e otimizar',
    desc: 'Integrar o processo de preparação, acompanhando, intervindo e adaptando continuamente.',
    tags: ['Intervenção continuada', 'Personalizada', 'Premium'],
    role: 'Integra, intervém, monitoriza e adapta',
    relation: 'Relação continuada, próxima e individualizada',
    format: 'Continuado, personalizado e premium',
    image: 'elite',
    pos: '62% 50%',
    alt: 'Treinador a acompanhar um atleta num exercício de estabilidade e controlo',
    subject: 'Serviço: Acompanhamento Integrado',
  },
]

export const serviceRows = [
  ['Descrição', 'desc'],
  ['Papel do João Moisés', 'role'],
  ['Tipo de relação', 'relation'],
  ['Formato', 'format'],
]

export const tableNote =
  'A diferença entre os serviços é o tipo e a profundidade da intervenção, não o estatuto ou o nível do atleta.'

export const partnerNote =
  'O João não pretende substituir o treinador. Funciona como parceiro especializado, acrescentando conhecimento fisiológico, análise e acompanhamento ao processo de treino.'

export const details = {
  consultoria: {
    intro:
      'Clareza sobre o que pode estar a limitar a evolução do atleta e orientação especializada sobre como melhorar o seu processo de treino. Ajuda atletas e treinadores sem avaliações presenciais e sem assumir o planeamento dos treinos.',
    blocks: [
      {
        label: 'Quatro momentos',
        title: 'Como decorre',
        kind: 'steps',
        items: [
          { title: 'Recolha e análise de informação', text: 'Questionário de anamnese com histórico desportivo, hábitos, sono, alimentação, recuperação, treino e análises clínicas recentes, quando disponíveis.' },
          { title: 'Consulta inicial de 30 minutos (online)', text: 'Exploração do contexto do atleta, objetivos, dificuldades e desafios identificados.' },
          { title: 'Análise estratégica', text: 'Interpretação do perfil do atleta com base na anamnese, na conversa, em possíveis análises e no contexto de treino: intensidade, volume, distribuição de cargas, recuperação e adequação aos objetivos.' },
          { title: 'Consulta de outputs de 30 minutos (online)', text: 'Apresentação das principais conclusões, prioridades e estratégias de otimização, com entrega de um documento com as prioridades e recomendações.' },
        ],
      },
      {
        label: 'Dois formatos',
        title: 'Pontual ou periódica',
        kind: 'cards',
        items: [
          { title: 'Consultoria pontual (one shot)', text: 'Um diagnóstico estratégico completo, para aquele momento.' },
          { title: 'Consultoria periódica', text: 'Um conjunto de momentos de análise e revisão ao longo da época, com periodicidade definida.' },
        ],
      },
    ],
  },
  avaliacao: {
    intro:
      'Acrescenta uma camada de informação objetiva que não é possível obter numa consultoria exclusivamente online. O objetivo é compreender como o atleta responde física e fisiologicamente, para identificar capacidades, limitações e referências relevantes para o treino.',
    blocks: [
      {
        label: 'Duas componentes',
        title: 'O que inclui',
        kind: 'cards',
        items: [
          { title: 'Avaliação de base', text: 'Caracterização do atleta e do contexto de treino, indicadores do perfil físico, mobilidade, força e controlo do movimento.' },
          { title: 'Avaliação específica da modalidade', text: 'Apenas quando existe uma necessidade concreta que a justifique, por exemplo um protocolo específico para ciclismo, corrida ou natação.' },
        ],
      },
      {
        label: 'Filosofia',
        title: 'Sem testes por fazer',
        kind: 'note',
        text: 'Cada avaliação existe para responder a uma necessidade concreta do atleta, nunca para acumular dados.',
      },
    ],
  },
  acompanhamento: {
    intro:
      'O serviço mais completo e exclusivo, para atletas que procuram acompanhamento especializado, próximo e continuado ao longo da preparação e do desenvolvimento desportivo. É uma intervenção ativa e de longo prazo: o João observa o atleta no terreno, interpreta a sua resposta e participa nas decisões e nos ajustes necessários à sua evolução.',
    blocks: [
      {
        label: 'O que permite',
        title: 'Uma intervenção global',
        kind: 'list',
        items: [
          { title: 'Avaliar e conhecer o atleta em profundidade', text: 'Identificando capacidades, limitações e necessidades específicas.' },
          { title: 'Definir e implementar estratégias de preparação física e fisiológica', text: 'Ajustadas aos objetivos e às exigências da modalidade.' },
          { title: 'Monitorizar continuamente a resposta ao treino', text: 'Analisando carga, adaptação, recuperação e evolução da performance.' },
          { title: 'Ajustar a intervenção ao longo da época', text: 'De acordo com a resposta do atleta, os diferentes momentos da preparação e as exigências competitivas.' },
          { title: 'Integrar o trabalho com treinadores e outros profissionais', text: 'Assegurando uma abordagem multidisciplinar e coerente.' },
        ],
      },
      {
        label: 'Dois modelos de intervenção',
        title: 'O acompanhamento é o mesmo, a responsabilidade pode mudar',
        kind: 'cards',
        footnote:
          'Em ambos, o João acompanha o atleta ao longo do tempo. A diferença está no nível de responsabilidade que assume na preparação e nas decisões de treino.',
        items: [
          {
            title: 'O João assume a preparação física do atleta',
            example: 'Exemplo: um atleta de Vela Olímpica que trabalha diretamente com o João durante toda a época.',
            list: [
              'Avaliação física e fisiológica inicial',
              'Planeamento e implementação da preparação física, nomeadamente força, mobilidade e outras capacidades relevantes',
              'Acompanhamento presencial em alguns treinos, ginásio ou estágios',
              'Monitorização da carga, fadiga, recuperação e evolução',
              'Adaptação do trabalho aos diferentes momentos da época e às competições',
              'Articulação com o treinador da modalidade e outros profissionais',
            ],
            closing: 'O João é responsável por planear, executar e ajustar a preparação física.',
          },
          {
            title: 'O João integra a equipa técnica como especialista em fisiologia',
            example: 'Exemplo: uma triatleta que já tem uma treinadora responsável por todo o planeamento de natação, ciclismo e corrida, e quer compreender melhor a sua evolução.',
            list: [
              'Avaliações fisiológicas em momentos estratégicos da época',
              'Análise de dados de treino e respostas fisiológicas',
              'Identificação de possíveis limitadores da performance',
              'Acompanhamento de indicadores de carga, fadiga e recuperação',
              'Participação em reuniões periódicas com a treinadora',
              'Recomendação de estratégias e ajustes, que a treinadora decide como integrar no planeamento',
            ],
            closing: 'O João é um especialista integrado no processo de treino, não o treinador ou preparador físico principal.',
          },
        ],
      },
      {
        label: 'Premium',
        title: 'Capacidade limitada',
        kind: 'note',
        text: 'Pela profundidade do trabalho, pela disponibilidade e pelo envolvimento que exige, é um serviço premium, com capacidade limitada e uma proposta construída à medida de cada atleta.',
      },
    ],
  },
}

export const statement = 'Ciência, interpretação e experiência aplicadas às decisões de performance.'

export const otherAreas = {
  id: 'outras-modalidades',
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
}
