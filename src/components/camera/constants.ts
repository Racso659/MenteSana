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
