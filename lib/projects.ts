export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "SHOWS" | "EVENTOS" | "MARCAS" | "RETRATOS" | "CULTURA" | "COMERCIAL";
  city: string;
  year: number;
  description: string;
  image: string;
  fullDescription: string;
  credits?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "show-2024",
    title: "Show in Motion",
    category: "SHOWS",
    city: "São Paulo",
    year: 2024,
    description: "Cobertura cinematográfica de show ao vivo com direção visual completa",
    image: "/projects/show-2024.png",
    fullDescription: "Uma produção que captura a energia bruta de um show ao vivo, com direção de fotografia e movimento que acompanha cada beat, cada expressão, cada momento de conexão entre artista e público. Luz, movimento e emoção em quadros.",
    credits: "Fotografia e Direção Visual",
  },
  {
    id: "2",
    slug: "wedding-elegance",
    title: "Casamento Elegância",
    category: "EVENTOS",
    city: "Rio de Janeiro",
    year: 2024,
    description: "Narrativa visual de um casamento com abordagem cinematográfica",
    image: "/projects/wedding-elegance.png",
    fullDescription: "Um casamento não é apenas um evento. É um encontro de histórias, emoções que transcendem o momento. Nossa abordagem cinematográfica transforma o material em uma sequência de memórias que valem a pena reviver.",
    credits: "Fotografia + Vídeo",
  },
  {
    id: "3",
    slug: "brand-storytelling",
    title: "Brand Storytelling",
    category: "MARCAS",
    city: "São Paulo",
    year: 2024,
    description: "Conteúdo visual estratégico para marca premium de lifestyle",
    image: "/projects/brand-storytelling.png",
    fullDescription: "Criamos identidade visual para marcas que entendem que beleza é estratégia. Cada imagem é um capítulo na história da marca, construindo presença, valor e reconhecimento.",
    credits: "Direção Visual + Fotografia",
  },
  {
    id: "4",
    slug: "event-coverage",
    title: "Festival Audiovisual",
    category: "EVENTOS",
    city: "Salvador",
    year: 2023,
    description: "Cobertura completa de festival de música e arte",
    image: "/projects/event-coverage.png",
    fullDescription: "Documentar é registrar. Mas criar é contar histórias. Nossa cobertura de eventos vai além: captamos atmosfera, energia, conexões e transformamos tudo em narrativa visual que continua viva depois do último som.",
    credits: "Fotografia + Produção de Vídeo",
  },
  {
    id: "5",
    slug: "culture-project",
    title: "Expressão Cultural",
    category: "CULTURA",
    city: "Belo Horizonte",
    year: 2023,
    description: "Documentário visual de projeto cultural contemporâneo",
    image: "/projects/culture-project.png",
    fullDescription: "Culturas que valem a pena ser vistas. Projetos que transformam comunidades. Nossa lente é ativa: não apenas registra, mas amplifica, valoriza e dá presença cinematográfica ao que importa.",
    credits: "Direção Audiovisual",
  },
  {
    id: "6",
    slug: "portrait-series",
    title: "Série Retratos",
    category: "RETRATOS",
    city: "São Paulo",
    year: 2024,
    description: "Série editorial de retratos de artistas e personalidades",
    image: "/projects/portrait-series.png",
    fullDescription: "Um retrato bom é aquele que revela algo que a pessoa não sabe sobre si mesma. Nossa série captura essência: a força, a fragilidade, a verdade que existe no silêncio entre as palavras.",
    credits: "Fotografia de Retrato",
  },
];
