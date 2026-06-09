import React, { useEffect, useRef } from "react";
// @ts-ignore
import cubesBg from "../assets/images/cubes_background_1781008913188.png";

interface Minimalistic3DBackgroundProps {
  themeName: string;
}

export function Minimalistic3DBackground({ themeName }: Minimalistic3DBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Track mouse coordinates for interactive parallax shift
    const handleMouseMove = (e: MouseEvent) => {
      const scaleX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const scaleY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouseRef.current.targetX = scaleX * 40; // Shift range
      mouseRef.current.targetY = scaleY * 40;
    };
    window.addEventListener("mousemove", handleMouseMove as any);

    // Setup 3D objects (nodes with X, Y, Z coordinates)
    const points: Array<{ x: number; y: number; z: number; size: number }> = [];
    const pointCount = 45;
    
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        z: (Math.random() - 0.5) * 800,
        size: Math.random() * 2 + 1,
      });
    }

    // Connect some points together to draw neat 3D constellation structures
    const connections: Array<[number, number]> = [];
    for (let i = 0; i < pointCount; i++) {
      // Connect to nearest 2 nodes
      const distances = points
        .map((p, idx) => ({
          idx,
          dist: Math.hypot(points[i].x - p.x, points[i].y - p.y, points[i].z - p.z),
        }))
        .filter((item) => item.idx !== i)
        .sort((a, b) => a.dist - b.dist);

      if (distances[0] && Math.random() > 0.3) {
        connections.push([i, distances[0].idx]);
      }
      if (distances[1] && Math.random() > 0.6) {
        connections.push([i, distances[1].idx]);
      }
    }

    // Gentle global rotation rates
    const rotXSpeed = 0.0006;
    const rotYSpeed = 0.0008;
    const rotZSpeed = 0.0004;

    const focalLength = 400; // Focal length for 3D projection

    // Setup colors based on active branding presets
    const getColors = () => {
      const isBento = themeName === "bento-blue";
      if (isBento) {
        return {
          pointColor: "rgba(59, 130, 246, 0.45)", // Blue
          lineColor: "rgba(37, 99, 235, 0.09)",
          glowColor: "rgba(59, 130, 246, 0.02)",
        };
      } else if (themeName === "premium-dark" || themeName === "gold-bronze") {
        return {
          pointColor: "rgba(245, 158, 11, 0.4)", // Amber Gold
          lineColor: "rgba(217, 119, 6, 0.08)",
          glowColor: "rgba(245, 158, 11, 0.02)",
        };
      } else {
        return {
          pointColor: "rgba(16, 185, 129, 0.35)", // Emerald
          lineColor: "rgba(5, 150, 105, 0.07)",
          glowColor: "rgba(16, 185, 129, 0.02)",
        };
      }
    };

    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    // Rendering loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp mouse shift for organic damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Dynamically apply a high-performance 3D transform to the background image layer
      if (imageContainerRef.current) {
        const tx = -mouseRef.current.x * 0.3; // subtle translate drift
        const ty = -mouseRef.current.y * 0.3;
        const rx = -mouseRef.current.y * 0.04; // subtle 3D rotational tilt
        const ry = mouseRef.current.x * 0.04;
        imageContainerRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.06) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }

      const colors = getColors();

      // Accumulate automatic rotations
      rotX += rotXSpeed;
      rotY += rotYSpeed;
      rotZ += rotZSpeed;

      // Project and collect current 2D screen coordinates of each 3D point
      const projectedPoints = points.map((p) => {
        // Rotate around X-axis
        let x1 = p.x;
        let y1 = p.y * Math.cos(rotX) - p.z * Math.sin(rotX);
        let z1 = p.y * Math.sin(rotX) + p.z * Math.cos(rotX);

        // Rotate around Y-axis
        let x2 = x1 * Math.cos(rotY) + z1 * Math.sin(rotY);
        let y2 = y1;
        let z2 = -x1 * Math.sin(rotY) + z1 * Math.cos(rotY);

        // Rotate around Z-axis
        let x3 = x2 * Math.cos(rotZ) - y2 * Math.sin(rotZ);
        let y3 = x2 * Math.sin(rotZ) + y2 * Math.cos(rotZ);
        let z3 = z2;

        // Perspective projection with focal point
        const scale = focalLength / (focalLength + z3 + 500); // offset depth to avoid zero division
        const screenX = width / 2 + x3 * scale + mouseRef.current.x * (scale * 2);
        const screenY = height / 2 + y3 * scale + mouseRef.current.y * (scale * 2);

        return {
          x: screenX,
          y: screenY,
          visible: z3 + 500 > 0,
          scale,
        };
      });

      // Draw Connection lines first (back of stack)
      ctx.lineWidth = 0.8;
      connections.forEach(([p1Idx, p2Idx]) => {
        const pt1 = projectedPoints[p1Idx];
        const pt2 = projectedPoints[p2Idx];

        if (pt1.visible && pt2.visible) {
          // Fade connection weight based on average depth scale
          ctx.strokeStyle = colors.lineColor;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.stroke();
        }
      });

      // Draw Points as glossy 3D spheres/halos
      projectedPoints.forEach((pt, i) => {
        if (!pt.visible) return;

        const size = points[i].size * pt.scale * 1.5;

        // Glowing outer halo
        ctx.fillStyle = colors.glowColor;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size * 5, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = colors.pointColor;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove as any);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeName]);

  return (
    <>
      {/* 3D background image layer with interactive depth */}
      <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none bg-[#070709]">
        <div 
          ref={imageContainerRef}
          className="absolute inset-0 w-full h-full opacity-35"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
            willChange: "transform"
          }}
        >
          <img
            src={cubesBg}
            alt="3D Holographic Cube Grid"
            className="w-full h-full object-cover scale-[1.08] origin-center pointer-events-none select-none filter brightness-90 contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Floating 3D particle/constellation overlays */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-transparent"
      />
    </>
  );
}
