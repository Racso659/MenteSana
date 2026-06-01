'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, TrendingUp } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectCategory = 'web' | 'brand' | 'ecommerce' | 'photo' | 'social' | 'seo'
type MockupType = 'browser' | 'brand' | 'ecommerce' | 'photo' | 'social' | 'analytics'
type FilterId = 'all' | ProjectCategory

interface Project {
  id: string
  title: string
  subtitle: string
  category: ProjectCategory
  year: string
  palette: [string, string, string, string]
  result: string
  description: string
  services: string[]
  mockupType: MockupType
  accent: string
  featured?: boolean
}

// ─── Category Meta ────────────────────────────────────────────────────────────

const CAT: Record<FilterId, { label: string; accent: string }> = {
  all:       { label: 'Todos',               accent: 'var(--color-primary)'   },
  web:       { label: 'Diseño Web',           accent: 'var(--color-violet)'   },
  brand:     { label: 'Identidad de Marca',   accent: 'var(--color-coral)'    },
  ecommerce: { label: 'Tienda Online',        accent: 'var(--color-yellow)'   },
  photo:     { label: 'Fotografía',           accent: 'var(--color-primary)'  },
  social:    { label: 'Social Media',         accent: 'var(--color-secondary)'},
  seo:       { label: 'SEO & Estrategia',     accent: 'var(--color-violet)'   },
}
const FILTER_ORDER: FilterId[] = ['all', 'web', 'brand', 'ecommerce', 'photo', 'social', 'seo']

