'use client'

import { Globe, MessageCircle, Link2, Mail, Phone, MapPin } from 'lucide-react'

const serviceLinks = [
  'Diseño Web',
  'Identidad de Marca',
  'Tienda Online',
  'Fotografía Creativa',
  'Social Media',
  'SEO & Estrategia',
]

const companyLinks = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contacto', href: '#contacto' },
  { label: 'Privacidad', href: '#privacidad' },
]

const socialLinks = [
  { Icon: Globe, href: '#', label: 'Web' },
  { Icon: MessageCircle, href: '#', label: 'Social' },
  { Icon: Link2, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: '#070B17',
        borderTop: '1px solid var(--color-border-soft)',
        padding: '5rem 0 0',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '3rem',
            paddingBottom: '4rem',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <a
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                textDecoration: 'none',
                marginBottom: '1.25rem',
              }}
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
                    fontSize: '0.95rem',
                  }}
                >
                  VC
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--color-text)',
                  letterSpacing: '-0.02em',
                }}
              >
                Veli Creations
              </span>
            </a>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'rgba(234, 242, 255, 0.4)',
                lineHeight: 1.7,
                marginBottom: '1.75rem',
                maxWidth: '240px',
              }}
            >
              Creamos experiencias digitales que transforman negocios. Diseño
              premium para marcas con visión.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.625rem' }}>
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--color-border-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(234, 242, 255, 0.45)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.color = 'var(--color-primary)'
                    el.style.borderColor = 'rgba(46, 242, 162, 0.35)'
                    el.style.background = 'rgba(46, 242, 162, 0.07)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.color = 'rgba(234, 242, 255, 0.45)'
                    el.style.borderColor = 'var(--color-border-soft)'
                    el.style.background = 'rgba(255,255,255,0.04)'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: '1.25rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              Servicios
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {serviceLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#servicios"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'rgba(234, 242, 255, 0.45)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = 'var(--color-primary)')
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = 'rgba(234, 242, 255, 0.45)')
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: '1.25rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              Empresa
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'rgba(234, 242, 255, 0.45)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = 'var(--color-primary)')
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = 'rgba(234, 242, 255, 0.45)')
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-text)',
                marginBottom: '1.25rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              Contacto
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { Icon: Mail, text: 'hola@velicreations.com', href: 'mailto:hola@velicreations.com' },
                { Icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
                { Icon: MapPin, text: 'OscarVelilla.com', href: '#' },
              ].map(({ Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    color: 'rgba(234, 242, 255, 0.45)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-body)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-primary)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(234, 242, 255, 0.45)')
                  }
                >
                  <Icon size={15} style={{ flexShrink: 0 }} />
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-border-soft)',
            padding: '1.75rem 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'rgba(234, 242, 255, 0.25)',
            }}
          >
            © 2025 Veli Creations. Todos los derechos reservados.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'rgba(234, 242, 255, 0.25)',
            }}
          >
            Crafted with{' '}
            <span style={{ color: 'var(--color-coral)' }}>♥</span>
            {' '}by Veli Creations
          </p>
        </div>
      </div>
    </footer>
  )
}
