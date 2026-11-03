// Prefijo para los IDs de PeerJS, así reducimos la probabilidad de choque
// con otras apps que usan el broker público gratuito de PeerJS (0.peerjs.com).
export const ROOM_PREFIX = 'velicam-'

// Sin caracteres ambiguos (0/O, 1/I/L) para que el código sea fácil de
// escribir a mano en el celular.
const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

export function generateRoomCode(length = 6): string {
  let out = ''
  for (let i = 0; i < length; i++) {
    out += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
  }
  return out
}

export function normalizeCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/[^A-Z0-9]/g, '')
}

// STUN por sí solo basta cuando ambos dispositivos están en la misma WiFi.
// Fuera de casa (datos móviles, redes con NAT simétrico o firewalls
// estrictos) WebRTC necesita un relay TURN para completar la conexión.
// El TURN se configura en el servidor (ver src/app/api/ice/route.ts); el
// video sigue cifrado extremo a extremo (DTLS-SRTP), el relay solo mueve
// paquetes opacos. (El antiguo relay público openrelay.metered.ca ya no
// existe: su DNS apunta a 192.0.2.1.)
export const STUN_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
]

export async function getIceServers(): Promise<RTCIceServer[]> {
  try {
    const res = await fetch('/api/ice', { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as { iceServers: RTCIceServer[]; hasTurn: boolean }
    if (!data.hasTurn) console.warn('Sin TURN configurado: la conexión fuera de la misma red puede fallar.')
    return data.iceServers
  } catch (err) {
    console.warn('No se pudo obtener /api/ice, se usa solo STUN:', err)
    return STUN_SERVERS
  }
}
