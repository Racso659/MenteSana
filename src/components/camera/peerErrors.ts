// Mensajes de error legibles (en español) para los códigos de error que
// emite PeerJS (la librería WebRTC que usa la página /camera).
export function mapPeerError(type: string): string {
  switch (type) {
    case 'peer-unavailable':
      return 'No existe ninguna transmisión activa con ese código. Revisa que el portátil siga transmitiendo y que el código esté bien escrito.'
    case 'network':
      return 'Problema de red. Comprueba que ambos dispositivos tengan conexión a internet (o estén en la misma WiFi).'
    case 'unavailable-id':
      return 'Ese código ya está en uso justo ahora. Vuelve a intentarlo.'
    case 'browser-incompatible':
      return 'Este navegador no soporta video en tiempo real (WebRTC). Prueba con Chrome, Edge o Safari actualizados.'
    case 'disconnected':
      return 'Se perdió la conexión con el servidor de señalización. Vuelve a intentarlo.'
    case 'server-error':
      return 'El servidor de señalización no respondió. Inténtalo de nuevo en unos segundos.'
    case 'socket-error':
    case 'socket-closed':
      return 'Se cerró la conexión con el servidor. Vuelve a intentarlo.'
    case 'webrtc':
      return 'Ocurrió un error de WebRTC estableciendo la conexión de video.'
    default:
      return `Ha ocurrido un error (${type}). Inténtalo de nuevo.`
  }
}
