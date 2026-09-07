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

### Uso desde cualquier red (recomendado)

Si despliegas el sitio (por ejemplo en Vercel), abre `https://tu-dominio.com/camera` tanto en el portátil como en el celular — no hace falta estar en la misma WiFi, ya que la señalización usa el broker público de PeerJS y el video viaja P2P a través de internet.
