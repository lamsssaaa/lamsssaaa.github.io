'use client'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Icosahedron, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

/**
 * Vivid real-time WebGL hero centerpiece: a glowing neon wireframe shell around
 * a morphing core, teal + magenta lights, particle field, bloom, float and
 * camera parallax. Built to read clearly on a dark background.
 */

function Core() {
  const group = useRef<THREE.Group>(null)
  const wire = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group.current) {
      group.current.rotation.y = t * 0.16
      group.current.rotation.x += (state.pointer.y * 0.3 - group.current.rotation.x) * 0.03
    }
    if (wire.current) {
      wire.current.rotation.y = -t * 0.22
      wire.current.rotation.z = t * 0.08
    }
  })
  return (
    <group ref={group}>
      {/* Morphing metallic core */}
      <Icosahedron args={[1.4, 18]}>
        <MeshDistortMaterial color="#14141c" roughness={0.1} metalness={1} distort={0.5} speed={1.8} />
      </Icosahedron>
      {/* Bright neon wireframe shell — the obviously-3D element */}
      <Icosahedron ref={wire} args={[2.1, 3]}>
        <meshBasicMaterial color="#3df0dc" wireframe transparent opacity={0.55} />
      </Icosahedron>
    </group>
  )
}

function Particles({ count = 700 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.04
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#b7f5ec" transparent opacity={0.85} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function CameraRig() {
  useFrame((s) => {
    s.camera.position.x += (s.pointer.x * 1 - s.camera.position.x) * 0.03
    s.camera.position.y += (s.pointer.y * 0.7 - s.camera.position.y) * 0.03
    s.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[-4, 3, 4]} color="#23e0c8" intensity={260} />
      <pointLight position={[4, -2, 3]} color="#ff36c2" intensity={260} />
      <pointLight position={[0, 1, -6]} color="#5aa6ff" intensity={90} />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <Core />
      </Float>
      <Particles />
      <CameraRig />
      <EffectComposer>
        <Bloom intensity={1.8} luminanceThreshold={0.1} luminanceSmoothing={0.9} mipmapBlur radius={0.8} />
      </EffectComposer>
    </Canvas>
  )
}
