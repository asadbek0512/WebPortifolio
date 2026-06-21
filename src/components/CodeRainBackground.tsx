'use client';

import { useEffect, useRef } from 'react';

/* ============================================================
   TERMINAL / KOD DUNYOSI FONI
   Nafis oltin "kod yomg'iri" (matrix) + chuqurlik + vignette
   Canvas 2D — matn tiniq, yengil
   ============================================================ */

export default function CodeRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fontSize = 17;
    const colGap = fontSize * 1.45; // kamroq zichlik = nafisroq
    const chars = '01{}<>/=;()[]+-*&|$#_:.'.split('');

    let w = 0, h = 0, cols = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let bright: number[] = []; // har ustun head yorqinligi

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / colGap);
      drops = Array.from({ length: cols }, () => Math.random() * -h);
      speeds = Array.from({ length: cols }, () => 0.35 + Math.random() * 0.7);
      bright = Array.from({ length: cols }, () => Math.random());
      ctx.font = `${fontSize}px 'Space Mono', ui-monospace, monospace`;
      ctx.textBaseline = 'top';
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    const draw = () => {
      // izlarni yumshoq so'ndirish (trail)
      ctx.fillStyle = 'rgba(5, 5, 6, 0.10)';
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < cols; i++) {
        const x = i * colGap;
        const y = drops[i];
        const ch = chars[(Math.random() * chars.length) | 0];

        // head: ba'zilari yorqin krem, qolgani oltin
        if (bright[i] > 0.92) {
          ctx.fillStyle = 'rgba(245, 240, 232, 0.95)'; // krem head
        } else {
          ctx.fillStyle = 'rgba(201, 168, 76, 0.78)'; // oltin
        }
        ctx.fillText(ch, x, y);

        drops[i] += speeds[i] * fontSize * 0.55;
        if (drops[i] > h + Math.random() * 240) {
          drops[i] = Math.random() * -120;
          bright[i] = Math.random();
          speeds[i] = 0.35 + Math.random() * 0.7;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10" style={{ background: '#050506' }}>
      <canvas ref={canvasRef} className="w-full h-full block" style={{ opacity: 0.5 }} />
      {/* gold glow + vignette — kinematik chuqurlik */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 35%, rgba(201,168,76,0.10), transparent 60%),' +
            'radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(5,5,6,0.88) 100%)',
        }}
      />
    </div>
  );
}
