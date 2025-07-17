import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

interface Point {
  x: number;
  y: number;
  alpha: number;
  lastActiveTime: number;
}

export const GridInteraction = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const [intersections, setIntersections] = useState<Point[]>([]);
  const animationFrameRef = useRef<number>(0);
  
  // Effect for handling resize and initial setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const generateIntersections = () => {
      const gridSize = 40; // Size of grid cells
      const points: Point[] = [];
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      for (let x = gridSize; x < width; x += gridSize) {
        for (let y = gridSize; y < height; y += gridSize) {
          points.push({ x, y, alpha: 0, lastActiveTime: 0 });
        }
      }
      return points;
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      // Only update intersections when canvas is resized
      setIntersections(generateIntersections());
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial setup

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []); // Only run on mount

  // Effect for animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 79, 0, 0.1)'; // Faded orange
      ctx.lineWidth = 1;
      
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const gridSize = 40;

      // Vertical lines
      for (let x = gridSize; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = gridSize; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw intersection points
      intersections.forEach(point => {
        const currentMousePos = mousePosRef.current;
        if (currentMousePos) {
          const distance = Math.sqrt(
            Math.pow(point.x - currentMousePos.x, 2) + 
            Math.pow(point.y - currentMousePos.y, 2)
          );
            
            // Calculate target alpha based on distance
            const targetAlpha = distance < 80 ? Math.max(0, 0.8 - distance / 80) : 0;
            const currentTime = performance.now();
            
            if (targetAlpha > 0) {
              // Point is becoming active
              point.alpha = targetAlpha;
              point.lastActiveTime = currentTime;
            } else {
              // Point is inactive, check if we should start fading
              const timeSinceActive = currentTime - point.lastActiveTime;
              // console.log('timeSinceActive: ', timeSinceActive);
              if (timeSinceActive > 300) { // 3 seconds = 1000ms
                // Start fading out over 10 seconds (600 frames at 60fps)
                point.alpha = Math.max(0, point.alpha - (1 / 600));
              }
            }
          } else {
            // No mouse interaction, check if we should start fading
            const currentTime = performance.now();
            const timeSinceActive = currentTime - point.lastActiveTime;
              // console.log('timeSinceActive: ', timeSinceActive);
            if (timeSinceActive > 300) { // 3 seconds = 1000ms
              // console.log('point.lastActiveTime: ', point.lastActiveTime, point.alpha);
              // Start fading out over 10 seconds (600 frames at 60fps)
              point.alpha = Math.max(0, point.alpha - (1 / 600));
            }
          }

                  if (point.alpha > 0) {
            // Draw highlighted cross at intersection
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 79, 0, ${point.alpha})`;
            ctx.lineWidth = 2;

            // Calculate line length based on distance to mouse (if mouse is present)
            let lineLength = 20;
            if (currentMousePos) {
              const distanceToMouse = Math.sqrt(
                Math.pow(point.x - currentMousePos.x, 2) + 
                Math.pow(point.y - currentMousePos.y, 2)
              );
              if (distanceToMouse < 80) {
                lineLength = 20 + (20 * (1 - distanceToMouse / 80));
              }
            }

            // Draw vertical line segment
            ctx.moveTo(point.x, point.y - lineLength);
            ctx.lineTo(point.x, point.y + lineLength);
            
            // Draw horizontal line segment
            ctx.moveTo(point.x - lineLength, point.y);
            ctx.lineTo(point.x + lineLength, point.y);
            
            ctx.stroke();
          }
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [intersections]); // Only depend on intersections array

  return (
    <GridContainer>
      <Canvas ref={canvasRef} />
    </GridContainer>
  );
};

export default GridInteraction; 