// ─── Project Data ─────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  // ── Web Design ──
  {
    id: 'la-mesa', title: 'La Mesa', subtitle: 'Restaurante Mediterráneo',
    category: 'web', year: '2024',
    palette: ['#1E0800', '#E84A0C', '#FFC247', '#FFF8F5'],
    result: '+40% reservas online',
    description: 'Rediseño completo con sistema de reservas integrado, menú interactivo, galería de platos y mapa de ubicación. El cliente vio resultados en la primera semana de lanzamiento.',
    services: ['Diseño Web', 'SEO', 'Fotografía'],
    mockupType: 'browser', accent: '#E84A0C', featured: true,
  },
  {
    id: 'mj-construction', title: 'MJ Construction', subtitle: 'Contratista General',
    category: 'web', year: '2024',
    palette: ['#0D1117', '#F4A627', '#FF6B2B', '#FFFFFF'],
    result: '+65% contactos nuevos',
    description: 'Sitio corporativo de alto impacto que refleja la solidez y profesionalismo de la empresa. Galería de proyectos, sistema de presupuestos y sección de testimonios integrados.',
    services: ['Diseño Web', 'Identidad de Marca'],
    mockupType: 'browser', accent: '#F4A627',
  },
  {
    id: 'studio-sm', title: 'Studio SM', subtitle: 'Fotografía Profesional',
    category: 'web', year: '2023',
    palette: ['#080808', '#C8A96E', '#E8E0D0', '#FFFFFF'],
    result: '+3× consultas nuevas',
    description: 'Portfolio minimalista y elegante para fotógrafa profesional. Galerías dinámicas por categoría, sistema de booking online y blog integrado con SEO.',
    services: ['Diseño Web', 'Fotografía', 'SEO'],
    mockupType: 'browser', accent: '#C8A96E',
  },
  {
    id: 'flowfit', title: 'FlowFit', subtitle: 'Centro de Fitness',
    category: 'web', year: '2024',
    palette: ['#030D18', '#00F5A0', '#00D9F5', '#FFFFFF'],
    result: '+85 nuevos socios',
    description: 'Sitio energético con clases online, planes de membresía personalizados, booking de clases en tiempo real y seguimiento de progreso integrado.',
    services: ['Diseño Web', 'Social Media', 'SEO'],
    mockupType: 'browser', accent: '#00F5A0', featured: true,
  },
  // ── Brand Identity ──
  {
    id: 'vela-cafe', title: 'Vela Café', subtitle: 'Identidad de Marca Completa',
    category: 'brand', year: '2024',
    palette: ['#1E0E05', '#D4845A', '#F2C882', '#FFF5E6'],
    result: 'Reconocimiento local #1',
    description: 'Sistema de identidad completo: logo primario y variantes, paleta cromática, tipografía, packaging de vasos y bolsas, papelería y brand guidelines de 30 páginas.',
    services: ['Identidad de Marca', 'Packaging', 'Fotografía'],
    mockupType: 'brand', accent: '#D4845A', featured: true,
  },
  {
    id: 'techforge', title: 'TechForge Labs', subtitle: 'Startup Tecnológica',
    category: 'brand', year: '2024',
    palette: ['#080F20', '#7A5CFF', '#19C6FF', '#FFFFFF'],
    result: 'Inversión Serie A asegurada',
    description: 'Identidad para startup tech de alto crecimiento: logo moderno, brand guidelines completo, sistema de diseño digital escalable y deck de presentación a inversores.',
    services: ['Identidad de Marca', 'Diseño Web', 'Social Media'],
    mockupType: 'brand', accent: '#7A5CFF',
  },
  {
    id: 'luna-boutique', title: 'Luna Boutique', subtitle: 'Moda & Accesorios',
    category: 'brand', year: '2023',
    palette: ['#120818', '#B07AFF', '#E8D5FF', '#FFF0FA'],
    result: 'Posicionamiento premium',
    description: 'Branding de lujo para boutique de moda femenina. Elegante, sofisticada y completamente memorable. Incluye packaging premium, etiquetas y experiencia de unboxing.',
    services: ['Identidad de Marca', 'Tienda Online', 'Fotografía'],
    mockupType: 'brand', accent: '#B07AFF',
  },
  // ── E-commerce ──
  {
    id: 'artisan-goods', title: 'Artisan Goods', subtitle: 'Productos Artesanales',
    category: 'ecommerce', year: '2024',
    palette: ['#140B02', '#8B6914', '#D4A843', '#FFF9F0'],
    result: '$50K+ ventas en mes 1',
    description: 'Tienda online completa con gestión de inventario inteligente, múltiples métodos de pago, cálculo de envíos automático, programa de fidelidad y panel de análisis.',
    services: ['Tienda Online', 'Fotografía', 'SEO'],
    mockupType: 'ecommerce', accent: '#D4A843', featured: true,
  },
  {
    id: 'sportzone', title: 'SportZone', subtitle: 'Equipamiento Deportivo',
    category: 'ecommerce', year: '2023',
    palette: ['#030810', '#FF3D5C', '#FF8C00', '#FFFFFF'],
    result: '2,000+ pedidos en mes 1',
    description: 'E-commerce de alto rendimiento para equipamiento deportivo. Filtros avanzados multicriteria, comparativa de productos lado a lado y sistema de reseñas verificadas.',
    services: ['Tienda Online', 'Diseño Web', 'SEO'],
    mockupType: 'ecommerce', accent: '#FF3D5C',
  },
  // ── Photography ──
  {
    id: 'carmen-events', title: 'Carmen Events', subtitle: 'Fotografía de Bodas',
    category: 'photo', year: '2024',
    palette: ['#080305', '#FF5C8A', '#FFC2D4', '#FFF5F8'],
    result: '+120% nuevas consultas',
    description: 'Dirección fotográfica completa, edición y retoque artístico, organización de galería digital y sistema de entrega privada de fotos a clientes por álbumes.',
    services: ['Fotografía', 'Diseño Web', 'Social Media'],
    mockupType: 'photo', accent: '#FF5C8A',
  },
  {
    id: 'golden-hour', title: 'Golden Hour', subtitle: 'Fotografía Comercial',
    category: 'photo', year: '2024',
    palette: ['#100500', '#FF9A3C', '#FFD166', '#FFFAF0'],
    result: 'Portfolio de 200+ imágenes',
    description: 'Brand y portfolio visual para fotógrafo comercial especializado en producto y gastronomía. Edición de 200+ imágenes con tono cromático de marca consistente.',
    services: ['Fotografía', 'Identidad de Marca', 'Diseño Web'],
    mockupType: 'photo', accent: '#FF9A3C',
  },
  // ── Social Media ──
  {
    id: 'nightowl-bar', title: 'NightOwl Bar', subtitle: 'Bar & Lounge',
    category: 'social', year: '2024',
    palette: ['#040010', '#A855F7', '#EC4899', '#FFFFFF'],
    result: '50K seguidores orgánicos',
    description: 'Estrategia de contenidos mensual, diseño de posts y stories, calendario editorial y gestión de comunidad. Consistencia de marca en Instagram, TikTok y Facebook.',
    services: ['Social Media', 'Fotografía', 'Identidad de Marca'],
    mockupType: 'social', accent: '#A855F7', featured: true,
  },
  {
    id: 'eventco', title: 'EventCo Agency', subtitle: 'Agencia de Eventos',
    category: 'social', year: '2023',
    palette: ['#080814', '#19C6FF', '#2EF2A2', '#FFFFFF'],
    result: '+200% engagement rate',
    description: 'Sistema de plantillas reutilizables, calendario editorial anual y estrategia de contenidos B2B para agencia de eventos corporativos. Resultados en los primeros 30 días.',
    services: ['Social Media', 'Diseño Web', 'SEO'],
    mockupType: 'social', accent: '#19C6FF',
  },
  // ── SEO ──
  {
    id: 'dental-sonrisa', title: 'Dental Sonrisa', subtitle: 'Clínica Dental',
    category: 'seo', year: '2024',
    palette: ['#001520', '#00A8E8', '#00D4FF', '#F0FAFF'],
    result: '#1 en Google local',
    description: 'Estrategia SEO local completa: de página 5 a posición #1 para 3 ciudades en 4 meses. Optimización técnica, contenido, link-building y +180% tráfico orgánico.',
    services: ['SEO', 'Diseño Web', 'Social Media'],
    mockupType: 'analytics', accent: '#00A8E8', featured: true,
  },
]

