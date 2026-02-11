import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ParticleCanvas.css'

gsap.registerPlugin(ScrollTrigger)

function ParticleField() {
  const ref = useRef()
  const { mouse, viewport } = useThree()
  const scrollProgress = useRef(0)
  
  // Generate particles
  const [positions, colors] = useMemo(() => {
    const count = 8000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Nebula shape - scattered sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 3 + Math.random() * 5
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // 80% white, 20% red
      if (Math.random() > 0.2) {
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 1
      } else {
        colors[i * 3] = 1
        colors[i * 3 + 1] = 0
        colors[i * 3 + 2] = 0.2
      }
    }
    
    return [positions, colors]
  }, [])

  // Store original and target positions for morphing
  const originalPositions = useRef(null)
  const logoPositions = useRef(null)
  const warpPositions = useRef(null)
  const networkPositions = useRef(null)

  useEffect(() => {
    const count = 8000
    originalPositions.current = new Float32Array(positions)
    
    // Logo shape (Star pattern)
    logoPositions.current = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 12
      const radius = 1.5 + (i % 100) * 0.02
      const armVariation = Math.sin(angle * 3) * 0.5
      logoPositions.current[i * 3] = Math.cos(angle) * (radius + armVariation)
      logoPositions.current[i * 3 + 1] = Math.sin(angle) * (radius + armVariation)
      logoPositions.current[i * 3 + 2] = (Math.random() - 0.5) * 0.5
    }
    
    // Warp drive (tunnel)
    warpPositions.current = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const z = (Math.random() - 0.5) * 30
      const radius = 2 + Math.random() * 3
      warpPositions.current[i * 3] = Math.cos(theta) * radius
      warpPositions.current[i * 3 + 1] = Math.sin(theta) * radius
      warpPositions.current[i * 3 + 2] = z
    }
    
    // Network (globe with connections)
    networkPositions.current = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 3
      networkPositions.current[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      networkPositions.current[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      networkPositions.current[i * 3 + 2] = radius * Math.cos(phi)
    }

    // Scroll-based morphing
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgress.current = self.progress
      }
    })
  }, [positions])

  useFrame((state) => {
    if (!ref.current) return
    if (!originalPositions.current || !logoPositions.current || !warpPositions.current || !networkPositions.current) {
      return
    }
    
    const time = state.clock.getElapsedTime()
    const progress = scrollProgress.current
    
    // Rotate based on mouse
    ref.current.rotation.x = mouse.y * 0.2
    ref.current.rotation.y = mouse.x * 0.2 + time * 0.05
    
    // Morph between shapes based on scroll
    const positionAttribute = ref.current.geometry.attributes.position
    const count = positionAttribute.count
    
    for (let i = 0; i < count; i++) {
      let targetX, targetY, targetZ
      
      if (progress < 0.25) {
        // Nebula to Logo
        const t = progress / 0.25
        targetX = THREE.MathUtils.lerp(originalPositions.current[i * 3], logoPositions.current[i * 3], t)
        targetY = THREE.MathUtils.lerp(originalPositions.current[i * 3 + 1], logoPositions.current[i * 3 + 1], t)
        targetZ = THREE.MathUtils.lerp(originalPositions.current[i * 3 + 2], logoPositions.current[i * 3 + 2], t)
      } else if (progress < 0.5) {
        // Logo to Warp
        const t = (progress - 0.25) / 0.25
        targetX = THREE.MathUtils.lerp(logoPositions.current[i * 3], warpPositions.current[i * 3], t)
        targetY = THREE.MathUtils.lerp(logoPositions.current[i * 3 + 1], warpPositions.current[i * 3 + 1], t)
        targetZ = THREE.MathUtils.lerp(logoPositions.current[i * 3 + 2], warpPositions.current[i * 3 + 2], t)
      } else if (progress < 0.75) {
        // Warp continues
        targetX = warpPositions.current[i * 3]
        targetY = warpPositions.current[i * 3 + 1]
        targetZ = warpPositions.current[i * 3 + 2] + (time * 2 % 30) - 15
      } else {
        // Warp to Network
        const t = (progress - 0.75) / 0.25
        targetX = THREE.MathUtils.lerp(warpPositions.current[i * 3], networkPositions.current[i * 3], t)
        targetY = THREE.MathUtils.lerp(warpPositions.current[i * 3 + 1], networkPositions.current[i * 3 + 1], t)
        targetZ = THREE.MathUtils.lerp(warpPositions.current[i * 3 + 2], networkPositions.current[i * 3 + 2], t)
      }
      
      // Add some drift
      const drift = Math.sin(time + i * 0.01) * 0.02
      positionAttribute.setXYZ(i, targetX + drift, targetY + drift, targetZ)
    }
    
    positionAttribute.needsUpdate = true
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function ParticleCanvas() {
  return (
    <div className="particle-canvas">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
    </div>
  )
}

export default ParticleCanvas
