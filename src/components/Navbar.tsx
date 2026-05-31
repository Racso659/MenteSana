'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        ...(scrolled && {
          background: 'rgba(10, 15, 30, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(234, 242, 255, 0.08)',
          boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
        }),
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                color: '#0A0F1E',
                fontSize: '1rem',
                letterSpacing: '-0.03em',
              }}
            >
              VC
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.05rem',
              color: 'var(--color-text)',
              letterSpacing: '-0.02em',
            }}
          >
            Veli Creations
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'rgba(234, 242, 255, 0.65)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--color-primary)')}
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'rgba(234, 242, 255, 0.65)')
              }
            >
              {link.label}
            </a>
          ))}
          <a href="#contacto" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.625rem 1.375rem' }}>
            Empezar proyecto →
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border-soft)',
            borderRadius: '10px',
            padding: '0.5rem',
            color: 'var(--color-text)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            style={{
              margin: '0.75rem 1.5rem 0',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              background: 'rgba(18, 26, 51, 0.95)',
              backdropFilter: 'blur(24px)',
              border: '1px solid var(--color-border-soft)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'rgba(234, 242, 255, 0.8)',
                  textDecoration: 'none',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--color-border-soft)',
                }}
              >
                {link.label}
              </a>
            ))}
            <a href="#contacto" className="btn-primary" style={{ textAlign: 'center', marginTop: '0.25rem' }}>
              Empezar proyecto →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
