"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface InteractiveParticlesProps {
  className?: string;
  quantity?: number;
  particleColor?: string;
}

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkle: number;
  layerSpeed: number;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
};

const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({
  className,
  quantity = 140,
  particleColor = "rgba(255, 255, 255, 0.95)",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastSpawnRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  const createStars = useCallback((width: number, height: number) => {
    starsRef.current = Array.from({ length: quantity }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.4 + Math.random() * (depth > 0.75 ? 1.8 : 1.1),
        alpha: 0.2 + Math.random() * 0.7,
        twinkle: Math.random() * Math.PI * 2,
        layerSpeed: 0.04 + depth * 0.16,
      };
    });
  }, [quantity]);

  const spawnShootingStar = useCallback((width: number, height: number) => {
    const startX = width * (0.15 + Math.random() * 0.7);
    const startY = -30 - Math.random() * 100;
    const speed = 9 + Math.random() * 6;
    const angle = (25 + Math.random() * 18) * (Math.PI / 180);
    shootingStarsRef.current.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 52 + Math.floor(Math.random() * 22),
      length: 90 + Math.random() * 90,
    });

    if (shootingStarsRef.current.length > 5) {
      shootingStarsRef.current.shift();
    }
  }, []);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    sizeRef.current = { width, height, dpr };

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createStars(width, height);
    shootingStarsRef.current = [];
    lastSpawnRef.current = performance.now();
  }, [createStars]);

  const draw = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = sizeRef.current;
    const t = time * 0.001;

    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, "rgba(0, 0, 0, 0.96)");
    bg.addColorStop(0.45, "rgba(2, 6, 18, 0.93)");
    bg.addColorStop(1, "rgba(0, 0, 0, 0.97)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    const nebula1 = ctx.createRadialGradient(
      width * 0.2,
      height * 0.18,
      0,
      width * 0.2,
      height * 0.18,
      Math.min(width, height) * 0.5,
    );
    nebula1.addColorStop(0, "rgba(56, 189, 248, 0.07)");
    nebula1.addColorStop(1, "rgba(56, 189, 248, 0)");
    ctx.fillStyle = nebula1;
    ctx.fillRect(0, 0, width, height);

    const nebula2 = ctx.createRadialGradient(
      width * 0.78,
      height * 0.74,
      0,
      width * 0.78,
      height * 0.74,
      Math.min(width, height) * 0.6,
    );
    nebula2.addColorStop(0, "rgba(139, 92, 246, 0.05)");
    nebula2.addColorStop(1, "rgba(139, 92, 246, 0)");
    ctx.fillStyle = nebula2;
    ctx.fillRect(0, 0, width, height);

    for (const star of starsRef.current) {
      star.y += star.layerSpeed * 0.09;
      if (star.y > height + 2) star.y = -2;

      const twinkle = 0.55 + 0.45 * Math.sin(t * 1.8 + star.twinkle);
      ctx.globalAlpha = star.alpha * twinkle;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.shadowColor = "rgba(186, 230, 253, 0.65)";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.closePath();
    }

    const now = performance.now();
    if (now - lastSpawnRef.current > 1200 + Math.random() * 1200) {
      spawnShootingStar(width, height);
      lastSpawnRef.current = now;
    }

    const alive: ShootingStar[] = [];
    for (const shot of shootingStarsRef.current) {
      shot.life += 1;
      shot.x += shot.vx;
      shot.y += shot.vy;

      if (
        shot.life < shot.maxLife &&
        shot.x < width + 200 &&
        shot.y < height + 160
      ) {
        alive.push(shot);
      }

      const lifeT = 1 - shot.life / shot.maxLife;
      const tailX = shot.x - shot.vx * (shot.length / 18);
      const tailY = shot.y - shot.vy * (shot.length / 18);
      const grad = ctx.createLinearGradient(shot.x, shot.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * lifeT})`);
      grad.addColorStop(0.35, `rgba(125, 211, 252, ${0.45 * lifeT})`);
      grad.addColorStop(1, "rgba(125, 211, 252, 0)");

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.7;
      ctx.lineCap = "round";
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(shot.x, shot.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
      ctx.closePath();
    }
    shootingStarsRef.current = alive;

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(draw);
  }, [particleColor, spawnShootingStar]);

  useEffect(() => {
    setupCanvas();
    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => setupCanvas();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw, setupCanvas]);

  return <canvas ref={canvasRef} className={cn("absolute inset-0 z-0", className)} />;
};

export default InteractiveParticles;
