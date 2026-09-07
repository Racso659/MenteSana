'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Radio, Smartphone } from 'lucide-react'
import HostPanel from './HostPanel'
import ViewerPanel from './ViewerPanel'
import { normalizeCode } from './constants'

type Mode = 'select' | 'host' | 'view'

function SelectScreen({ onSelect }: { onSelect: (mode: Mode) => void }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.5rem' }}>
        Cámara en <span className="gradient-text">tiempo real</span>
      </h1>
      <p style={{ color: 'rgba(234,242,255,0.65)', textAlign: 'center', marginBottom: '2.5rem' }}>
        Ve la cámara de tu portátil desde el celular, sin instalar nada. Elige qué hace este dispositivo.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => onSelect('host')}
          className="glass"
          style={{
            borderRadius: '1.25rem',
            padding: '2rem 1.5rem',
            textAlign: 'left',
            cursor: 'pointer',
            color: 'var(--color-text)',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '0.875rem',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <Radio size={22} color="#0A0F1E" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Transmitir (portátil)
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'rgba(234,242,255,0.6)' }}>
            Usa la cámara de este equipo y genera un código para compartir.
          </p>
        </button>

        <button
          onClick={() => onSelect('view')}
          className="glass"
          style={{
            borderRadius: '1.25rem',
            padding: '2rem 1.5rem',
            textAlign: 'left',
            cursor: 'pointer',
            color: 'var(--color-text)',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '0.875rem',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <Smartphone size={22} color="#0A0F1E" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Ver cámara (celular)
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'rgba(234,242,255,0.6)' }}>
            Introduce el código o escanea el QR para ver el video en vivo.
          </p>
        </button>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'rgba(234,242,255,0.45)', textAlign: 'center', marginTop: '2rem' }}>
        Consejo: si ejecutas el sitio en local (<code>npm run dev</code>), abre esta página en el portátil normalmente
        y en el celular usa la IP de tu portátil en la misma WiFi, por ejemplo{' '}
        <code>http://192.168.1.X:3000/camera</code>, en vez de <code>localhost</code>.
      </p>

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link href="/" style={{ fontSize: '0.8rem', color: 'rgba(234,242,255,0.45)' }}>
          ← Volver al sitio
        </Link>
      </p>
    </div>
  )
}

export default function CameraApp() {
  const searchParams = useSearchParams()
  const initialCode = normalizeCode(searchParams.get('code') ?? '')
  const [mode, setMode] = useState<Mode>(initialCode ? 'view' : 'select')

  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 1.25rem',
      }}
    >
      {mode === 'select' && <SelectScreen onSelect={setMode} />}
      {mode === 'host' && <HostPanel onBack={() => setMode('select')} />}
      {mode === 'view' && <ViewerPanel initialCode={initialCode} onBack={() => setMode('select')} />}
    </main>
  )
}
