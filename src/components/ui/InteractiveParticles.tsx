"use client";

import React, { useEffect, useRef, useCallback } from 'react';
import { cn } from "@/lib/utils";

interface InteractiveParticlesProps {
  className?: string;
  quantity?: number;
  particleColor?: string;
  lineColor?: string;
  lineDistance?: number;
  mouseInteractionDistance?: number;
  particleMinRadius?: number;
  particleMaxRadius?: number;
  particleMinSpeed?: number;
  particleMaxSpeed?: number;
  mouseAttractionForce?: number;
}

const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({
  className,
  quantity = 100, // Increased quantity for a richer sci-fi field
  particleColor = 'rgba(173, 216, 230, 0.8)', // Light blue/cyan for particles
  lineColor = 'rgba(173, 216, 230, 0.2)', // Fainter light blue for lines
  lineDistance = 120, // Max distance for lines between particles
  mouseInteractionDistance = 150, // Distance for mouse interaction
  particleMinRadius = 0.5,
  particleMaxRadius = 2.5,
  particleMinSpeed = 0.1,
  particleMaxSpeed = 0.7,
  mouseAttractionForce = 0.002, // Attraction force for mouse interaction
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles.current = [];
    for (let i = 0; i < quantity; i++) {
      const radius = Math.random() * (particleMaxRadius - particleMinRadius) + particleMinRadius;
      const speed = Math.random() * (particleMaxSpeed - particleMinSpeed) + particleMinSpeed;
      particles.current.push(new Particle(canvas.width, canvas.height, radius, particleColor, speed));
    }
  }, [quantity, particleColor, particleMinRadius, particleMaxRadius, particleMinSpeed, particleMaxSpeed]);

  const animateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.current.length; i++) {
      const p1 = particles.current[i];
      p1.update(mouse.current, mouseAttractionForce, canvas.width, canvas.height);
      p1.draw(ctx);

      // Draw lines between particles
      for (let j = i + 1; j < particles.current.length; j++) {
        const p2 = particles.current[j];
        const dist = p1.distanceTo(p2);
        if (dist < lineDistance) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1 - (dist / lineDistance); // Thicker lines closer
          ctx.stroke();
          ctx.closePath();
        }
      }

      // Draw lines to mouse if active and close
      if (mouse.current.active) {
        const distToMouse = p1.distanceTo(mouse.current);
        if (distToMouse < mouseInteractionDistance) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1 - (distToMouse / mouseInteractionDistance); // Thicker lines closer to mouse
          ctx.stroke();
          ctx.closePath();
        }
      }
    }

    animationFrameId.current = requestAnimationFrame(animateParticles);
  }, [lineDistance, lineColor, mouseInteractionDistance, mouseAttractionForce]);

  useEffect(() => {
    initCanvas();
    animationFrameId.current = requestAnimationFrame(animateParticles);

    const handleResize = () => initCanvas();
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    const handleMouseLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [initCanvas, animateParticles]);

  return (
    <canvas ref={canvasRef} className={cn("absolute inset-0 z-0", className)} />
  );
};

export default InteractiveParticles;

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  speed: number;
  maxSpeed: number; // Max speed to prevent infinite acceleration

  constructor(canvasWidth: number, canvasHeight: number, radius: number, color: string, speed: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    // Initial velocity based on speed, but random direction
    const angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.maxSpeed = speed * 5; // Allow some acceleration
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.radius * 2; // Subtle glow effect
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0; // Reset shadow blur for other drawings
  }

  update(mouse: { x: number; y: number; active: boolean }, mouseAttractionForce: number, canvasWidth: number, canvasHeight: number) {
    // Apply mouse attraction force
    if (mouse.active) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) { // Mouse interaction distance
        this.vx += dx * mouseAttractionForce;
        this.vy += dy * mouseAttractionForce;
      }
    }

    // Dampen velocity to prevent infinite acceleration and apply friction
    this.vx *= 0.99; // Slightly less aggressive dampening
    this.vy *= 0.99; // Slightly less aggressive dampening

    let currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy); // Declare once at the beginning

    // If speed is too low, give it a small random boost to ensure continuous movement
    if (currentSpeed < this.speed * 0.1) { // If speed drops below 10% of initial speed
      const angle = Math.random() * Math.PI * 2;
      this.vx += Math.cos(angle) * (this.speed * 0.05); // Add a small random velocity
      this.vy += Math.sin(angle) * (this.speed * 0.05);
      currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy); // Re-calculate speed after boost
    }

    // Limit speed
    if (currentSpeed > this.maxSpeed) {
      const ratio = this.maxSpeed / currentSpeed;
      this.vx *= ratio;
      this.vy *= ratio;
    }

    // Apply natural movement
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around boundary conditions
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
  }

  distanceTo(other: { x: number; y: number }): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
