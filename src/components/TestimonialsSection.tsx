'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    name: 'Miguel Reyes',
    role: 'Contratista independiente · Miami, FL',
    quote:
      'Antes tenía solo Instagram. Ahora tengo un sitio que mis clientes aman y me genera consultas todos los días. Veli Creations lo cambió todo para mi negocio de plomería.',
    rating: 5,
    initials: 'M',
    color: 'var(--color-primary)',
    featured: false,
  },
  {
    name: 'Juliana Morales',
    role: 'Fotógrafa de bodas · Orlando, FL',
    quote:
      'Mi portafolio de fotografía quedó exactamente como lo imaginaba. Los colores, el movimiento, todo. Mis clientes me dicen que el sitio refleja perfectamente mi estilo.',
    rating: 5,
    initials: 'J',
    color: 'var(--color-violet)',
    featured: true,
  },
  {
    name: 'Rosa Medina',
    role: 'Emprendedora · Houston, TX',
    quote:
      'Abrí mi tienda online en menos de una semana. El proceso fue claro, el diseño es hermoso y las ventas llegaron desde el primer mes. Muy recomendados.',
    rating: 5,
    initials: 'R',
    color: 'var(--color-coral)',
    featured: false,
  },
]

function TestimonialCard({
  t,
  index,
  isInView,
}: {
  t: (typeof testimonials)[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: t.featured ? 'rgba(25, 30, 58, 0.9)' : 'var(--color-surface)',
        border: t.featured
          ? '1px solid rgba(46, 242, 162, 0.2)'
          : '1px solid var(--color-border-soft)',
        borderRadius: '1.5rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        position: 'relative',
        ...(t.featured && {
          boxShadow: '0 0 40px rgba(46, 242, 162, 0.06)',
        }),
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: '3px' }}>
        {[...Array(t.rating)].map((_, i) => (
          <span key={i} style={{ color: '#FFC247', fontSize: '1rem' }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          lineHeight: 1.72,
          color: 'rgba(234, 242, 255, 0.75)',
          fontStyle: 'italic',
          flexGrow: 1,
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: t.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            fontWeight: 800,
            color: '#0A0F1E',
            fontFamily: 'var(--font-display)',
            flexShrink: 0,
          }}
        >
          {t.initials}
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
            }}
          >
            {t.name}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              color: 'rgba(234, 242, 255, 0.42)',
              marginTop: '1px',
            }}
          >
            {t.role}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="testimonios"
      style={{
        padding: '8rem 0',
        background: `
          radial-gradient(ellipse 70% 60% at 50% 100%, rgba(46, 242, 162, 0.04) 0%, transparent 70%),
          var(--color-bg)
        `,
      }}
    >
      <div ref={ref} style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(46, 242, 162, 0.1)',
              border: '1px solid rgba(46, 242, 162, 0.3)',
              borderRadius: '9999px',
              padding: '0.4rem 1rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-body)',
              marginBottom: '1.5rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Testimonios
          </span>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              color: 'var(--color-text)',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: '1.1rem',
            }}
          >
            Lo que dicen nuestros{' '}
            <span className="gradient-text">clientes</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'rgba(234, 242, 255, 0.45)',
              lineHeight: 1.7,
            }}
          >
            Resultados reales de negocios reales.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            alignItems: 'start',
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
