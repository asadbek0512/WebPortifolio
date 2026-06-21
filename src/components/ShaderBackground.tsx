'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ============================================================
   PIXILA USLUBIDA SHADER FON
   Oqar fbm noise + domain warp, oltin/qora, grain, mouse + scroll
   GPU per-pixel — har doim tiniq (4K), "low-poly" emas
   ============================================================ */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uRes;
  uniform vec2  uMouse;
  uniform float uScroll;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
      mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for(int i = 0; i < 6; i++){
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = uv * 3.0;
    p.x *= uRes.x / uRes.y;

    float t = uTime * 0.04;
    // domain warp — organik oqim
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p + q * 1.6 + vec2(1.7, 9.2) + uMouse * 0.25),
                  fbm(p + q * 1.6 + vec2(8.3, 2.8) - uScroll * 0.6));
    float n = fbm(p + r * 1.5);

    // rang ramp: chuqur qora -> to'q oltin -> yorqin oltin
    vec3 c0 = vec3(0.015, 0.015, 0.022);
    vec3 c1 = vec3(0.11, 0.085, 0.04);
    vec3 c2 = vec3(0.79, 0.66, 0.30);   // #C9A84C
    vec3 c3 = vec3(0.95, 0.85, 0.55);

    vec3 col = mix(c0, c1, smoothstep(0.15, 0.55, n));
    col = mix(col, c2, smoothstep(0.55, 0.82, n) * 0.7);
    col = mix(col, c3, smoothstep(0.82, 0.98, n) * 0.5);

    // yumshoq nur dog'i (mouse atrofida)
    float glow = smoothstep(0.5, 0.0, distance(uv, uMouse * 0.5 + 0.5));
    col += vec3(0.25, 0.2, 0.1) * glow * 0.4;

    // vignette
    float vig = smoothstep(1.25, 0.35, length(uv - 0.5));
    col *= vig;

    // film grain
    float g = (hash(uv * uRes + uTime) * 2.0 - 1.0) * 0.025;
    col += g;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const scroll = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
    m.uniforms.uRes.value.set(size.width, size.height);
    // mouse va scroll yumshoq lerp
    const cm = m.uniforms.uMouse.value as THREE.Vector2;
    cm.x += (mouse.current.x - cm.x) * 0.04;
    cm.y += (mouse.current.y - cm.y) * 0.04;
    m.uniforms.uScroll.value += (scroll.current - m.uniforms.uScroll.value) * 0.05;
  });

  // viewport o'lchamiga to'la plane
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={matRef} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
}

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10" style={{ background: '#050505' }}>
      <Canvas
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 1] }}
      >
        <Plane />
      </Canvas>
    </div>
  );
}