// ─── CSS Mockup Components ────────────────────────────────────────────────────

function BrowserMockup({ palette }: { palette: string[] }) {
  const [bg, accent, light] = palette
  return (
    <div style={{ background: bg, borderRadius: 10, overflow: 'hidden', width: '100%' }}>
      {/* Chrome bar */}
      <div style={{ background: 'rgba(0,0,0,0.55)', padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
          <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
        ))}
        <div style={{ flex: 1, marginLeft: 8, height: 12, borderRadius: 3, background: 'rgba(255,255,255,0.1)' }} />
      </div>
      {/* Hero gradient section */}
      <div style={{ background: `linear-gradient(135deg, ${accent}, ${light})`, padding: '14px 12px 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ width: 28, height: 7, borderRadius: 2, background: 'rgba(255,255,255,0.9)' }} />
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ width: 18, height: 5, borderRadius: 2, background: 'rgba(255,255,255,0.45)' }} />
            ))}
          </div>
        </div>
        <div style={{ width: '65%', height: 10, borderRadius: 3, background: 'rgba(255,255,255,0.92)', marginBottom: 5 }} />
        <div style={{ width: '45%', height: 6, borderRadius: 2, background: 'rgba(255,255,255,0.55)', marginBottom: 9 }} />
        <div style={{ width: 52, height: 16, borderRadius: 9999, background: 'rgba(0,0,0,0.22)' }} />
      </div>
      {/* Card strip */}
      <div style={{ padding: '8px 10px', display: 'flex', gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            flex: 1, padding: '7px 6px',
            background: `${accent}14`, borderRadius: 6,
            border: `1px solid ${accent}22`,
          }}>
            <div style={{ width: '100%', height: 22, borderRadius: 4, background: `${accent}28`, marginBottom: 5 }} />
            <div style={{ width: '70%', height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.45)', marginBottom: 3 }} />
            <div style={{ width: '50%', height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.22)' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function BrandMockup({ palette, title }: { palette: string[]; title: string }) {
  const [bg, accent, light] = palette
  const initial = title.charAt(0).toUpperCase()
  return (
    <div style={{ background: bg, borderRadius: 10, overflow: 'hidden', padding: '20px 18px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Logo circle */}
      <div style={{
        width: 68, height: 68, borderRadius: '50%',
        background: `linear-gradient(135deg, ${accent}, ${light})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 10, boxShadow: `0 8px 28px ${accent}55`,
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: bg, letterSpacing: '-0.04em' }}>
          {initial}
        </span>
      </div>
      {/* Brand name bars */}
      <div style={{ width: '55%', height: 7, borderRadius: 3, background: `${accent}90`, marginBottom: 4 }} />
      <div style={{ width: '35%', height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)', marginBottom: 14 }} />
      {/* Divider */}
      <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 10 }} />
      {/* Color swatches */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
        {palette.map((color, i) => (
          <div key={i} style={{ width: i === 0 ? 18 : 13, height: i === 0 ? 18 : 13, borderRadius: '50%', background: color, border: '2px solid rgba(255,255,255,0.12)' }} />
        ))}
        <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.08)', margin: '0 2px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ width: 28, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.3)' }} />
          <div style={{ width: 20, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.18)' }} />
        </div>
      </div>
      {/* Typography sample */}
      <div style={{ width: '100%', background: `${accent}10`, borderRadius: 6, padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 5 }}>
        {[20, 14, 10].map((size, i) => (
          <div key={i} style={{ width: size, height: Math.round(size * 0.5), borderRadius: 2, background: `${accent}${50 - i * 14}` }} />
        ))}
      </div>
    </div>
  )
}

function EcommerceMockup({ palette }: { palette: string[] }) {
  const [bg, accent, light] = palette
  return (
    <div style={{ background: bg, borderRadius: 10, overflow: 'hidden', padding: 10, width: '100%' }}>
      {/* Top nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: '0 2px' }}>
        <div style={{ width: 30, height: 6, borderRadius: 2, background: `${accent}85` }} />
        <div style={{ display: 'flex', gap: 5 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: 2, background: 'rgba(255,255,255,0.2)' }} />)}
        </div>
        <div style={{ width: 20, height: 14, borderRadius: 4, background: `${accent}50`, border: `1.5px solid ${accent}80` }} />
      </div>
      {/* 2×2 product grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
        {[{ label: '$89' }, { label: '$149' }, { label: '$59' }, { label: '$299' }].map(({ label }, i) => (
          <div key={i} style={{ background: `${accent}10`, borderRadius: 7, padding: '6px 6px 5px', border: `1px solid ${accent}1C` }}>
            <div style={{ width: '100%', height: 38, borderRadius: 5, background: `linear-gradient(135deg, ${accent}28, ${light}20)`, marginBottom: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 16, height: 16, borderRadius: 3, background: `${accent}55` }} />
            </div>
            <div style={{ width: '80%', height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.38)', marginBottom: 3 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 8, color: accent, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{label}</span>
              <div style={{ width: 16, height: 10, borderRadius: 3, background: `${accent}65` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PhotoMockup({ palette }: { palette: string[] }) {
  const [bg, accent, light] = palette
  return (
    <div style={{ background: bg, borderRadius: 10, overflow: 'hidden', padding: 8, width: '100%' }}>
      {/* Photo grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '65px 48px', gap: 4 }}>
        <div style={{ gridColumn: '1', gridRow: '1 / 3', borderRadius: 7, background: `linear-gradient(160deg, ${accent}60, ${bg})`, display: 'flex', alignItems: 'flex-end', padding: 6 }}>
          <div style={{ width: '60%', height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.55)' }} />
        </div>
        <div style={{ borderRadius: 7, background: `linear-gradient(160deg, ${light}50, ${accent}28)` }} />
        <div style={{ borderRadius: 7, background: `linear-gradient(160deg, ${accent}28, ${light}55)` }} />
        <div style={{ borderRadius: 7, background: `linear-gradient(160deg, ${accent}45, ${bg})` }} />
        <div style={{ borderRadius: 7, background: `linear-gradient(160deg, ${light}38, ${accent}48)` }} />
      </div>
      {/* Caption bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 2px 0' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {[32, 22, 16].map((w, i) => <div key={i} style={{ width: w, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.22)' }} />)}
        </div>
        <div style={{ width: 13, height: 13, borderRadius: '50%', background: `${accent}65` }} />
      </div>
    </div>
  )
}

function SocialMockup({ palette }: { palette: string[] }) {
  const [bg, accent, light] = palette
  return (
    <div style={{ background: bg, borderRadius: 10, overflow: 'hidden', padding: 8, width: '100%' }}>
      {/* Stories */}
      <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
        {[accent, light, `${accent}80`, `${light}65`].map((c, i) => (
          <div key={i} style={{ width: 26, height: 26, borderRadius: '50%', background: c, border: `2px solid ${accent}45`, flexShrink: 0 }} />
        ))}
      </div>
      {/* Post 1 */}
      <div style={{ background: `${accent}12`, borderRadius: 8, padding: 7, marginBottom: 5, border: `1px solid ${accent}1C` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: `${accent}80` }} />
          <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.45)' }} />
        </div>
        <div style={{ width: '100%', height: 52, borderRadius: 5, background: `linear-gradient(135deg, ${accent}38, ${light}28)`, marginBottom: 5 }} />
        <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
          {['❤️', '💬', '↗️'].map((e, i) => <span key={i} style={{ fontSize: 9 }}>{e}</span>)}
        </div>
        <div style={{ width: '80%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.25)' }} />
      </div>
      {/* Post 2 (truncated) */}
      <div style={{ background: `${accent}08`, borderRadius: 8, padding: '6px 7px 5px', border: `1px solid ${accent}12` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: `${light}65` }} />
          <div style={{ width: 32, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.28)' }} />
        </div>
        <div style={{ width: '100%', height: 24, borderRadius: 5, background: `${light}18` }} />
      </div>
    </div>
  )
}

function AnalyticsMockup({ palette }: { palette: string[] }) {
  const [bg, accent] = palette
  const bars = [60, 38, 75, 50, 92, 35, 80]
  return (
    <div style={{ background: bg, borderRadius: 10, overflow: 'hidden', padding: '10px 10px 8px', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ width: 50, height: 5, borderRadius: 2, background: 'rgba(255,255,255,0.45)' }} />
        <div style={{ padding: '2px 7px', borderRadius: 9999, background: `${accent}22`, border: `1px solid ${accent}50` }}>
          <span style={{ fontSize: 7, color: accent, fontWeight: 700 }}>+124%</span>
        </div>
      </div>
      {/* Bar chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48, marginBottom: 8 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ width: '100%', height: `${h * 0.52}px`, borderRadius: '3px 3px 0 0', background: i === 4 ? accent : `linear-gradient(to top, ${accent}80, ${accent}28)` }} />
          </div>
        ))}
      </div>
      {/* Keyword rankings */}
      {[['#1', 100], ['#3', 68], ['#5', 42]].map(([rank, w], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: i < 2 ? 4 : 0 }}>
          <span style={{ fontSize: 7, fontWeight: 800, fontFamily: 'var(--font-display)', color: i === 0 ? accent : 'rgba(255,255,255,0.35)', width: 16 }}>{rank}</span>
          <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.08)' }}>
            <div style={{ width: `${w}%`, height: '100%', borderRadius: 2, background: `${accent}${[80, 50, 30][i]}` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function ProjectMockup({ project }: { project: Project }) {
  switch (project.mockupType) {
    case 'browser':   return <BrowserMockup palette={project.palette} />
    case 'brand':     return <BrandMockup palette={project.palette} title={project.title} />
    case 'ecommerce': return <EcommerceMockup palette={project.palette} />
    case 'photo':     return <PhotoMockup palette={project.palette} />
    case 'social':    return <SocialMockup palette={project.palette} />
    case 'analytics': return <AnalyticsMockup palette={project.palette} />
  }
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────

function FilterBar({ active, onChange }: { active: FilterId; onChange: (id: FilterId) => void }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: 6, scrollbarWidth: 'none' }}>
      {FILTER_ORDER.map(id => {
        const { label, accent } = CAT[id]
        const isActive = active === id
        return (
          <motion.button
            key={id}
            onClick={() => onChange(id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '0.5rem 1.125rem',
              borderRadius: 9999,
              border: isActive ? `1.5px solid ${accent}` : '1.5px solid var(--color-border-soft)',
              background: isActive ? `${accent}18` : 'transparent',
              color: isActive ? accent : 'rgba(234,242,255,0.45)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
            }}
          >
            {label}
          </motion.button>
        )
      })}
    </div>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const catAccent = CAT[project.category].accent
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.38 }}
      whileHover={{ y: -7 }}
      onClick={onClick}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-soft)',
        borderRadius: '1.375rem',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${project.accent}55`
        e.currentTarget.style.boxShadow = `0 10px 48px ${project.accent}18`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-soft)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Mockup area */}
      <div style={{ padding: '14px 14px 0' }}>
        <ProjectMockup project={project} />
      </div>

      {/* Info */}
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 2, letterSpacing: '-0.02em' }}>
              {project.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(234,242,255,0.4)' }}>
              {project.subtitle}
            </p>
          </div>
          <span style={{
            padding: '3px 8px', borderRadius: 9999,
            background: `${catAccent}15`, border: `1px solid ${catAccent}28`,
            fontSize: '0.68rem', fontWeight: 600,
            color: catAccent, fontFamily: 'var(--font-body)',
            whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 8,
          }}>
            {CAT[project.category].label}
          </span>
        </div>

        {/* Result pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 7, background: `${project.accent}12`, marginTop: 2 }}>
          <TrendingUp size={10} color={project.accent} />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: project.accent, fontFamily: 'var(--font-body)' }}>
            {project.result}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Project Modal ────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const catAccent = CAT[project.category].accent

  // Close on Escape + lock scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(6, 10, 22, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-surface)',
          border: `1px solid ${project.accent}35`,
          borderRadius: '1.75rem',
          width: '100%', maxWidth: 720,
          maxHeight: '90vh', overflow: 'auto',
          boxShadow: `0 40px 120px ${project.accent}22, 0 0 0 1px ${project.accent}12`,
        }}
      >
        {/* Mockup hero */}
        <div style={{
          padding: '1.5rem 1.5rem 0',
          background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${project.accent}0E, transparent)`,
        }}>
          <div style={{ maxWidth: 460, margin: '0 auto' }}>
            <ProjectMockup project={project} />
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.75rem 2rem 2.25rem' }}>
          {/* Close + title row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: catAccent, fontFamily: 'var(--font-body)', display: 'block', marginBottom: 4 }}>
                {CAT[project.category].label}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--color-text)', letterSpacing: '-0.035em' }}>
                {project.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(234,242,255,0.45)', marginTop: 2 }}>
                {project.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border-soft)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(234,242,255,0.55)', flexShrink: 0, marginLeft: 12 }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Result */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, background: `${project.accent}14`, border: `1px solid ${project.accent}30`, marginBottom: '1.25rem' }}>
            <TrendingUp size={14} color={project.accent} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: project.accent, fontSize: '0.95rem' }}>
              {project.result}
            </span>
          </div>

          {/* Description */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.78, color: 'rgba(234,242,255,0.68)', marginBottom: '1.5rem' }}>
            {project.description}
          </p>

          {/* Meta */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-soft)', marginBottom: '1.5rem' }}>
            <div>
              <p style={{ fontSize: '0.68rem', color: 'rgba(234,242,255,0.3)', fontFamily: 'var(--font-body)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Año</p>
              <p style={{ fontSize: '0.9rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text)' }}>{project.year}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.68rem', color: 'rgba(234,242,255,0.3)', fontFamily: 'var(--font-body)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Servicios utilizados</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {project.services.map(s => (
                  <span key={s} style={{ padding: '3px 8px', borderRadius: 9999, background: `${project.accent}14`, border: `1px solid ${project.accent}28`, fontSize: '0.75rem', fontWeight: 600, color: project.accent, fontFamily: 'var(--font-body)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <a href="/#contacto" onClick={onClose} className="btn-primary" style={{ display: 'inline-flex', fontSize: '0.9rem' }}>
            ¿Quieres algo así? Hablemos →
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = activeFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter)

  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{
        paddingTop: '8rem', paddingBottom: '4rem', position: 'relative', overflow: 'hidden',
        background: `
          radial-gradient(ellipse 80% 60% at 50% -5%, rgba(122, 92, 255, 0.1) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 85% 60%, rgba(46, 242, 162, 0.05) 0%, transparent 50%),
          var(--color-bg)
        `,
      }}>
        {/* Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(var(--color-border-soft) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-soft) 1px, transparent 1px)`, backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black, transparent)', pointerEvents: 'none' }} />

        <div ref={heroRef} style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, ease: 'easeOut' }}>
            <span style={{ display: 'inline-block', background: 'rgba(122, 92, 255, 0.1)', border: '1px solid rgba(122, 92, 255, 0.35)', borderRadius: 9999, padding: '0.4rem 1rem', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-violet)', fontFamily: 'var(--font-body)', marginBottom: '1.5rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Portfolio
            </span>
            <h1 style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.06, marginBottom: '1.25rem', color: 'var(--color-text)' }}>
              Trabajo que{' '}
              <span className="gradient-text">habla por sí solo</span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(234,242,255,0.52)', lineHeight: 1.75, maxWidth: 540, margin: '0 auto' }}>
              Cada proyecto es una historia de transformación. Descubre cómo ayudamos a marcas reales a construir presencias digitales que enamoran.
            </p>
          </motion.div>

          {/* Mini stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }} style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            {[{ value: '50+', label: 'Proyectos', color: 'var(--color-primary)' }, { value: '6', label: 'Categorías', color: 'var(--color-violet)' }, { value: '98%', label: 'Clientes felices', color: 'var(--color-secondary)' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, color: s.color, letterSpacing: '-0.045em', lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(234,242,255,0.38)', marginTop: 3 }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filter + Grid ── */}
      <section style={{ padding: '3rem 0 8rem', background: 'var(--color-bg)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }} style={{ marginBottom: '2rem' }}>
            <FilterBar active={activeFilter} onChange={setActiveFilter} />
          </motion.div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(234,242,255,0.28)', marginBottom: '1.25rem' }}>
            {filtered.length} proyecto{filtered.length !== 1 ? 's' : ''}
          </p>

          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.25rem' }}>
            <AnimatePresence mode="popLayout">
              {filtered.map(project => (
                <ProjectCard key={project.id} project={project} onClick={() => setSelected(project)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section style={{ padding: '5.5rem 0', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border-soft)', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.035em', marginBottom: '1rem', color: 'var(--color-text)' }}>
            ¿Tu proyecto podría ser{' '}
            <span className="gradient-text">el próximo?</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(234,242,255,0.52)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Empieza hoy. En 24 horas tienes tu propuesta personalizada.
          </p>
          <a href="/#contacto" className="btn-primary" style={{ fontSize: '1rem' }}>
            Empezar mi proyecto →
          </a>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
