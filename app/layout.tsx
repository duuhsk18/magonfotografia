import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Space_Grotesk, Instrument_Serif } from 'next/font/google'
import './globals.css'

const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: '400',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'MAGON — Fotografia & Audiovisual',
  description:
    'Imagens para viver agora, lembrar depois. Produtora visual autoral de fotografia, filmes e direção visual. São Carlos — SP.',
  keywords:
    'fotografia, audiovisual, vídeo, produtora visual, cinema, direção visual, São Carlos, shows, eventos, retratos, marcas',
}

export const viewport: Viewport = {
  themeColor: '#0b0a09',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="bg-background antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
