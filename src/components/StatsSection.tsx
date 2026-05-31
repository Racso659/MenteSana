'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 50, suffix: '+', label: 'Proyectos completados', color: 'var(--color-primary)' },
  { value: 98, suffix: '%', label: 'Clientes satisfechos', color: 'var(--color-secondary)' },
  { value: 5, suffix: '+', label: 'Años de experiencia', color: 'var(--color-violet)' },
  { value: 100, suffix: '%', label: 'Diseño a medida', color: 'var(--color-coral)' },
]

function CountUp({
  value,
  suffix,
  color,
  active,
}: {
  value: number
  suffix: string
  color: string
  active: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1600
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, value])

  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 800,
        color,
        lineHeight: 1,
        letterSpacing: '-0.04em',
      }}
    >
      {count}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      style={{
        padding: '5rem 0',
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-soft)',
        borderBottom: '1px solid var(--color-border-soft)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(46, 242, 162, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={ref}
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <CountUp value={stat.value} suffix={stat.suffix} color={stat.color} active={isInView} />
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'rgba(234, 242, 255, 0.45)',
                  marginTop: '0.5rem',
                  letterSpacing: '0.01em',
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
