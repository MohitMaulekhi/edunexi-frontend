"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const particleColors = [
  "#FF00FF",
  "#DA70D6",
  "#BA55D3",
  "#9400D3",
  "#1E90FF",
  "#4169E1",
  "#0000FF",
  "#4B0082",
];

const getRandomColor = () => {
  return particleColors[Math.floor(Math.random() * particleColors.length)];
};

const StarRing: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particleEmitters = useRef<Array<Array<any>>>([]);
  const innerStars = useRef<Array<{ x: number; y: number; size: number; color: string }>>([]);
  const fps = 120;
  const radius = 200;
  const numInnerStars = 150;
  const starSize = 3;

  const createParticles = () => {
    const numParticles = 2;
    let particles: Array<any> = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: Math.random() - 0.4 },
        alpha: 1,
        fadingSpeed: Math.random() * 0.03 + 0.005,
      });
    }

    return particles;
  };

  const createInnerStars = () => {
    let stars: Array<{ x: number; y: number; size: number; color: string }> = [];
    for (let i = 0; i < numInnerStars; i++) {
      stars.push({
        x: Math.random() * radius * 2 - radius,
        y: Math.random() * radius * 2 - radius,
        size: starSize,
        color: getRandomColor(),
      });
    }
    return stars;
  };

  const updateParticles = () => {
    for (let emitter of particleEmitters.current) {
      for (let particle of emitter) {
        particle.position.x += Math.random() * 2 - 1;
        particle.position.y -= particle.velocity.y;
        particle.alpha -= particle.fadingSpeed;

        if (particle.alpha < 0) {
          particle.position = { x: 0, y: 0 };
          particle.velocity = { x: 0, y: Math.random() - 0.4 };
          particle.alpha = 1;
          particle.fadingSpeed = Math.random() * 0.03 + 0.005;
        }
      }
    }
  };

  const renderParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particleEmitters.current.length; i++) {
      const emitter = particleEmitters.current[i];

      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate((i * Math.PI) / 180);

      for (let particle of emitter) {
        context.globalAlpha = particle.alpha;
        context.beginPath();
        context.arc(
          particle.position.x,
          radius - particle.position.y,
          starSize,
          0,
          Math.PI * 2
        );
        context.fillStyle = getRandomColor();
        context.fill();
        context.closePath();
      }

      context.restore();
    }

    innerStars.current.forEach((star) => {
      context.beginPath();
      context.arc(
        canvas.width / 2 + star.x,
        canvas.height / 2 + star.y,
        star.size,
        0,
        Math.PI * 2
      );
      context.fillStyle = star.color;
      context.fill();
      context.closePath();
    });
  };

  const animateInnerStars = () => {
    innerStars.current.forEach((star) => {
      gsap.to(star, {
        x: Math.random() * radius * 2 - radius,
        y: Math.random() * radius * 2 - radius,
        duration: Math.random() * 3 + 1,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasSize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight);
      canvas.width = size;
      canvas.height = size;
    };

    setCanvasSize();

    particleEmitters.current = Array.from({ length: 360 }, createParticles);
    innerStars.current = createInnerStars();

    animateInnerStars();

    const tick = () => {
      updateParticles();
      renderParticles();
    };

    gsap.ticker.add(tick);
    gsap.ticker.fps(fps);

    window.addEventListener("resize", setCanvasSize);

    // initial pop animation
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { scale: 0.1, opacity: 0, transformOrigin: "center center" },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
      );
    }

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]"
    >
      <canvas ref={canvasRef} className="blur-[1px] opacity-90" />
    </div>
  );
};

export default StarRing;
