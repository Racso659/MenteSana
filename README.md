# Veli Creations

Premium digital design studio website for **OscarVelilla.com**.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Animations**: Framer Motion
- **3D**: React Three Fiber + Drei
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **Fonts**: Sora (display) + Inter (body) via `next/font/google`

## Sections

1. **Navbar** — Fixed glass-morphism navigation
2. **Hero** — Full-viewport with 3D animated sphere, orbiting rings, stars
3. **Stats** — Animated count-up metrics
4. **Services** — 6-card grid with colorful hover effects
5. **Testimonials** — Interactive carousel
6. **CTA** — Full-width call to action
7. **Footer** — Dark premium footer

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy

Works out of the box with [Vercel](https://vercel.com).

## 📷 Cámara en tiempo real (`/camera`)

Página utilitaria que convierte el portátil en una cámara que se puede ver en vivo desde el celular, sin instalar ninguna app. Usa WebRTC (vía [PeerJS](https://peerjs.com), que solo se usa para la señalización inicial — el video viaja directo entre los dos dispositivos, nunca por un servidor propio).

### Uso rápido (mismo WiFi, sin desplegar nada)

1. En el **portátil** (Windows 11), dentro de la carpeta del proyecto:
   ```bash
   npm install
   npm run dev
   ```
2. Abre en el navegador del portátil: `http://localhost:3000/camera` → elige **"Transmitir (portátil)"** → acepta el permiso de cámara → se genera un código de 6 caracteres y un QR.
3. Busca la IP local del portátil (`ipconfig` en CMD/PowerShell, campo "Dirección IPv4", ej. `192.168.1.23`). Asegúrate de que el firewall de Windows permita conexiones entrantes al puerto `3000` (Node.js) en la red privada la primera vez que lo pida.
4. En el **celular**, conectado a la **misma WiFi**, abre `http://192.168.1.23:3000/camera` (con tu IP real) → **"Ver cámara (celular)"** → escribe el código o simplemente escanea el QR que muestra el portátil desde la cámara del celular (se conecta solo).

### Uso desde cualquier red — ver la cámara estando fuera de casa (recomendado)

El modo "mismo WiFi" **no sirve si estás fuera de casa**: el celular no puede
cargar `http://192.168.1.X:3000` desde datos móviles o desde otra red, porque
esa IP solo existe dentro de tu red local. Para verla desde cualquier lugar
necesitas que la *página* (no el video) se cargue desde una URL pública:

1. Sube el repo a GitHub (ya está) y conéctalo a [Vercel](https://vercel.com)
   (plan gratuito) — "Add New Project" → importa `MenteSana` → Deploy. Tarda
   ~1 minuto y te da una URL fija tipo `https://mentesana.vercel.app`.
2. Deja el portátil con esa URL abierta en `/camera` → **"Transmitir"**
   cada vez que quieras que esté disponible (el portátil tiene que seguir
   encendido y con esa pestaña abierta; esto no es una cámara de seguridad
   24/7, solo mientras el portátil esté transmitiendo).
3. Desde el celular, con datos móviles o cualquier WiFi, abre esa misma URL
   `/camera` → **"Ver cámara"** → código o QR.

El video sigue viajando **directo entre los dos dispositivos** (P2P, cifrado
extremo a extremo con DTLS-SRTP); Vercel solo sirve el código de la página,
nunca ve el video. Para que la conexión P2P también funcione a través de
redes móviles o firewalls estrictos (no solo WiFi doméstica), el proyecto
incluye STUN + un TURN de respaldo (`src/components/camera/constants.ts`,
`ICE_SERVERS`) usando el relay gratuito de Open Relay Project — las
credenciales son públicas y compartidas, así que si cambia su disponibilidad
o quieres algo más robusto/privado, sustitúyelas por un TURN propio (p. ej.
[coturn](https://github.com/coturn/coturn) autogestionado) o uno de pago.

> **Nota de seguridad**: cualquiera que conozca (o adivine) el código de 6
> caracteres mientras el portátil está transmitiendo podría conectarse y ver
> el video — no hay contraseña adicional. El código cambia cada vez que
> inicias una transmisión y el espacio de combinaciones es grande (~mil
> millones), pero si vas a dejarlo transmitiendo largos periodos sin
> supervisión, considera pedir que se añada un PIN/contraseña extra antes de
> depender de esto como cámara de vigilancia real.
