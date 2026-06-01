'use client'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Icosahedron, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

/**
 * Polished real-time WebGL hero centerpiece:
 *  - morphing icosahedron core lit by teal + magenta neon point lights
 *  - faint rotating wireframe shell
 *  - drifting particle field
 *  - bloom glow, gentle float, camera parallax toward the pointer
 * Transparent canvas so the page neon ambient shows through. No assets.
 */

function Core() {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    g.rotation.y = t * 0.16
    g.rotation.z = t * 0.04
    g.rotation.x += (state.pointer.y * 0.3 - g.rotation.x) * 0.03
  })
  return (
    <group ref={group}>
      <Icosahedron args={[1.35, 16]}>
        <MeshDistortMaterial color="#0b0b10" roughness={0.12} metalness={0.96} distort={0.45} speed={1.7} />
      </Icosahedron>
      <Icosahedron args={[1.75, 2]}>
        <meshBasicMaterial color="#1fb6a6" wireframe transparent opacity={0.12} />
      </Icosahedron>
    </group>
  )
}

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#9be7dd"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function CameraRig() {
  useFrame((state) => {
    const cam = state.camera
    cam.position.x += (state.pointer.x * 0.9 - cam.position.x) * 0.03
    cam.position.y += (state.pointer.y * 0.6 - cam.position.y) * 0.03
    cam.lookAt(0, 0, 0)
  })
  return null
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[-4, 3, 3]} color="#1fb6a6" intensity={140} />
      <pointLight position={[4, -2, 2]} color="#d426b8" intensity={140} />
      <pointLight position={[0, 0, -6]} color="#4a90d9" intensity={50} />
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <Core />
      </Float>
      <Particles />
      <CameraRig />
      <EffectComposer>
        <Bloom intensity={1.25} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur radius={0.7} />
      </EffectComposer>
    </Canvas>
  )
}
