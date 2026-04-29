import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'

const COUNT = 2000

function Particles() {
  const ref = useRef()
  const { mouse } = useThree()

  const { positions, phases, originalPos } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const phases = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 26
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      phases[i] = Math.random() * Math.PI * 2
    }
    const originalPos = new Float32Array(positions)
    return { positions, phases, originalPos }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const arr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const ph = phases[i]
      arr[i3]     = originalPos[i3]     + Math.sin(t * 0.28 + ph) * 0.45 + mouse.x * 0.6
      arr[i3 + 1] = originalPos[i3 + 1] + Math.cos(t * 0.22 + ph) * 0.38 + mouse.y * 0.6
      arr[i3 + 2] = originalPos[i3 + 2] + Math.sin(t * 0.35 + ph * 1.3) * 0.2
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#00D68F"
        transparent
        opacity={0.48}
        sizeAttenuation
      />
    </points>
  )
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false }}
      style={{ background: 'transparent' }}
    >
      <Particles />
    </Canvas>
  )
}
