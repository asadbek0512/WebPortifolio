'use client';

import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 200;
const LINK_DISTANCE = 175;
// mobil: kam nuqta, qisqa ulanish, xiraroq chiziq — aks holda to'r oqarib ketadi
const MOBILE_BREAKPOINT = 768;
const MOBILE_PARTICLE_RATIO = 0.3;
const MOBILE_LINK_DISTANCE = 105;
const MOBILE_LINE_ALPHA = 0.18;
const LINE_ALPHA = 0.32;
const PARTICLE_SPEED = 0.12;
const MOUSE_RADIUS = 150;
const MOUSE_PUSH = 0.004;
const RETURN_FORCE = 0.05;
const MAX_VELOCITY = 0.5;
const DOT_COLOR = 'rgba(255,255,255,0.5)';
const MOBILE_DOT_COLOR = 'rgba(255,255,255,0.32)';
const LINE_COLOR = 'rgba(255,255,255,';
const MOUSE_LINE_COLOR = 'rgba(201,168,76,';
// sichqoncha ortidan butun tarmoq sekin suriladi (parallax)
const PARALLAX_STRENGTH = 22;
const PARALLAX_EASE = 0.045;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationId = 0;
    const mouse = { x: 0, y: 0, active: false };
    const parallax = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const isMobile = () => width < MOBILE_BREAKPOINT;

    const createParticles = () => {
      const count = isMobile()
        ? Math.round(PARTICLE_COUNT * MOBILE_PARTICLE_RATIO)
        : PARTICLE_COUNT;
      particles = Array.from({ length: count }, () => {
        const vx = (Math.random() - 0.5) * PARTICLE_SPEED;
        const vy = (Math.random() - 0.5) * PARTICLE_SPEED;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
        };
      });
    };

    const resize = () => {
      // navbar balandligi — animatsiya uning ostidan boshlanadi
      const nav = document.querySelector('nav');
      const navHeight = nav ? nav.getBoundingClientRect().height : 0;
      canvas.style.top = `${navHeight}px`;

      width = parent.clientWidth;
      height = Math.max(parent.clientHeight - navHeight, 0);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      parallax.x += (parallax.targetX - parallax.x) * PARALLAX_EASE;
      parallax.y += (parallax.targetY - parallax.y) * PARALLAX_EASE;
      ctx.save();
      ctx.translate(parallax.x, parallax.y);

      for (const p of particles) {
        // sichqoncha yaqinlashsa — itariladi, uzoqlashsa asl tezligiga qaytadi
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy) || 1;
          if (mdist < MOUSE_RADIUS) {
            const force = (1 - mdist / MOUSE_RADIUS) * MOUSE_PUSH;
            p.vx += (mdx / mdist) * force * 10;
            p.vy += (mdy / mdist) * force * 10;
          }
        }

        p.vx += (p.baseVx - p.vx) * RETURN_FORCE;
        p.vy += (p.baseVy - p.vy) * RETURN_FORCE;

        p.vx = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, p.vx));
        p.vy = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, p.vy));

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) {
          p.vx *= -1;
          p.baseVx *= -1;
          p.x = Math.max(0, Math.min(width, p.x));
        }
        if (p.y < 0 || p.y > height) {
          p.vy *= -1;
          p.baseVy *= -1;
          p.y = Math.max(0, Math.min(height, p.y));
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const linkDistance = isMobile() ? MOBILE_LINK_DISTANCE : LINK_DISTANCE;
          if (dist < linkDistance) {
            const alpha = isMobile() ? MOBILE_LINE_ALPHA : LINE_ALPHA;
            const opacity = (1 - dist / linkDistance) * alpha;
            ctx.strokeStyle = `${LINE_COLOR}${opacity})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // kursorga tortilgan oltin chiziqlar
      if (mouse.active) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const opacity = (1 - dist / MOUSE_RADIUS) * 0.22;
            ctx.strokeStyle = `${MOUSE_LINE_COLOR}${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        let radius = isMobile() ? 1.1 : 1.4;
        let color = isMobile() ? MOBILE_DOT_COLOR : DOT_COLOR;
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const closeness = 1 - dist / MOUSE_RADIUS;
            radius = 1.4 + closeness * 0.9;
            color = `rgba(201,168,76,${0.5 + closeness * 0.35})`;
          }
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animationId = requestAnimationFrame(step);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active =
        mouse.x >= 0 && mouse.x <= rect.width && mouse.y >= 0 && mouse.y <= rect.height;
      parallax.targetX = (mouse.x / rect.width - 0.5) * -PARALLAX_STRENGTH;
      parallax.targetY = (mouse.y / rect.height - 0.5) * -PARALLAX_STRENGTH;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      parallax.targetX = 0;
      parallax.targetY = 0;
    };

    resize();
    step();

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 right-0 top-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
