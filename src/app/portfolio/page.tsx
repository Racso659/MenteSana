import type { Metadata } from 'next'
import PortfolioClient from '@/components/PortfolioClient'

export const metadata: Metadata = {
  title: 'Portfolio | Veli Creations',
  description:
    'Proyectos de diseño web, identidad de marca, e-commerce, fotografía, social media y SEO. Trabajo que habla por sí solo.',
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
