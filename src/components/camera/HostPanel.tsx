'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { DataConnection, MediaConnection, default as PeerType } from 'peerjs'
import { Camera, Copy, Check, Radio, Square, Users, ArrowLeft } from 'lucide-react'
import { ROOM_PREFIX, generateRoomCode, getIceServers } from './constants'
import { mapPeerError } from './peerErrors'

type Status = 'idle' | 'requesting-camera' | 'connecting' | 'live' | 'error'

export default function HostPanel({ onBack }: { onBack: () => void }) {
  const [status, setStatus] = useState<Status>('idle')
  const [code, setCode] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [viewers, setViewers] = useState(0)
  const [error, setError] = useState('')
  const [includeAudio, setIncludeAudio] = useState(false)
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [deviceId, setDeviceId] = useState('')
  const [copied, setCopied] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const peerRef = useRef<PeerType | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const callsRef = useRef<Set<MediaConnection>>(new Set())

  useEffect(() => {
    navigator.mediaDevices
      ?.enumerateDevices()
      .then((list) => setDevices(list.filter((d) => d.kind === 'videoinput')))
      .catch(() => {})
  }, [])

  const stop = useCallback(() => {
    callsRef.current.forEach((c) => c.close())
    callsRef.current.clear()
    peerRef.current?.destroy()
    peerRef.current = null
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    setStatus('idle')
    setCode('')
    setQrDataUrl('')
    setViewers(0)
  }, [])

  useEffect(() => () => stop(), [stop])

  const start = useCallback(async () => {
    setError('')
    setStatus('requesting-camera')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: deviceId ? { deviceId: { exact: deviceId } } : true,
        audio: includeAudio,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play().catch(() => {})
      }

      setStatus('connecting')
      const [{ default: Peer }, iceServers] = await Promise.all([import('peerjs'), getIceServers()])
      const newCode = generateRoomCode()
      const peer = new Peer(ROOM_PREFIX + newCode, { config: { iceServers } })
      peerRef.current = peer

      peer.on('open', () => {
        setCode(newCode)
        setStatus('live')
        const joinUrl = `${window.location.origin}/camera?code=${newCode}`
        import('qrcode')
          .then((QRCode) =>
            QRCode.toDataURL(joinUrl, {
              margin: 1,
              width: 260,
              color: { dark: '#0A0F1E', light: '#EAF2FF' },
            })
          )
          .then(setQrDataUrl)
          .catch(() => {})
      })

      peer.on('connection', (conn: DataConnection) => {
        conn.on('open', () => {
          if (!streamRef.current) return
          const call = peer.call(conn.peer, streamRef.current)
          callsRef.current.add(call)
          setViewers((v) => v + 1)
          call.on('close', () => {
            callsRef.current.delete(call)
            setViewers((v) => Math.max(0, v - 1))
          })
        })
        conn.on('close', () => setViewers((v) => Math.max(0, v - 1)))
      })

      peer.on('error', (err: { type: string; message?: string }) => {
        console.error(err)
        setError(mapPeerError(err.type || err.message || 'unknown'))
        setStatus('error')
      })
    } catch (e) {
      console.error(e)
      setError(
        'No se pudo acceder a la cámara. Revisa que hayas dado permiso al navegador y que ninguna otra app la esté usando.'
      )
      setStatus('error')
    }
  }, [deviceId, includeAudio])

  const copyCode = useCallback(() => {
    if (!code) return
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [code])

  const isLive = status === 'live'
  const isBusy = status === 'requesting-camera' || status === 'connecting'

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
        Transmitir cámara
      </h1>
      <p style={{ color: 'rgba(234,242,255,0.65)', marginBottom: '1.5rem' }}>
        Convierte este portátil en la cámara. Compártele el código a tu celular para verla en tiempo real.
      </p>

      <div className="glass" style={{ borderRadius: '1.25rem', padding: '1.25rem', marginBottom: '1.25rem' }}>
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          style={{
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: '0.75rem',
            background: '#000',
            objectFit: 'cover',
          }}
        />
      </div>

      {!isLive && (
        <div className="glass" style={{ borderRadius: '1.25rem', padding: '1.25rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {devices.length > 1 && (
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.85rem', color: 'rgba(234,242,255,0.8)' }}>
              Cámara
              <select
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                style={{
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border-soft)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem 0.75rem',
                }}
              >
                <option value="">Predeterminada</option>
                {devices.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || 'Cámara'}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'rgba(234,242,255,0.8)', cursor: 'pointer' }}>
            <input type="checkbox" checked={includeAudio} onChange={(e) => setIncludeAudio(e.target.checked)} />
            Incluir audio del micrófono
          </label>
          <button onClick={start} disabled={isBusy} className="btn-primary" style={{ justifyContent: 'center', opacity: isBusy ? 0.7 : 1 }}>
            <Radio size={18} />
            {status === 'requesting-camera'
              ? 'Pidiendo permiso de cámara…'
              : status === 'connecting'
              ? 'Conectando…'
              : 'Iniciar transmisión'}
          </button>
        </div>
      )}

      {isLive && (
        <div className="glass" style={{ borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '1.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(234,242,255,0.6)', marginBottom: '0.75rem' }}>
            Código de la transmisión
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.25rem',
                fontWeight: 800,
                letterSpacing: '0.2em',
              }}
              className="gradient-text"
            >
              {code}
            </span>
            <button
              onClick={copyCode}
              aria-label="Copiar código"
              style={{ background: 'transparent', border: '1px solid var(--color-border-soft)', borderRadius: '0.5rem', padding: '0.5rem', cursor: 'pointer', color: 'var(--color-text)' }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>

          {qrDataUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qrDataUrl} alt="Código QR para conectarse" style={{ width: 180, height: 180, borderRadius: '0.75rem', margin: '0 auto 1rem' }} />
          )}

          <p style={{ fontSize: '0.85rem', color: 'rgba(234,242,255,0.65)', marginBottom: '1rem' }}>
            En tu celular abre esta misma página, toca <strong>&quot;Ver cámara remota&quot;</strong> y escribe el
            código — o escanea el QR con la cámara del celular.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(234,242,255,0.65)', marginBottom: '1.25rem' }}>
            <Users size={16} />
            {viewers === 0 ? 'Nadie conectado todavía' : `${viewers} dispositivo${viewers > 1 ? 's' : ''} viendo`}
          </div>

          <button onClick={stop} className="btn-ghost" style={{ justifyContent: 'center', width: '100%' }}>
            <Square size={16} /> Detener transmisión
          </button>
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

      <p style={{ fontSize: '0.75rem', color: 'rgba(234,242,255,0.45)', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Camera size={14} /> El video viaja directo entre tus dispositivos (WebRTC); no pasa por ningún servidor de esta web.
      </p>
    </div>
  )
}
