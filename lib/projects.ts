export interface Project {
  id: string;
  index: string;
  slug: string;
  title: string;
  category: string;
  city: string;
  year: number;
  media: string;
  mediaSlides: string[];
  description: string;
  fullDescription: string;
  credits?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    index: "01",
    slug: "show-in-motion",
    title: "Show in Motion",
    category: "MÚSICA · PERFORMANCE",
    city: "São Carlos — SP",
    year: 2026,
    media: "/portfolio/full/cobertura-eventos-rave/003-mg-3648.webp",
    mediaSlides: [
      "/portfolio/full/cobertura-eventos-rave/003-mg-3648.webp",
      "/portfolio/full/cobertura-eventos-rave/008-mg-9235.webp",
      "/portfolio/full/cobertura-eventos-rave/006-mg-9231-2.webp",
      "/portfolio/full/cobertura-eventos-rave/005-mg-3654.webp",
      "/portfolio/full/cobertura-eventos-rave/007-mg-9234.webp",
    ],
    description: "Cobertura cinematográfica de show ao vivo com direção visual completa.",
    fullDescription:
      "Uma produção que captura a energia bruta de um show ao vivo. Direção de fotografia e movimento que acompanha cada beat, cada expressão, cada momento de conexão entre artista e público. Luz, movimento e emoção transformados em quadros que continuam vivos depois do último acorde.",
    credits: "Direção Visual · Fotografia · Vídeo",
  },
  {
    id: "2",
    index: "02",
    slug: "presenca",
    title: "Presença",
    category: "RETRATOS · DIREÇÃO",
    city: "São Carlos — SP",
    year: 2026,
    media: "/portfolio/full/retratos-livia-lima-estacao/004-mg-8884.webp",
    mediaSlides: [
      "/portfolio/full/retratos-livia-lima-estacao/004-mg-8884.webp",
      "/portfolio/full/retratos-stephanie-lima-ufscar/025-img-8267.webp",
      "/portfolio/full/retratos-giovana-profit-ufscar-sul/001-mg-3063x.webp",
      "/portfolio/full/retratos-adriele-fernandes-estacao-rodoviaria/005-062.webp",
      "/portfolio/full/retratos-livia-lima-estacao/001-mg-8880.webp",
    ],
    description: "Série editorial de retratos de artistas e personalidades.",
    fullDescription:
      "Um retrato bom é aquele que revela algo que a pessoa não sabe sobre si mesma. Esta série captura essência: a força, a fragilidade, a verdade que existe no silêncio entre as palavras. Direção de luz e presença construídas quadro a quadro.",
    credits: "Direção · Fotografia de Retrato",
  },
  {
    id: "3",
    index: "03",
    slug: "movimento-coletivo",
    title: "Movimento Coletivo",
    category: "EVENTOS · CULTURA",
    city: "São Carlos — SP",
    year: 2026,
    media: "/portfolio/full/cobertura-eventos-workshop-joseph-pura-arte-tatto/008-mg-4920.webp",
    mediaSlides: [
      "/portfolio/full/cobertura-eventos-workshop-joseph-pura-arte-tatto/008-mg-4920.webp",
      "/portfolio/full/cobertura-eventos-workshop-joseph-pura-arte-tatto/035-mg-4998.webp",
      "/portfolio/full/cobertura-eventos-workshop-joseph-pura-arte-tatto/012-mg-4936.webp",
      "/portfolio/full/cobertura-eventos-rave/001-mg-3645.webp",
      "/portfolio/full/cobertura-eventos-workshop-joseph-pura-arte-tatto/050-mg-5044.webp",
    ],
    description: "Cobertura completa de evento cultural e coletivo.",
    fullDescription:
      "Documentar é registrar. Criar é contar histórias. Nossa cobertura vai além: captamos atmosfera, energia e conexões e transformamos tudo em narrativa visual. O coletivo em movimento, a cultura em cena, a memória construída em tempo real.",
    credits: "Fotografia · Produção de Vídeo",
  },
  {
    id: "4",
    index: "04",
    slug: "marca-em-cena",
    title: "Marca em Cena",
    category: "CONTEÚDO · EMPRESAS",
    city: "São Carlos — SP",
    year: 2026,
    media: "/portfolio/full/cobertura-eventos-automobilisticos-carros-exposicoes-expocar-expor-com-logo/010-mg-2067.webp",
    mediaSlides: [
      "/portfolio/full/cobertura-eventos-automobilisticos-carros-exposicoes-expocar-expor-com-logo/010-mg-2067.webp",
      "/portfolio/full/cobertura-eventos-automobilisticos-carros-exposicoes-expocar-expor-com-logo/055-mg-2168-aprimorado-nr.webp",
      "/portfolio/full/cobertura-eventos-automobilisticos-carros-exposicoes-expocar-expor-com-logo/001-mg-2042.webp",
      "/portfolio/full/cobertura-eventos-automobilisticos-carros-exposicoes-expocar-expor-com-logo/090-mg-2257.webp",
      "/portfolio/full/cidade-em-foco/007-eduardo-0334.webp",
    ],
    description: "Conteúdo visual estratégico para marca contemporânea.",
    fullDescription:
      "Criamos identidade visual para marcas que entendem que imagem é estratégia. Cada quadro é um capítulo na história da marca, construindo presença, valor e reconhecimento. Direção visual que transforma negócios em algo percebido.",
    credits: "Direção Visual · Conteúdo",
  },
];

export interface Service {
  id: string;
  title: string;
  description: string;
  media: string;
}

export const services: Service[] = [
  {
    id: "s1",
    title: "Fotografia",
    description: "Imagens autorais com direção de luz e presença.",
    media: "/portfolio/full/retratos-stephanie-lima-ufscar/010-img-8196.webp",
  },
  {
    id: "s2",
    title: "Filmes e Vídeos",
    description: "Narrativas em movimento com linguagem de cinema.",
    media: "/portfolio/full/cobertura-eventos-rave/008-mg-9235.webp",
  },
  {
    id: "s3",
    title: "Cobertura de Eventos",
    description: "Registro cinematográfico de acontecimentos.",
    media: "/portfolio/full/cobertura-eventos-workshop-joseph-pura-arte-tatto/012-mg-4936.webp",
  },
  {
    id: "s4",
    title: "Conteúdo para Marcas",
    description: "Material visual estratégico e consistente.",
    media: "/portfolio/full/cobertura-eventos-automobilisticos-carros-exposicoes-expocar-expor-com-logo/012-mg-2070.webp",
  },
  {
    id: "s5",
    title: "Retratos",
    description: "Essência e caráter capturados em quadro.",
    media: "/portfolio/full/retratos-giovana-profit-ufscar-sul/001-mg-3063x.webp",
  },
  {
    id: "s6",
    title: "Direção Visual",
    description: "Conceito, estética e narrativa do começo ao fim.",
    media: "/portfolio/full/cidade-em-foco/001-eduardo-06.webp",
  },
];
