'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contacto"
      style={{
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse 100% 80% at 50% 50%, rgba(46, 242, 162, 0.06) 0%, rgba(122, 92, 255, 0.05) 45%, transparent 75%),
          var(--color-surface)
        `,
        borderTop: '1px solid var(--color-border-soft)',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--color-border-soft) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border-soft) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />

      {/* Glow orbs */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46, 242, 162, 0.08) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={ref}
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: '0 1.5rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 240, damping: 18 }}
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '22px',
            background: 'var(--gradient-cta)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2.25rem',
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}
        >
          <Zap size={32} color="#0A0F1E" fill="#0A0F1E" strokeWidth={0} />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.035em',
            marginBottom: '1.5rem',
            color: 'var(--color-text)',
          }}
        >
          ¿Listo para el{' '}
          <span className="gradient-text">siguiente nivel?</span>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'rgba(234, 242, 255, 0.58)',
            lineHeight: 1.75,
            marginBottom: '2.75rem',
            maxWidth: '520px',
            margin: '0 auto 2.75rem',
          }}
        >
          Cuéntanos tu proyecto. En menos de 24 horas te respondemos
          con una propuesta personalizada y sin compromisos.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.a
            href="mailto:hola@velicreations.com"
            className="btn-primary"
            style={{ fontSize: '1.05rem', padding: '1rem 2.25rem' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Empezar ahora
            <ArrowRight size={19} />
          </motion.a>
          <motion.a
            href="https://wa.me/15551234567"
            className="btn-ghost"
            style={{ fontSize: '1.05rem', padding: '1rem 2.25rem' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            💬 WhatsApp
          </motion.a>
        </motion.div>

        {/* Small trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            marginTop: '2rem',
            fontSize: '0.8rem',
            color: 'rgba(234, 242, 255, 0.3)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Sin contratos largos · Sin costos ocultos · 100% satisfacción garantizada
        </motion.p>
      </div>
    </section>
  )
}
