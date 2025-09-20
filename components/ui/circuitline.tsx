"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  closest?: Point[];
  active?: number;
}

const CircuitLine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const points = useRef<Point[]>([]);
  
  // FIX: Define the ref's type and add the missing properties to satisfy the Point interface
  const target = useRef<Point>({ x: 0, y: 0, originX: 0, originY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    target.current.x = window.innerWidth / 2;
    target.current.y = window.innerHeight / 2;

    const getDistance = (p1: Point, p2: Point): number => {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    };

    const findClosestPoints = () => {
      points.current.forEach(p1 => {
        const closest: Point[] = [];
        points.current.forEach(p2 => {
          if (p1 !== p2) {
            if (closest.length < 5) {
              closest.push(p2);
            } else {
              let maxDistance = 0;
              let maxIndex = 0;
              for (let i = 0; i < 5; i++) {
                const dist = getDistance(p1, closest[i]);
                if (dist > maxDistance) {
                  maxDistance = dist;
                  maxIndex = i;
                }
              }
              if (getDistance(p1, p2) < maxDistance) {
                closest[maxIndex] = p2;
              }
            }
          }
        });
        p1.closest = closest;
      });
    };

    const initPoints = () => {
      points.current = [];
      const stepX = window.innerWidth / 20;
      const stepY = window.innerHeight / 20;
      for (let x = 0; x < window.innerWidth; x += stepX) {
        for (let y = 0; y < window.innerHeight; y += stepY) {
          const px = x + Math.random() * stepX;
          const py = y + Math.random() * stepY;
          const p = { x: px, originX: px, y: py, originY: py };
          points.current.push(p);
        }
      }
      findClosestPoints();
    };
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    const drawLines = (p: Point) => {
      if (!p.active || !p.closest) return;
      ctx.beginPath();
      p.closest.forEach(closeP => {
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(closeP.x, closeP.y);
      });
      ctx.strokeStyle = `rgba(139, 92, 246, ${p.active})`;
      ctx.stroke();
    };
    
    let animationFrameId: number;
    const animatePoints = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      points.current.forEach(p => {
        const dist = getDistance(target.current, p);
        if (dist < 4000) p.active = 0.3;
        else if (dist < 20000) p.active = 0.1;
        else if (dist < 40000) p.active = 0.02;
        else p.active = 0;
        
        drawLines(p);
      });
      animationFrameId = requestAnimationFrame(animatePoints);
    };

    const shiftPoint = (p: Point) => {
      gsap.to(p, {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        duration: 1 + Math.random(),
        ease: 'circ.inOut',
        onComplete: () => shiftPoint(p),
      });
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    resizeCanvas();
    points.current.forEach(shiftPoint);
    animatePoints();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      gsap.killTweensOf(points.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};

export default CircuitLine;