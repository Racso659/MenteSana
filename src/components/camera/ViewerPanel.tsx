'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { MediaConnection, default as PeerType } from 'peerjs'
import { ArrowLeft, Volume2, VolumeX, Maximize, PlugZap, LogOut } from 'lucide-react'
import { ROOM_PREFIX, normalizeCode, ICE_SERVERS } from './constants'
import { mapPeerError } from './peerErrors'

type Status = 'idle' | 'connecting' | 'connected' | 'error'

export default function ViewerPanel({ initialCode, onBack }: { initialCode: string; onBack: () => void }) {
  const [inputCode, setInputCode] = useState(normalizeCode(initialCode))
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [muted, setMuted] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const peerRef = useRef<PeerType | null>(null)

  const disconnect = useCallback(() => {
    peerRef.current?.destroy()
    peerRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    setStatus('idle')
  }, [])

  useEffect(() => () => disconnect(), [disconnect])

  const connect = useCallback(async (rawCode: string) => {
    const clean = normalizeCode(rawCode)
    if (!clean) {
      setError('Escribe el código de la transmisión.')
      return
    }
    setError('')
    setStatus('connecting')
    try {
      const { default: Peer } = await import('peerjs')
      const peer = new Peer({ config: { iceServers: ICE_SERVERS } })
      peerRef.current = peer

      peer.on('open', () => {
        const conn = peer.connect(ROOM_PREFIX + clean, { reliable: true })
        conn.on('error', (err: { type?: string; message?: string }) => {
          console.error(err)
          setError(mapPeerError(err.type || err.message || 'unknown'))
          setStatus('error')
        })
      })

      peer.on('call', (call: MediaConnection) => {
        call.answer()
        call.on('stream', (remoteStream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = remoteStream
            videoRef.current.play().catch(() => {})
          }
          setStatus('connected')
        })
        call.on('close', () => {
          setStatus('idle')
          if (videoRef.current) videoRef.current.srcObject = null
        })
      })

      peer.on('error', (err: { type: string; message?: string }) => {
        console.error(err)
        setError(mapPeerError(err.type || err.message || 'unknown'))
        setStatus('error')
      })
    } catch (e) {
      console.error(e)
      setError('No se pudo iniciar la conexión en este navegador.')
      setStatus('error')
    }
  }, [])

  // Si llegamos desde un QR con ?code=XXXXXX, conectamos automáticamente.
  // (el timeout evita disparar setState de forma síncrona dentro del efecto)
  useEffect(() => {
    const clean = normalizeCode(initialCode)
    if (!clean) return
    const id = setTimeout(() => connect(clean), 0)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleMute = useCallback(() => {
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted
    setMuted((m) => !m)
  }, [])

  const goFullscreen = useCallback(() => {
    wrapperRef.current?.requestFullscreen?.().catch(() => {})
  }, [])

  const isConnected = status === 'connected'

  return (
    <div className="w-full max-w-xl mx-auto">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 mb-6"
        style={{ color: 'rgba(234,242,255,0.65)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
      >
        <ArrowLeft size={16} /> Volver
      </button>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Ver cámara remota
      </h1>
      <p style={{ color: 'rgba(234,242,255,0.65)', marginBottom: '1.5rem' }}>
        Escribe el código que te muestra el portátil (o escanéalo por QR) para ver su cámara en vivo.
      </p>

      {!isConnected && (
        <div className="glass" style={{ borderRadius: '1.25rem', padding: '1.25rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            value={inputCode}
            onChange={(e) => setInputCode(normalizeCode(e.target.value))}
            placeholder="CÓDIGO"
            maxLength={8}
            style={{
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border-soft)',
              borderRadius: '0.75rem',
              padding: '0.875rem 1rem',
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          />
          <button
            onClick={() => connect(inputCode)}
            disabled={status === 'connecting'}
            className="btn-primary"
            style={{ justifyContent: 'center', opacity: status === 'connecting' ? 0.7 : 1 }}
          >
            <PlugZap size={18} />
            {status === 'connecting' ? 'Conectando…' : 'Conectar'}
          </button>
        </div>
      )}

      {(status === 'connecting' || isConnected) && (
        <div className="glass" style={{ borderRadius: '1.25rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
          <div ref={wrapperRef} style={{ position: 'relative', background: '#000', borderRadius: '0.75rem', overflow: 'hidden' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={muted}
              style={{ width: '100%', aspectRatio: '16 / 9', display: 'block', objectFit: 'cover' }}
            />
            {status === 'connecting' && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(234,242,255,0.65)',
                  fontSize: '0.9rem',
                }}
              >
                Esperando video del portátil…
              </div>
            )}
          </div>

          {isConnected && (
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button onClick={toggleMute} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                {muted ? 'Activar sonido' : 'Silenciar'}
              </button>
              <button onClick={goFullscreen} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                <Maximize size={16} /> Pantalla completa
              </button>
              <button onClick={disconnect} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
                <LogOut size={16} /> Salir
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <div
          style={{
            background: 'rgba(255, 92, 138, 0.1)',
            border: '1px solid rgba(255, 92, 138, 0.35)',
            color: '#FF5C8A',
            borderRadius: '0.75rem',
            padding: '0.875rem 1rem',
            fontSize: '0.85rem',
          }}
        >
          {error}
        </div>
      )}
    </div>
  )
}
