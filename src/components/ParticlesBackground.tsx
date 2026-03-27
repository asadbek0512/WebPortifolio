'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 500 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random positions in a sphere
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  const color = new THREE.Color('#C9A84C');
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Random position in a sphere
    const radius = 2 + Math.random() * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
    
    // Add some color variation
    const colorVariation = 0.8 + Math.random() * 0.2;
    colors[i3] = color.r * colorVariation;
    colors[i3 + 1] = color.g * colorVariation;
    colors[i3 + 2] = color.b * colorVariation;
  }
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });
  
  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        color="#C9A84C"
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function ParticlesBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Particles count={400} />
      </Canvas>
    </div>
  );
}
