'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Monitor, Palette, ShoppingBag, Camera, Share2, TrendingUp } from 'lucide-react'

const services = [
  {
    Icon: Monitor,
    title: 'Diseño Web',
    description:
      'Websites personalizados que capturan la esencia de tu marca y convierten visitantes en clientes reales.',
    accent: '#7A5CFF',
    bgAlpha: 'rgba(122, 92, 255, 0.07)',
    borderActive: 'rgba(122, 92, 255, 0.4)',
  },
  {
    Icon: Palette,
    title: 'Identidad de Marca',
    description:
      'Logos, paletas de color y sistemas tipográficos que hacen que tu negocio sea completamente inolvidable.',
    accent: '#FF5C8A',
    bgAlpha: 'rgba(255, 92, 138, 0.07)',
    borderActive: 'rgba(255, 92, 138, 0.4)',
  },
  {
    Icon: ShoppingBag,
    title: 'Tienda Online',
    description:
      'Soluciones e-commerce que venden mientras tú duermes. Integración con los mejores procesadores de pago.',
    accent: '#FFC247',
    bgAlpha: 'rgba(255, 194, 71, 0.07)',
    borderActive: 'rgba(255, 194, 71, 0.4)',
  },
  {
    Icon: Camera,
    title: 'Fotografía Creativa',
    description:
      'Dirección de arte y edición fotográfica para que tu marca hable por sí sola, sin necesidad de palabras.',
    accent: '#2EF2A2',
    bgAlpha: 'rgba(46, 242, 162, 0.07)',
    borderActive: 'rgba(46, 242, 162, 0.4)',
  },
  {
    Icon: Share2,
    title: 'Social Media Design',
    description:
      'Contenido visual estratégico para redes sociales que detiene el scroll y construye comunidad real.',
    accent: '#19C6FF',
    bgAlpha: 'rgba(25, 198, 255, 0.07)',
    borderActive: 'rgba(25, 198, 255, 0.4)',
  },
  {
    Icon: TrendingUp,
    title: 'SEO & Estrategia',
    description:
      'Aparecer en Google no es suerte. Es estrategia y ejecución. Te posicionamos donde están tus clientes.',
    accent: '#7A5CFF',
    bgAlpha: 'rgba(122, 92, 255, 0.07)',
    borderActive: 'rgba(122, 92, 255, 0.4)',
  },
]

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0]
  index: number
}) {
  const { Icon, title, description, accent, bgAlpha, borderActive } = service
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-soft)',
        borderRadius: '1.5rem',
        padding: '2rem',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = borderActive
        el.style.boxShadow = `0 0 30px ${bgAlpha.replace('0.07', '0.2')}`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'var(--color-border-soft)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Background glow on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${bgAlpha}, transparent)`,
          opacity: 0.7,
          pointerEvents: 'none',
          borderRadius: '1.5rem',
        }}
      />

      {/* Icon box */}
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          background: bgAlpha,
          border: `1px solid ${borderActive}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.375rem',
          position: 'relative',
        }}
      >
        <Icon size={22} color={accent} strokeWidth={1.75} />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: '0.75rem',
          letterSpacing: '-0.02em',
          position: 'relative',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          lineHeight: 1.65,
          color: 'rgba(234, 242, 255, 0.55)',
          position: 'relative',
        }}
      >
        {description}
      </p>

      {/* Learn more */}
      <div
        style={{
          marginTop: '1.5rem',
          color: accent,
          fontSize: '0.82rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.01em',
          position: 'relative',
        }}
      >
        Saber más →
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="servicios"
      style={{
        padding: '8rem 0',
        background: `
          radial-gradient(ellipse 70% 50% at 50% 50%, rgba(122, 92, 255, 0.04) 0%, transparent 65%),
          var(--color-bg)
        `,
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '4.5rem' }}
        >
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(122, 92, 255, 0.1)',
              border: '1px solid rgba(122, 92, 255, 0.35)',
              borderRadius: '9999px',
              padding: '0.4rem 1rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--color-violet)',
              fontFamily: 'var(--font-body)',
              marginBottom: '1.5rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Nuestros Servicios
          </span>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              color: 'var(--color-text)',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
            }}
          >
            Todo lo que necesitas para{' '}
            <span className="gradient-text">destacar online</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'rgba(234, 242, 255, 0.55)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Desde el primer pixel hasta la estrategia de crecimiento. Te acompañamos
            en cada paso de tu presencia digital.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
