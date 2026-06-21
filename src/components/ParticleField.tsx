'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Dizayn ranglari (portfolio design system)
const GOLD = new THREE.Color('#C9A84C');
const GOLD_LIGHT = new THREE.Color('#D4B76E');
const CREAM = new THREE.Color('#F5F0E8');

const MORPH_INTERVAL = 4.5; // har necha soniyada shakl o'zgaradi

type Shape = (i: number, count: number, out: THREE.Vector3) => void;

// --- Procedural target shakllar (Blender shart emas, hammasi matematika) ---
const shapes: Shape[] = [
  // 0) Shar (fibonacci sphere — tekis taqsimlangan)
  (i, count, out) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 2.6;
    out.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
  },
  // 1) Galaktika spirali
  (i, count, out) => {
    const t = i / count;
    const arm = i % 3;
    const angle = t * Math.PI * 6 + (arm * Math.PI * 2) / 3;
    const radius = t * 3.4;
    const spread = (1 - t) * 0.5;
    out.set(
      Math.cos(angle) * radius + (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread * 1.5,
      Math.sin(angle) * radius + (Math.random() - 0.5) * spread
    );
  },
  // 2) Torus tugun (torus knot)
  (i, count, out) => {
    const t = (i / count) * Math.PI * 2;
    const p = 2;
    const q = 3;
    const r = 1 + 0.4 * Math.cos(q * t);
    out.set(
      (1.6 * r * Math.cos(p * t)),
      (1.6 * r * Math.sin(p * t)),
      (1.6 * 0.6 * Math.sin(q * t))
    );
  },
  // 3) To'lqin to'r (wave grid)
  (i, count, out) => {
    const side = Math.floor(Math.sqrt(count));
    const x = (i % side) / side - 0.5;
    const z = Math.floor(i / side) / side - 0.5;
    const dist = Math.sqrt(x * x + z * z);
    out.set(x * 6, Math.sin(dist * 14) * 0.7, z * 6);
  },
];

function Particles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  // Joriy va target pozitsiyalar
  const { positions, colors, currentTargets, nextTargets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const currentTargets = new Float32Array(count * 3);
    const nextTargets = new Float32Array(count * 3);
    const v = new THREE.Vector3();
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      shapes[0](i, count, v);
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;
      currentTargets[i * 3] = v.x;
      currentTargets[i * 3 + 1] = v.y;
      currentTargets[i * 3 + 2] = v.z;

      // Rang: markazga yaqin — cream, chetga — gold
      const mix = Math.min(1, v.length() / 3);
      c.copy(CREAM).lerp(GOLD, mix * 0.85).lerp(GOLD_LIGHT, Math.random() * 0.3);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors, currentTargets, nextTargets };
  }, [count]);

  const state = useRef({ shapeIndex: 0, timer: 0, transitioning: false, t: 0 });

  // Yumaloq, yumshoq porlovchi zarracha teksturasi
  const sprite = useMemo(() => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,240,200,0.8)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  useFrame((_, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const s = state.current;
    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const v = new THREE.Vector3();

    // Shakl o'zgarish taymeri
    s.timer += delta;
    if (!s.transitioning && s.timer >= MORPH_INTERVAL) {
      const next = (s.shapeIndex + 1) % shapes.length;
      for (let i = 0; i < count; i++) {
        shapes[next](i, count, v);
        nextTargets[i * 3] = v.x;
        nextTargets[i * 3 + 1] = v.y;
        nextTargets[i * 3 + 2] = v.z;
      }
      s.transitioning = true;
      s.t = 0;
      s.shapeIndex = next;
    }

    // Transition progress (ease)
    if (s.transitioning) {
      s.t += delta / 1.6;
      if (s.t >= 1) {
        s.t = 1;
        s.transitioning = false;
        s.timer = 0;
        currentTargets.set(nextTargets);
      }
    }
    const ease = s.t < 0.5 ? 2 * s.t * s.t : 1 - Math.pow(-2 * s.t + 2, 2) / 2;

    // Mouse ta'siri (XY tekislikда itarish)
    const mx = mouse.x * 3.5;
    const my = mouse.y * 3.5;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      // Target = current → next interpolatsiya
      const tx = s.transitioning
        ? currentTargets[ix] + (nextTargets[ix] - currentTargets[ix]) * ease
        : currentTargets[ix];
      const ty = s.transitioning
        ? currentTargets[ix + 1] + (nextTargets[ix + 1] - currentTargets[ix + 1]) * ease
        : currentTargets[ix + 1];
      const tz = s.transitioning
        ? currentTargets[ix + 2] + (nextTargets[ix + 2] - currentTargets[ix + 2]) * ease
        : currentTargets[ix + 2];

      // Joriy pozitsiyani targetga yumshoq tortish
      arr[ix] += (tx - arr[ix]) * 0.08;
      arr[ix + 1] += (ty - arr[ix + 1]) * 0.08;
      arr[ix + 2] += (tz - arr[ix + 2]) * 0.08;

      // Mouse repulsiyasi
      const dx = arr[ix] - mx;
      const dy = arr[ix + 1] - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < 1.5) {
        const f = (1.5 - d2) * 0.15;
        arr[ix] += dx * f;
        arr[ix + 1] += dy * f;
      }
    }
    posAttr.needsUpdate = true;

    // Sekin aylanish
    pts.rotation.y += delta * 0.12;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        map={sprite}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleField() {
  // Telefonда kamroq zarracha — performance uchun
  const [count, setCount] = useState(4000);
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const weak = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    setCount(mobile ? 1800 : weak ? 2800 : 4000);
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <Particles count={count} />
      </Canvas>
    </div>
  );
}
