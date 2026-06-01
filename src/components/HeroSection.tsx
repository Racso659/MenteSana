'use client'

import { motion, type Variants } from 'framer-motion'
import dynamic from 'next/dynamic'
import { ArrowRight, Sparkles } from 'lucide-react'

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
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
        justifyContent: 'center',
        background: 'var(--color-bg)',
      }}
    >
      {/* ── Full-screen 3D scene ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        <Scene3D />
      </motion.div>

      {/* ── Vignette: darkens edges so text reads cleanly ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 70% 65% at 50% 50%, transparent 10%, rgba(10,15,30,0.45) 55%, rgba(10,15,30,0.92) 100%)
        `,
      }} />

      {/* ── Top navbar fade ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '140px',
        background: 'linear-gradient(to bottom, rgba(10,15,30,0.7), transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* ── Color glows behind content ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 55% 45% at 50% 50%, rgba(46,242,162,0.05) 0%, transparent 65%),
          radial-gradient(ellipse 35% 30% at 75% 25%, rgba(122,92,255,0.06) 0%, transparent 55%),
          radial-gradient(ellipse 35% 30% at 25% 75%, rgba(25,198,255,0.04) 0%, transparent 55%)
        `,
      }} />

      {/* ── Grid pattern ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(234,242,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(234,242,255,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, black 10%, transparent 80%)',
      }} />

      {/* ── Centered text content ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '1280px',
        padding: '8rem 1.5rem 6rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{ textAlign: 'center', maxWidth: '880px', width: '100%' }}
        >
          {/* Tag */}
          <motion.div variants={fadeUp} style={{ marginBottom: '1.75rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(46,242,162,0.12)', border: '1px solid rgba(46,242,162,0.35)',
              borderRadius: '9999px', padding: '0.4rem 1.1rem',
              fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-primary)',
              fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              <Sparkles size={13} />
              Diseño Digital Premium · Veli Creations
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: 'clamp(2.8rem, 7.5vw, 6rem)',
              fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em',
              marginBottom: '1.5rem', color: 'var(--color-text)',
              textShadow: '0 4px 40px rgba(0,0,0,0.4)',
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
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              lineHeight: 1.75, color: 'rgba(234,242,255,0.6)',
              maxWidth: '560px', margin: '0 auto 2.75rem',
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
            style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.75rem' }}
          >
            <a href="#servicios" className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
              Ver nuestros servicios
              <ArrowRight size={17} />
            </a>
            <a href="#contacto" className="btn-ghost" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
              Hablemos
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}
          >
            <div style={{ display: 'flex' }}>
              {['#2EF2A2', '#19C6FF', '#7A5CFF', '#FF5C8A'].map((color, i) => (
                <div key={i} style={{
                  width: 34, height: 34, borderRadius: '50%', background: color,
                  border: '2.5px solid rgba(10,15,30,0.8)',
                  marginLeft: i > 0 ? -10 : 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.68rem', fontWeight: 800, color: '#0A0F1E',
                  fontFamily: 'var(--font-display)', flexShrink: 0,
                }}>
                  {['C', 'M', 'S', 'R'][i]}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', gap: '2px', marginBottom: 3 }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#FFC247', fontSize: '0.85rem' }}>★</span>)}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(234,242,255,0.42)', fontFamily: 'var(--font-body)' }}>
                50+ clientes satisfechos
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Floating card: Proyectos (top-right) ── */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.3, duration: 0.7, ease: 'easeOut' }}
        className="glass hidden md:flex"
        style={{
          position: 'absolute', top: '22%', right: '6%', zIndex: 10,
          borderRadius: '1.125rem', padding: '1rem 1.375rem',
          minWidth: 148, flexDirection: 'column',
          animation: 'float-y 5s ease-in-out infinite',
        }}
      >
        <p style={{ fontSize: '0.65rem', color: 'rgba(234,242,255,0.38)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Proyectos
        </p>
        <p className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em' }}>
          50+
        </p>
      </motion.div>

      {/* ── Floating card: Satisfacción (bottom-left) ── */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.55, duration: 0.7, ease: 'easeOut' }}
        className="glass hidden md:flex"
        style={{
          position: 'absolute', bottom: '24%', left: '6%', zIndex: 10,
          borderRadius: '1.125rem', padding: '1rem 1.375rem',
          minWidth: 158, flexDirection: 'column',
          animation: 'float-y 6s ease-in-out infinite',
          animationDelay: '1.2s',
        }}
      >
        <p style={{ fontSize: '0.65rem', color: 'rgba(234,242,255,0.38)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Satisfacción
        </p>
        <p style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--color-secondary)', fontFamily: 'var(--font-display)' }}>
          98%
        </p>
      </motion.div>

      {/* ── Disponible ahora (bottom-right) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.5, type: 'spring', stiffness: 220, damping: 18 }}
        className="glass hidden md:flex"
        style={{
          position: 'absolute', bottom: '26%', right: '7%', zIndex: 10,
          borderRadius: '9999px', padding: '0.55rem 1.1rem',
          alignItems: 'center', gap: '0.45rem',
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', animation: 'pulse-glow 2s ease-in-out infinite' }} />
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
          Disponible ahora
        </span>
      </motion.div>

      {/* ── Extra floating accent: Años (top-left, smaller) ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.7, duration: 0.6, ease: 'easeOut' }}
        className="glass hidden md:flex"
        style={{
          position: 'absolute', top: '30%', left: '6%', zIndex: 10,
          borderRadius: '1rem', padding: '0.875rem 1.25rem',
          flexDirection: 'column', minWidth: 130,
          animation: 'float-y 7s ease-in-out infinite',
          animationDelay: '0.5s',
        }}
      >
        <p style={{ fontSize: '0.65rem', color: 'rgba(234,242,255,0.38)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
          Experiencia
        </p>
        <p style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--color-violet)', fontFamily: 'var(--font-display)' }}>
          5 años
        </p>
      </motion.div>

      {/* ── Bottom fade into next section ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '220px',
        background: 'linear-gradient(to bottom, transparent, var(--color-bg))',
        pointerEvents: 'none', zIndex: 5,
      }} />
    </section>
  )
}
