'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Carmen Rodríguez',
    role: 'Propietaria · Restaurante La Mesa',
    quote:
      'Veli Creations transformó nuestra presencia online por completo. En el primer mes después del lanzamiento, las reservas aumentaron un 40%. El diseño es exactamente lo que necesitábamos: elegante, moderno y que vende.',
    rating: 5,
    initials: 'CR',
    color: 'var(--color-coral)',
  },
  {
    name: 'Marcos Jiménez',
    role: 'Contractor · MJ Construction LLC',
    quote:
      'Por fin tengo una web profesional que refleja la calidad real de mi trabajo. Mis clientes ya no dudan en contactarme. El equipo fue increíblemente detallista y entendió mi visión desde la primera llamada.',
    rating: 5,
    initials: 'MJ',
    color: 'var(--color-secondary)',
  },
  {
    name: 'Sara Medina',
    role: 'Fotógrafa Profesional · Studio SM',
    quote:
      'El portfolio que crearon para mí es exactamente lo que soñaba: elegante, rápido y completamente funcional. Mis consultas de nuevos clientes se triplicaron en los primeros dos meses. Totalmente recomendado.',
    rating: 5,
    initials: 'SM',
    color: 'var(--color-violet)',
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((a) => (a + 1) % testimonials.length)

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
      <div
        ref={ref}
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}
      >
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
            }}
          >
            Esto dicen nuestros{' '}
            <span className="gradient-text">clientes</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: '820px', margin: '0 auto' }}
        >
          {/* Card */}
          <div
            style={{
              position: 'relative',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border-soft)',
              borderRadius: '2rem',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              overflow: 'hidden',
            }}
          >
            {/* Decorative quote icon */}
            <div
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '2rem',
                color: 'var(--color-primary)',
                opacity: 0.08,
                pointerEvents: 'none',
              }}
            >
              <Quote size={90} />
            </div>

            {/* Active color accent top border */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '2rem',
                right: '2rem',
                height: '2px',
                background: 'var(--gradient-cta)',
                borderRadius: '0 0 2px 2px',
                opacity: 0.7,
              }}
            />

            {/* Stars */}
            <div style={{ display: 'flex', gap: '3px', marginBottom: '1.75rem' }}>
              {[...Array(testimonials[active].rating)].map((_, i) => (
                <span key={i} style={{ color: '#FFC247', fontSize: '1.05rem' }}>
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={`quote-${active}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 2.2vw, 1.175rem)',
                  lineHeight: 1.75,
                  color: 'rgba(234, 242, 255, 0.82)',
                  fontStyle: 'italic',
                  marginBottom: '2.25rem',
                }}
              >
                &ldquo;{testimonials[active].quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>

            {/* Author */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${active}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: testimonials[active].color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: '#0A0F1E',
                    fontFamily: 'var(--font-display)',
                    flexShrink: 0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {testimonials[active].initials}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: 'var(--color-text)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {testimonials[active].name}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.82rem',
                      color: 'rgba(234, 242, 255, 0.45)',
                    }}
                  >
                    {testimonials[active].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '2rem',
            }}
          >
            <button
              onClick={prev}
              aria-label="Anterior"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border-soft)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border-soft)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)'
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  style={{
                    width: i === active ? '28px' : '8px',
                    height: '8px',
                    borderRadius: '9999px',
                    background: i === active ? 'var(--color-primary)' : 'rgba(234, 242, 255, 0.18)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Siguiente"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border-soft)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border-soft)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)'
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
