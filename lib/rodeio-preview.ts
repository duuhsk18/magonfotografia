/**
 * RODEIO FEST 2026 — dados da cobertura (07.08 / noite de abertura).
 *
 * Fotos REAIS de Eduardo Magon na noite de 07/08 (Matheus & Kauan + Ícaro e Gilmar),
 * com marca d'água Magon. Blocos: show/palco, montaria/arena e público.
 * Ainda em processamento: VÍDEO da noite e a GALERIA COMPLETA em alta.
 *
 * Para adicionar mais fotos: solte os .webp em /public/images/rodeio/ e inclua na
 * lista correspondente abaixo. Nenhuma mudança de layout é necessária.
 */

export const rodeioEvent = {
  name: 'São Carlos Rodeio Fest 2026',
  nightLabel: 'Night 01 · Abertura',
  dateLabel: '07 de agosto de 2026',
  dateShort: '07.08',
  location: 'São Carlos — SP',
  festivalRange: '07 a 15 de agosto de 2026',
  acts: ['Matheus & Kauan', 'Ícaro e Gilmar'],
  credit: 'Cobertura fotográfica e audiovisual por Eduardo Magon',
}

export interface RodeioImage {
  src: string
  alt: string
}

export const rodeioHero: RodeioImage = {
  src: '/images/rodeio/rodeio-hero.webp',
  alt: 'Palco principal do São Carlos Rodeio Fest 2026 na noite de 07 de agosto',
}

/** Palco, artistas e show — noite de 07.08. */
export const rodeioShowImages: RodeioImage[] = [
  { src: '/images/rodeio/rodeio-palco-01.webp', alt: 'Palco principal iluminado — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-show-01.webp', alt: 'Show no palco — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-show-02.webp', alt: 'Cantor no palco — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-show-03.webp', alt: 'Apresentação no palco — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-show-04.webp', alt: 'Cantor durante o show — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-show-05.webp', alt: 'Músico no palco — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-show-06.webp', alt: 'Banda no palco — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-show-07.webp', alt: 'Show no palco — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-show-08.webp', alt: 'Cantor no palco — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-show-09.webp', alt: 'Sanfoneiro no palco — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-show-10.webp', alt: 'Cantor durante o show — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-show-11.webp', alt: 'Performance de palco — Rodeio Fest 2026, 07.08' },
]

/** Montaria, cerimônia e arena — noite de 07.08. */
export const rodeioMontariaImages: RodeioImage[] = [
  { src: '/images/rodeio/rodeio-montaria-01.webp', alt: 'Montaria na arena — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-montaria-02.webp', alt: 'Cerimônia na arena — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-montaria-03.webp', alt: 'Competidores na arena — Rodeio Fest 2026, 07.08' },
]

/** Público e plateia — noite de 07.08. */
export const rodeioPublicoImages: RodeioImage[] = [
  { src: '/images/rodeio/rodeio-publico-01.webp', alt: 'Público no Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-publico-02.webp', alt: 'Público no Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-publico-03.webp', alt: 'Plateia no Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-publico-04.webp', alt: 'Público no Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-publico-05.webp', alt: 'Plateia no Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-publico-06.webp', alt: 'Público no Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-publico-07.webp', alt: 'Casal na plateia — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-publico-08.webp', alt: 'Público no Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-publico-09.webp', alt: 'Público no Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-publico-10.webp', alt: 'Plateia acompanhando o show — Rodeio Fest 2026, 07.08' },
  { src: '/images/rodeio/rodeio-publico-11.webp', alt: 'Público no Rodeio Fest 2026, 07.08' },
]

/** Ainda em processamento — entra aqui em breve. */
export const rodeioComingSoon = [
  { key: 'video', label: 'Vídeo da noite', note: 'O corte da cobertura — em produção' },
  { key: 'galeria', label: 'Galeria completa', note: 'Seleção final em alta — em breve' },
]

export const WHATSAPP_PARTICIPANTE =
  'https://wa.me/5516999942889?text=Ol%C3%A1!%20Quero%20saber%20sobre%20as%20fotos%20do%20Rodeio%20Fest%20S%C3%A3o%20Carlos%202026%20(07.08)'
export const WHATSAPP_IMPRENSA =
  'https://wa.me/5516999942889?text=Ol%C3%A1!%20Sou%20da%20imprensa%20e%20quero%20falar%20sobre%20a%20cobertura%20do%20Rodeio%20Fest%20(07.08)'
