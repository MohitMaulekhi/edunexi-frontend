"use client";

import { useEffect } from "react";
import { Renderer, Geometry, Program, Mesh, Triangle } from "ogl";

export default function LightRays({ containerId }: { containerId?: string }) {
  useEffect(() => {
    // Renderer create karo
    const renderer = new Renderer({ dpr: 2 });
    const gl = renderer.gl;

    // The newer `ogl` versions expose the canvas at renderer.gl.canvas.
    const canvas = (gl && (gl.canvas as HTMLCanvasElement)) || null;

    if (!canvas) {
      console.warn('LightRays: renderer.gl.canvas not available; skipping effect.')
      return
    }

    // default styles so it sits behind content in the container
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "-10";

    const container = containerId ? document.getElementById(containerId) : document.body;
    if (!container) {
      console.warn(`LightRays: container '${containerId}' not found; appending to document.body`)
      document.body.appendChild(canvas);
    } else {
      container.appendChild(canvas);
    }

    // Size set karo
    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", resize);
    resize();

    // Geometry (triangle covering full screen)
    const geometry = new Triangle(gl);

    // Shader Program
    const program = new Program(gl, {
      vertex: /* glsl */ `
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 0, 1);
        }
      `,
      fragment: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        void main() {
          float rays = sin(10.0 * vUv.x + uTime) * 0.5 + 0.5;
          float glow = smoothstep(0.4, 0.5, rays);
          gl_FragColor = vec4(vec3(glow), 1.0);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
      },
    });

    // Mesh
    const mesh = new Mesh(gl, { geometry, program });

    // Animate
    let time = 0;
    function update() {
      requestAnimationFrame(update);
      time += 0.05;
      program.uniforms.uTime.value = time;
      renderer.render({ scene: mesh });
    }
    update();

    return () => {
      window.removeEventListener("resize", resize);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return null;
}
