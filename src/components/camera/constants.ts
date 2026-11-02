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
// Open Relay Project ofrece un TURN gratuito con credenciales públicas de
// demostración: el video sigue cifrado extremo a extremo (DTLS-SRTP), el
// relay solo mueve paquetes opacos, pero no hay garantía de disponibilidad.
// Para un uso más serio, sustituye esto por un TURN propio o de pago.
export const ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:openrelay.metered.ca:80' },
  { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' },
  { urls: 'turn:openrelay.metered.ca:443', username: 'openrelayproject', credential: 'openrelayproject' },
  {
    urls: 'turn:openrelay.metered.ca:443?transport=tcp',
    username: 'openrelayproject',
    credential: 'openrelayproject',
  },
]
