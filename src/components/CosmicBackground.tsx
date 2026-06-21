'use client';

import { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ============================================================
   FOTOREALISTIK KOSMIK SAYOHAT
   Real NASA teksturalari + scroll'da sayyoralarga yaqinlashish
   ============================================================ */

const JOURNEY = 88; // umumiy uchish masofasi (z)

/* --- Somon yo'li fon (equirectangular panorama) --- */
function SpaceBackground() {
  const { scene } = useThree();
  const tex = useTexture('/textures/milkyway.jpg');
  useEffect(() => {
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    scene.background = tex;
    return () => {
      scene.background = null;
    };
  }, [tex, scene]);
  return null;
}

/* --- Atmosfera (fresnel porlash) --- */
const atmoVert = `
  varying vec3 vN; varying vec3 vV;
  void main(){
    vN = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position,1.0);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }`;
const atmoFrag = `
  varying vec3 vN; varying vec3 vV; uniform vec3 uColor; uniform float uPow;
  void main(){
    float f = pow(1.0 - dot(vN,vV), uPow);
    gl_FragColor = vec4(uColor, f);
  }`;

function Atmosphere({ radius, color, power = 3.0, scale = 1.15 }: { radius: number; color: string; power?: number; scale?: number }) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: atmoVert,
        fragmentShader: atmoFrag,
        uniforms: { uColor: { value: new THREE.Color(color) }, uPow: { value: power } },
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    [color, power]
  );
  return (
    <mesh scale={scale}>
      <sphereGeometry args={[radius, 64, 64]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

/* --- YER (eng detalli: kun yuzasi + bulut + atmosfera) --- */
function Earth({ position, r }: { position: [number, number, number]; r: number }) {
  const [day, clouds, normal, spec] = useTexture([
    '/textures/earth_day.jpg',
    '/textures/earth_clouds.jpg',
    '/textures/earth_normal.jpg',
    '/textures/earth_specular.jpg',
  ]);
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);

  useFrame((_, d) => {
    if (earthRef.current) earthRef.current.rotation.y += d * 0.04;
    if (cloudRef.current) cloudRef.current.rotation.y += d * 0.055;
  });

  return (
    <group position={position} rotation={[0.2, 0, 0.12]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[r, 64, 64]} />
        <meshStandardMaterial
          map={day}
          normalMap={normal}
          roughnessMap={spec}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>
      <mesh ref={cloudRef} scale={1.012}>
        <sphereGeometry args={[r, 64, 64]} />
        <meshStandardMaterial map={clouds} alphaMap={clouds} transparent opacity={0.45} depthWrite={false} />
      </mesh>
      <Atmosphere radius={r} color="#5fa8ff" power={3.0} scale={1.13} />
    </group>
  );
}

/* --- Teksturali sayyora (Mars, Yupiter, Oy) --- */
function TexturedPlanet({
  position, r, texUrl, spin = 0.05, tilt = 0.15, atmoColor,
}: {
  position: [number, number, number]; r: number; texUrl: string; spin?: number; tilt?: number; atmoColor?: string;
}) {
  const tex = useTexture(texUrl);
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * spin;
  });
  return (
    <group position={position} rotation={[tilt, 0, 0.08]}>
      <mesh ref={ref}>
        <sphereGeometry args={[r, 64, 64]} />
        <meshStandardMaterial map={tex} roughness={0.9} metalness={0.05} />
      </mesh>
      {atmoColor && <Atmosphere radius={r} color={atmoColor} power={3.5} scale={1.1} />}
    </group>
  );
}

