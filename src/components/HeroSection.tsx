'use client'

import { motion, type Variants } from 'framer-motion'
import dynamic from 'next/dynamic'
import { ArrowRight, Sparkles } from 'lucide-react'

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

export default function HeroSection() {
  return (
    <section
      id="inicio"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '5rem',
        background: 'var(--color-bg)',
      }}
    >
      {/* Background radial glows */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(46, 242, 162, 0.09) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 60%, rgba(122, 92, 255, 0.07) 0%, transparent 55%),
            radial-gradient(ellipse 40% 35% at 15% 70%, rgba(25, 198, 255, 0.05) 0%, transparent 55%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--color-border-soft) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border-soft) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 40%, black, transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Spinning conic gradient blob */}
      <div
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          top: '50%',
          left: '50%',
          background:
            'conic-gradient(from 0deg, rgba(46,242,162,0.04), rgba(25,198,255,0.04), rgba(122,92,255,0.04), rgba(255,92,138,0.03), rgba(46,242,162,0.04))',
          filter: 'blur(80px)',
          borderRadius: '50%',
          animation: 'spin-slow 12s linear infinite',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '5rem 1.5rem',
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* ── Left: Text ── */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            {/* Tag */}
            <motion.div variants={fadeUp} style={{ marginBottom: '1.75rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(46, 242, 162, 0.1)',
                  border: '1px solid rgba(46, 242, 162, 0.3)',
                  borderRadius: '9999px',
                  padding: '0.4rem 1rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                <Sparkles size={13} />
                Diseño Digital Premium · Veli Creations
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4.75rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '1.5rem',
                color: 'var(--color-text)',
              }}
            >
              Tu negocio merece una{' '}
              <span className="gradient-text">presencia digital</span>{' '}
              que inspire.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.75,
                color: 'rgba(234, 242, 255, 0.6)',
                marginBottom: '2.5rem',
                maxWidth: '500px',
                fontFamily: 'var(--font-body)',
              }}
            >
              Creamos websites, identidades y experiencias digitales que convierten
              visitantes en clientes fieles. Diseño a medida para negocios que
              quieren destacar.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}
            >
              <a href="#servicios" className="btn-primary" style={{ fontSize: '1rem' }}>
                Ver nuestros servicios
                <ArrowRight size={17} />
              </a>
              <a href="#contacto" className="btn-ghost" style={{ fontSize: '1rem' }}>
                Hablemos
              </a>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              variants={fadeUp}
              style={{
                marginTop: '3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
              }}
            >
              {/* Avatar stack */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {['#2EF2A2', '#19C6FF', '#7A5CFF', '#FF5C8A'].map((color, i) => (
                  <div
                    key={i}
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: color,
                      border: '2.5px solid var(--color-bg)',
                      marginLeft: i > 0 ? '-10px' : '0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: '#0A0F1E',
                      fontFamily: 'var(--font-display)',
                      flexShrink: 0,
                    }}
                  >
                    {['C', 'M', 'S', 'R'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '3px' }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: '#FFC247', fontSize: '0.85rem' }}>★</span>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(234, 242, 255, 0.45)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  50+ clientes satisfechos
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: 3D Scene ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ position: 'relative', height: '580px' }}
            className="hidden md:block"
          >
            <Scene3D />

            {/* Floating stat card — top right */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="glass"
              style={{
                position: 'absolute',
                top: '12%',
                right: '-2%',
                zIndex: 20,
                borderRadius: '1rem',
                padding: '0.875rem 1.25rem',
                minWidth: '140px',
                animation: 'float-y 5s ease-in-out infinite',
              }}
            >
              <p
                style={{
                  fontSize: '0.7rem',
                  color: 'rgba(234,242,255,0.45)',
                  fontFamily: 'var(--font-body)',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Proyectos
              </p>
              <p
                className="gradient-text"
                style={{
                  fontSize: '1.9rem',
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                50+
              </p>
            </motion.div>

            {/* Floating stat card — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="glass"
              style={{
                position: 'absolute',
                bottom: '18%',
                left: '3%',
                zIndex: 20,
                borderRadius: '1rem',
                padding: '0.875rem 1.25rem',
                minWidth: '150px',
                animation: 'float-y 6s ease-in-out infinite',
                animationDelay: '1s',
              }}
            >
              <p
                style={{
                  fontSize: '0.7rem',
                  color: 'rgba(234,242,255,0.45)',
                  fontFamily: 'var(--font-body)',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Satisfacción
              </p>
              <p
                style={{
                  fontSize: '1.9rem',
                  fontWeight: 800,
                  lineHeight: 1,
                  color: 'var(--color-secondary)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                98%
              </p>
            </motion.div>

            {/* Floating badge — bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5, type: 'spring', stiffness: 200 }}
              className="glass"
              style={{
                position: 'absolute',
                bottom: '30%',
                right: '4%',
                zIndex: 20,
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }}
              />
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  fontFamily: 'var(--font-body)',
                  whiteSpace: 'nowrap',
                }}
              >
                Disponible ahora
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade-out */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'linear-gradient(to bottom, transparent, var(--color-bg))',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
    </section>
  )
}
