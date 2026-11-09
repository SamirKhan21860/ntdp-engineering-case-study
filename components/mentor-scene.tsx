'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function OrbitalMentor() {
  const assembly = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(420 * 3);
    for (let i = 0; i < 420; i += 1) {
      const radius = 1.65 + Math.random() * 1.65;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return positions;
  }, []);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (assembly.current) {
      assembly.current.rotation.y += 0.0018;
      assembly.current.rotation.x = THREE.MathUtils.lerp(assembly.current.rotation.x, pointer.y * 0.12, 0.025);
      assembly.current.rotation.z = THREE.MathUtils.lerp(assembly.current.rotation.z, -pointer.x * 0.1, 0.025);
    }
    if (core.current) {
      const pulse = 1 + Math.sin(t * 1.25) * 0.025;
      core.current.scale.setScalar(pulse);
    }
    if (rings.current) {
      rings.current.rotation.z = t * 0.055;
      rings.current.rotation.x = Math.sin(t * 0.22) * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 3, 4]} intensity={34} color="#c9b4ff" distance={9} />
      <pointLight position={[-3, -2, -2]} intensity={18} color="#7550c7" distance={8} />
      <group ref={assembly}>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.92, 5]} />
          <meshPhysicalMaterial color="#9d7be6" roughness={0.22} metalness={0.28} clearcoat={1} clearcoatRoughness={0.12} emissive="#56328e" emissiveIntensity={0.55} />
        </mesh>
        <mesh scale={1.045}>
          <icosahedronGeometry args={[0.92, 2]} />
          <meshBasicMaterial color="#e4d7ff" wireframe transparent opacity={0.22} />
        </mesh>
        <group ref={rings}>
          <mesh rotation={[Math.PI / 2.35, 0.2, 0]}>
            <torusGeometry args={[1.38, 0.006, 8, 180]} />
            <meshBasicMaterial color="#c9b4ff" transparent opacity={0.7} />
          </mesh>
          <mesh rotation={[0.85, 0.35, 0.8]}>
            <torusGeometry args={[1.62, 0.004, 8, 180]} />
            <meshBasicMaterial color="#8e6bd0" transparent opacity={0.55} />
          </mesh>
          <mesh rotation={[1.25, 0.9, 0.2]}>
            <torusGeometry args={[1.82, 0.003, 8, 180]} />
            <meshBasicMaterial color="#e2d5ff" transparent opacity={0.3} />
          </mesh>
        </group>
      </group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#d9caff" size={0.018} transparent opacity={0.72} sizeAttenuation depthWrite={false} />
      </points>
    </>
  );
}

export default function MentorScene() {
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(media.matches);
    updateMotionPreference();
    media.addEventListener('change', updateMotionPreference);

    const node = host.current;
    if (!node) return () => media.removeEventListener('change', updateMotionPreference);

    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return () => media.removeEventListener('change', updateMotionPreference);
    }

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { rootMargin: '180px 0px' });

    observer.observe(node);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  return (
    <div ref={host} className="mentor-canvas-shell" aria-hidden="true">
      {!webglReady && (
        <div className="mentor-scene-fallback">
          <div className="mentor-fallback-core" />
          <div className="mentor-fallback-ring mentor-fallback-ring-a" />
          <div className="mentor-fallback-ring mentor-fallback-ring-b" />
        </div>
      )}
      {inView && (
        <Canvas
          className="mentor-canvas"
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.8], fov: 42 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
          frameloop={reducedMotion ? 'demand' : 'always'}
          onCreated={() => setWebglReady(true)}
        >
          <OrbitalMentor />
        </Canvas>
      )}
    </div>
  );
}
