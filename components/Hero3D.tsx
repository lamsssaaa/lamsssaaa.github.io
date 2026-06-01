'use client'
import { useRef } from 'react'
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import { MeshDistortMaterial, Icosahedron } from '@react-three/drei'
import type { Group } from 'three'

/**
 * Real-time WebGL hero centerpiece: a slowly morphing, rotating form lit by
 * teal + magenta neon lights, with subtle mouse parallax. Transparent canvas
 * so the page's neon ambient glow shows through. No assets required.
 */
function Blob() {
  const group = useRef<Group>(null)

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    g.rotation.y = t * 0.18
    g.rotation.z = t * 0.05
    // Subtle parallax toward the pointer.
    g.rotation.x += (state.pointer.y * 0.4 - g.rotation.x) * 0.04
    g.position.x += (state.pointer.x * 0.6 - g.position.x) * 0.04
  })

  return (
    <group ref={group}>
      <Icosahedron args={[1.4, 12]}>
        <MeshDistortMaterial
          color="#0c0c10"
          envMapIntensity={1}
          roughness={0.15}
          metalness={0.95}
          distort={0.42}
          speed={1.6}
        />
      </Icosahedron>
    </group>
  )
}

export default function Hero3D() {
  const lightProps = { intensity: 120 } satisfies Partial<ThreeElements['pointLight']>
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.25} />
      {/* Teal key light (top-left) */}
      <pointLight position={[-4, 3, 3]} color="#1fb6a6" {...lightProps} />
      {/* Magenta rim light (bottom-right) */}
      <pointLight position={[4, -2, 2]} color="#d426b8" {...lightProps} />
      {/* Cool fill from behind */}
      <pointLight position={[0, 0, -5]} color="#4a90d9" intensity={40} />
      <Blob />
    </Canvas>
  )
}
