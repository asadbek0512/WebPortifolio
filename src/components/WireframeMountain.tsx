'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ============================================================
   PIXILA USLUBIDA WIREFRAME TOG'
   Oltin simli real tog' silueti + quyosh porlashi.
   Scroll => kamera A nuqtadan B nuqtaga SAYOHAT qiladi
   (aylanib boshiga qaytmaydi — bir yo'nalishli kino harakati).
   Wireframe chiziqlar => har doim tiniq (4K-sharp).
   ============================================================ */

// JS value-noise + fbm (Blender shart emas)
const fract = (x: number) => x - Math.floor(x);
function hash(x: number, z: number) {
  return fract(Math.sin(x * 127.1 + z * 311.7) * 43758.5453);
}
function vnoise(x: number, z: number) {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix, fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);
  const a = hash(ix, iz);
  const b = hash(ix + 1, iz);
  const c = hash(ix, iz + 1);
  const d = hash(ix + 1, iz + 1);
  return a * (1 - ux) * (1 - uz) + b * ux * (1 - uz) + c * (1 - ux) * uz + d * ux * uz;
}
function fbm(x: number, z: number) {
  let v = 0, a = 0.5;
  for (let i = 0; i < 5; i++) {
    v += a * vnoise(x, z);
    x *= 2; z *= 2; a *= 0.5;
  }
  return v;
}
// ridged MULTIFRACTAL => real tog' tizmalari: o'tkir qirralar, radial tarqalgan
function ridgedMulti(x: number, z: number) {
  let sum = 0, freq = 1, amp = 0.5, prev = 1;
  for (let i = 0; i < 6; i++) {
    let n = 1 - Math.abs(2 * vnoise(x * freq, z * freq) - 1);
    n *= n;                 // qirralarni o'tkirlashtiradi
    sum += n * amp * prev;  // oldingi oktava hozirgini modullaydi
    prev = n;
    freq *= 2; amp *= 0.5;
  }
  return sum;
}

// Kamera sayohat nuqtalari (A => B), scroll bo'yicha lerp qilinadi
const CAM_A = new THREE.Vector3(0, 9, 52);    // boshlanish: past rakurs, cho'qqiga qarab
const CAM_B = new THREE.Vector3(26, 16, 34);  // oxiri: yon va balandroqdan
const LOOK_A = new THREE.Vector3(-3, 13, -5);
const LOOK_B = new THREE.Vector3(-3, 9, -9);

function Terrain() {
  const mesh = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const cur = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });   // xom mouse pozitsiyasi (-1..1)
  const mouseS = useRef({ x: 0, y: 0 });  // silliqlangan mouse
  const { camera } = useThree();

  const pos = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);

  const geometry = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const size = 100;
    const seg = isMobile ? 120 : 200; // mobilda yengilroq (silliq ishlashi uchun)
    const g = new THREE.PlaneGeometry(size, size, seg, seg);
    const p = g.attributes.position;
    // cho'qqi markazi biroz suriladi => tabiiy, simmetrik emas
    const cx = -3, cy = 5;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const y = p.getY(i);
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // keng "envelope" — markaziy hududni baland ko'taradi (yumshoq gauss)
      const env = Math.exp(-(dist * dist) / 1300);
      // o'tkir tog' qirralari (radial tarqaladi), envelope bilan kuchaytiriladi
      const ridges = ridgedMulti(x * 0.045 + 7, y * 0.045);
      // hamma joyda mayda dumaloq tepaliklar (oldingi plan)
      const foothills = fbm(x * 0.08, y * 0.08);

      const h =
        ridges * env * 30 +              // baland o'tkir markaziy cho'qqi
        foothills * 3.0 +                // umumiy past tepaliklar
        (foothills - 0.5) * env * 7;     // cho'qqi atrofida qo'shimcha relyef

      p.setZ(i, h);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  useFrame((state) => {
    // scroll'ni silliq quvib boradi (kichik koeff = yumshoqroq)
    cur.current += (scroll.current - cur.current) * 0.045;
    // ease-in-out => harakat boshi/oxiri yumshoq
    const s = THREE.MathUtils.smoothstep(cur.current, 0, 1);
    const t = state.clock.elapsedTime;

    // mouse'ni silliqlash (lerp) => titramaydi
    mouseS.current.x += (mouse.current.x - mouseS.current.x) * 0.04;
    mouseS.current.y += (mouse.current.y - mouseS.current.y) * 0.04;
    const mx = mouseS.current.x, my = mouseS.current.y;

    // A => B kamera sayohati (scroll) + mouse parallaks
    pos.lerpVectors(CAM_A, CAM_B, s);
    pos.x += mx * 6 + Math.sin(t * 0.15) * 0.6; // mouse + yengil tebranish
    pos.y += -my * 3 + Math.sin(t * 0.22) * 0.3;
    camera.position.copy(pos);

    look.lerpVectors(LOOK_A, LOOK_B, s);
    camera.lookAt(look);

    // tog'ni mouse bilan aylantirish (silliq) + sezilmas nafas
    if (mesh.current) {
      mesh.current.rotation.y = mx * 0.35 + Math.sin(t * 0.05) * 0.04;
      mesh.current.rotation.x = my * 0.12;
      mesh.current.rotation.z = Math.sin(t * 0.1) * 0.012;
    }
  });

  return (
    <group ref={mesh}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {/* to'q to'ldiruvchi — orqa chiziqlarni yashiradi (toza ko'rinish) */}
        <mesh geometry={geometry}>
          <meshBasicMaterial color="#0b0805" polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
        </mesh>
        {/* oltin wireframe */}
        <mesh geometry={geometry}>
          <meshBasicMaterial color="#C9A84C" wireframe transparent opacity={0.55} />
        </mesh>
      </group>
    </group>
  );
}

export default function WireframeMountain() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background:
          'radial-gradient(ellipse 130% 70% at 50% 52%, rgba(214,176,90,0.40), rgba(120,80,30,0.12) 38%, transparent 62%),' +
          'linear-gradient(to bottom, #0b0a0c 0%, #1d1407 42%, #0c0905 72%, #050505 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 9, 52], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <fog attach="fog" args={['#0c0905', 34, 100]} />
        <Terrain />
      </Canvas>
    </div>
  );
}
