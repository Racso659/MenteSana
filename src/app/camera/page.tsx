import { Suspense } from 'react'
import type { Metadata } from 'next'
import CameraApp from '@/components/camera/CameraApp'

export const metadata: Metadata = {
  title: 'Cámara en tiempo real | Veli Creations',
  description: 'Transmite la cámara de tu portátil y velo en tiempo real desde tu celular, punto a punto vía WebRTC.',
  robots: { index: false, follow: false },
}

export default function CameraPage() {
  return (
    <Suspense fallback={null}>
      <CameraApp />
    </Suspense>
  )
}