/* --- SATURN halqasi bilan --- */
function Saturn({ position, r }: { position: [number, number, number]; r: number }) {
  const [surf, ring] = useTexture(['/textures/saturn.jpg', '/textures/saturn_ring.png']);
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.06;
  });

  // Halqa UV: radius bo'ylab tekstura strip'ini map qilish
  const ringGeo = useMemo(() => {
    const inner = r * 1.35;
    const outer = r * 2.3;
    const g = new THREE.RingGeometry(inner, outer, 96);
    const pos = g.attributes.position;
    const uv = g.attributes.uv;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const rad = v.length();
      uv.setXY(i, (rad - inner) / (outer - inner), 0.5);
    }
    return g;
  }, [r]);

  return (
    <group position={position} rotation={[0.45, 0, 0.18]}>
      <mesh ref={ref}>
        <sphereGeometry args={[r, 64, 64]} />
        <meshStandardMaterial map={surf} roughness={0.9} metalness={0.05} />
      </mesh>
      <mesh geometry={ringGeo} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial map={ring} side={THREE.DoubleSide} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}

/* --- Yaqin yulduzlar (chuqurlik uchun, fon ustida) --- */
function NearStars({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 70;
      p[i * 3 + 1] = (Math.random() - 0.5) * 70;
      p[i * 3 + 2] = -Math.random() * (JOURNEY + 20);
    }
    return p;
  }, [count]);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.z += d * 0.005;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#ffffff" transparent opacity={0.8} depthWrite={false} sizeAttenuation />
    </points>
  );
}

/* --- Quyosh porlashi (uzoqda, kinematik nur) --- */
function SunGlow() {
  const sprite = useMemo(() => {
    const s = 256;
    const cv = document.createElement('canvas');
    cv.width = cv.height = s;
    const ctx = cv.getContext('2d')!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, 'rgba(255,250,235,1)');
    g.addColorStop(0.2, 'rgba(255,235,190,0.9)');
    g.addColorStop(0.5, 'rgba(255,200,120,0.35)');
    g.addColorStop(1, 'rgba(255,180,80,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    return new THREE.CanvasTexture(cv);
  }, []);
  return (
    <sprite position={[18, 10, 12]} scale={[16, 16, 1]}>
      <spriteMaterial map={sprite} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  );
}

/* --- Scroll → kamera (kosmosda uchish) --- */
function ScrollRig() {
  const { camera, mouse } = useThree();
  const target = useRef(0);
  const current = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useFrame(() => {
    current.current += (target.current - current.current) * 0.06;
    const z = 10 - current.current * JOURNEY;
    camera.position.z = z;
    camera.position.x += (mouse.x * 1.4 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 0.9 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, z - 12);
  });
  return null;
}

function Scene({ stars }: { stars: number }) {
  return (
    <>
      <ambientLight intensity={0.18} />
      {/* Quyosh — realistik kun/tun chegarasi */}
      <directionalLight position={[12, 6, 8]} intensity={2.4} color="#fff6e0" />
      <pointLight position={[-20, -8, -40]} intensity={0.6} color="#6f86ff" />

      <Suspense fallback={null}>
        <SpaceBackground />
        <SunGlow />
        <NearStars count={stars} />
        {/* Sayyoralar — HAMMASI o'ng tomonda (chapdagi matn toza qoladi),
            z bo'ylab uzoq joylashgan: har sectionda bittasiga yaqinlashasiz */}
        <Earth position={[6.5, -1.5, -11]} r={3.0} />
        <Saturn position={[8.5, 3.5, -32]} r={3.2} />
        <TexturedPlanet position={[9, -3.5, -52]} r={2.2} texUrl="/textures/mars.jpg" spin={0.06} atmoColor="#ff8a5c" />
        <TexturedPlanet position={[8, 3, -72]} r={4.0} texUrl="/textures/jupiter.jpg" spin={0.08} atmoColor="#e8c9a0" />
        <TexturedPlanet position={[5, -2.5, -90]} r={1.5} texUrl="/textures/moon.jpg" spin={0.03} />
      </Suspense>
      <ScrollRig />
    </>
  );
}

export default function CosmicBackground() {
  const [stars, setStars] = useState(900);
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    setStars(mobile ? 450 : 900);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" style={{ background: '#000005' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 2]}
      >
        <fog attach="fog" args={['#000005', 30, 85]} />
        <Scene stars={stars} />
      </Canvas>
    </div>
  );
}
