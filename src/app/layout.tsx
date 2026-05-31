import type { Metadata } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Veli Creations | Diseño Web Premium',
  description:
    'Creamos websites, identidades de marca y experiencias digitales que convierten visitantes en clientes fieles. Diseño premium para negocios con visión.',
  keywords:
    'diseño web, identidad de marca, fotografía comercial, social media, desarrollo web, SEO, OscarVelilla.com',
  openGraph: {
    title: 'Veli Creations | Diseño Web Premium',
    description: 'Presencia digital con estilo. Diseño a medida para negocios que quieren destacar.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
