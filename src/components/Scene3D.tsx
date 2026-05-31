'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function MainSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.08
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 5]} />
        <MeshDistortMaterial
          color="#2EF2A2"
          distort={0.42}
          speed={2.5}
          roughness={0.05}
          metalness={0.9}
          emissive="#094030"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  )
}

function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = -state.clock.elapsedTime * 0.04
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.02
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 18, 18]} />
      <meshBasicMaterial color="#19C6FF" wireframe transparent opacity={0.07} />
    </mesh>
  )
}

function OrbitingElement({
  orbitRadius,
  orbitSpeed,
  color,
  tiltX,
  tiltZ,
}: {
  orbitRadius: number
  orbitSpeed: number
  color: string
  tiltX: number
  tiltZ: number
}) {
  const dotGroupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!dotGroupRef.current) return
    dotGroupRef.current.rotation.y = state.clock.elapsedTime * orbitSpeed
  })

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[orbitRadius, 0.007, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>
      <group ref={dotGroupRef}>
        <mesh position={[orbitRadius, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} />
        </mesh>
        <mesh position={[-orbitRadius * 0.7, orbitRadius * 0.3, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
        </mesh>
      </group>
    </group>
  )
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const count = 100
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = 3.2 + Math.random() * 3.5
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.015
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial color="#2EF2A2" size={0.055} transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

function SmallGlowSpheres() {
  const positions: [number, number, number][] = [
    [3.5, 1.5, -1],
    [-3, 2, 0.5],
    [1, -3.5, 1.5],
    [-2, -2, -2.5],
    [2.5, -1, 2.5],
  ]
  const colors = ['#2EF2A2', '#19C6FF', '#7A5CFF', '#FF5C8A', '#FFC247']

  return (
    <>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={colors[i]} emissive={colors[i]} emissiveIntensity={2} />
        </mesh>
      ))}
    </>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Stars radius={60} depth={30} count={2500} factor={3} fade speed={0.4} />

      <ambientLight intensity={0.25} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#2EF2A2" />
      <pointLight position={[-5, -3, -3]} intensity={1.5} color="#7A5CFF" />
      <pointLight position={[0, -5, 4]} intensity={1} color="#19C6FF" />
      <pointLight position={[3, 2, -4]} intensity={0.8} color="#FF5C8A" />

      <MainSphere />
      <WireframeSphere />

      <OrbitingElement orbitRadius={3.1} orbitSpeed={0.42} color="#19C6FF" tiltX={0.3} tiltZ={0.1} />
      <OrbitingElement orbitRadius={3.7} orbitSpeed={-0.28} color="#7A5CFF" tiltX={1.2} tiltZ={0.5} />
      <OrbitingElement orbitRadius={4.3} orbitSpeed={0.18} color="#FF5C8A" tiltX={0.8} tiltZ={1.1} />

      <FloatingParticles />
      <SmallGlowSpheres />
    </Canvas>
  )
}
