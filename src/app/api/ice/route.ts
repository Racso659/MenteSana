import { NextResponse } from 'next/server'
import { STUN_SERVERS } from '@/components/camera/constants'

export const dynamic = 'force-dynamic'

// Devuelve los servidores ICE (STUN + TURN) para WebRTC. Las credenciales
// TURN viven en variables de entorno del servidor (Vercel → Settings →
// Environment Variables), nunca en el código:
//
// - Cloudflare TURN (recomendado, 1 TB/mes gratis):
//     CLOUDFLARE_TURN_KEY_ID, CLOUDFLARE_TURN_KEY_API_TOKEN
//   Se generan credenciales temporales en cada petición.
// - Cualquier otro TURN con credenciales fijas (Metered, coturn propio…):
//     TURN_URLS (separadas por comas), TURN_USERNAME, TURN_CREDENTIAL
//
// Sin ninguna de las dos solo hay STUN: funciona en la misma WiFi, pero no
// siempre entre redes distintas (datos móviles, NAT simétrico).
export async function GET() {
  const turn = (await cloudflareTurn()) ?? staticTurn()
  return NextResponse.json(
    { iceServers: [...STUN_SERVERS, ...turn], hasTurn: turn.length > 0 },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}

async function cloudflareTurn(): Promise<RTCIceServer[] | null> {
  const keyId = process.env.CLOUDFLARE_TURN_KEY_ID
  const token = process.env.CLOUDFLARE_TURN_KEY_API_TOKEN
  if (!keyId || !token) return null
  try {
    const res = await fetch(
      `https://rtc.live.cloudflare.com/v1/turn/keys/${keyId}/credentials/generate-ice-servers`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ttl: 86400 }),
        cache: 'no-store',
      }
    )
    if (!res.ok) {
      console.error('Cloudflare TURN:', res.status, await res.text())
      return null
    }
    const data = (await res.json()) as { iceServers: RTCIceServer[] }
    // Cloudflare recomienda descartar las URLs del puerto 53: los navegadores
    // las bloquean y solo retrasan la negociación.
    return data.iceServers.map((s) => ({
      ...s,
      urls: ([] as string[]).concat(s.urls).filter((u) => !/:53(\?|$)/.test(u)),
    }))
  } catch (err) {
    console.error('Cloudflare TURN:', err)
    return null
  }
}

function staticTurn(): RTCIceServer[] {
  const urls = process.env.TURN_URLS?.split(',').map((u) => u.trim()).filter(Boolean)
  if (!urls?.length) return []
  return [{ urls, username: process.env.TURN_USERNAME, credential: process.env.TURN_CREDENTIAL }]
}
