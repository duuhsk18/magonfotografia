export interface Project {
  id: string;
  index: string;
  slug: string;
  title: string;
  category: string;
  city: string;
  year: number;
  media: string;
  /** Marks whether the intended primary media is a video that still needs to be supplied. */
  videoPlaceholder?: boolean;
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
    media: "/projects/show-2024.png",
    videoPlaceholder: true,
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
    media: "/projects/portrait-series.png",
    videoPlaceholder: false,
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
    media: "/projects/event-coverage.png",
    videoPlaceholder: true,
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
    media: "/projects/brand-storytelling.png",
    videoPlaceholder: false,
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
    media: "/projects/portrait-series.png",
  },
  {
    id: "s2",
    title: "Filmes e Vídeos",
    description: "Narrativas em movimento com linguagem de cinema.",
    media: "/projects/show-2024.png",
  },
  {
    id: "s3",
    title: "Cobertura de Eventos",
    description: "Registro cinematográfico de acontecimentos.",
    media: "/projects/event-coverage.png",
  },
  {
    id: "s4",
    title: "Conteúdo para Marcas",
    description: "Material visual estratégico e consistente.",
    media: "/projects/brand-storytelling.png",
  },
  {
    id: "s5",
    title: "Retratos",
    description: "Essência e caráter capturados em quadro.",
    media: "/projects/culture-project.png",
  },
  {
    id: "s6",
    title: "Direção Visual",
    description: "Conceito, estética e narrativa do começo ao fim.",
    media: "/media/behind-04.png",
  },
];
