"use client";

import React, { useEffect, useRef, useMemo, useCallback, useState } from "react";

interface GridBackgroundProps {
  theme: "dark" | "light";
  cellSize?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const GridBackground = React.memo(({
  theme,
  cellSize = 30,
  width = "100%",
  height = "100%",
  className = "",
}: GridBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  // Mobil durumunu tespit et - useEffect içinde güvenli bir şekilde
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // İlk kontrol
    checkMobile();
    
    // Ekran boyutu değişince tekrar kontrol et
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Mobil cihazlar için optimize edilmiş değerler
  const optimizedCellSize = useMemo(() => {
    return isMobile ? cellSize * 1.5 : cellSize;
  }, [cellSize, isMobile]);
  
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const targetWidth = typeof width === 'number' ? width : parent.clientWidth;
    const targetHeight = typeof height === 'number' ? height : parent.clientHeight;

    // Mobil cihazlar için daha düşük DPI
    const dpr = isMobile ? Math.min(window.devicePixelRatio, 2) : (window.devicePixelRatio || 1);
    canvas.width = targetWidth * dpr;
    canvas.height = targetHeight * dpr;
    canvas.style.width = `${targetWidth}px`;
    canvas.style.height = `${targetHeight}px`;

    return dpr;
  }, [width, height, isMobile]);

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, timestamp: number) => {
    const isDark = theme === "dark";
    
    // Solid background color for the entire canvas
    ctx.fillStyle = isDark ? "#000000" : "#ffffff";
    ctx.fillRect(0, 0, width, height);
    
    // Draw a fixed center glow effect
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Very subtle pulse animation (only 2%)
    const time = timestamp / 1000;
    const pulseFactor = Math.sin(time * 0.3) * 0.02 + 1; // 2% pulse, slower
    const baseSize = 0.6 * Math.min(width, height); // 60% of the smaller dimension
    const animatedSize = baseSize * pulseFactor;
    
    // Create a radial gradient for the glow with indigo tones - INCREASED OPACITY
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, animatedSize
    );
    
    if (isDark) {
      // Indigo colors for dark theme - INCREASED OPACITY
      gradient.addColorStop(0, "rgba(79, 70, 229, 0.2)"); // indigo-600 with higher opacity
      gradient.addColorStop(0.5, "rgba(67, 56, 202, 0.15)"); // indigo-700 with higher opacity
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    } else {
      // Light mode colors (indigo tint)
      gradient.addColorStop(0, "rgba(199, 210, 254, 0.3)");
      gradient.addColorStop(0.5, "rgba(165, 180, 252, 0.15)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    }
    
    // Draw the glowing effect
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, animatedSize, 0, Math.PI * 2);
    ctx.fill();
  }, [theme]);

  const drawGridLines = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, dpr: number, timestamp: number) => {
    const isDark = theme === "dark";
    const time = timestamp / 3000; // Slower timing for more subtle movement
    
    // Grid spacing
    const gridSpacing = optimizedCellSize * dpr;

    // Full screen grid for better visibility
    const gridAreaTop = 0;
    const gridAreaHeight = height;
    const gridAreaLeft = 0;
    const gridAreaWidth = width;
    
    // Save the current context state for grid clipping
    ctx.save();
    ctx.beginPath();
    ctx.rect(gridAreaLeft, gridAreaTop, gridAreaWidth, gridAreaHeight);
    ctx.clip();
    
    // Calculate distance from center for each grid line for opacity
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Dikey çizgiler (vertical lines)
    for (let x = 0; x <= width; x += gridSpacing) {
      const distFromCenterX = Math.abs(x - centerX) / (width / 2);
      const opacityFactor = Math.max(0, 1 - distFromCenterX * 1.2);
      
      // Very subtle wave effect
      const waveAmplitude = 0.8 * dpr; // Slightly larger amplitude
      const waveFrequency = 0.02;
      const waveOffset = Math.sin(time + x * waveFrequency) * waveAmplitude;
      
      // Base opacity with position-based fading - INCREASED OPACITY
      const baseOpacity = isDark ? 0.4 : 0.6;
      const dynamicOpacity = baseOpacity * opacityFactor;
      
      // Line color with indigo tones
      ctx.strokeStyle = isDark 
        ? `rgba(99, 102, 241, ${dynamicOpacity})` // indigo-500 with increased opacity
        : `rgba(165, 180, 252, ${dynamicOpacity})`;
      
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + waveOffset, height);
      ctx.lineWidth = isMobile ? 0.4 * dpr : 0.6 * dpr; // Slightly thicker lines
      ctx.stroke();
    }

    // Yatay çizgiler (horizontal lines)
    for (let y = 0; y <= height; y += gridSpacing) {
      const distFromCenterY = Math.abs(y - centerY) / (height / 2);
      const opacityFactor = Math.max(0, 1 - distFromCenterY * 1.2);
      
      // Very subtle wave effect
      const waveAmplitude = 0.8 * dpr; // Slightly larger amplitude
      const waveFrequency = 0.02;
      const waveOffset = Math.sin(time + y * waveFrequency) * waveAmplitude;
      
      // Base opacity with position-based fading - INCREASED OPACITY
      const baseOpacity = isDark ? 0.4 : 0.6;
      const dynamicOpacity = baseOpacity * opacityFactor;
      
      // Line color with indigo tones
      ctx.strokeStyle = isDark 
        ? `rgba(99, 102, 241, ${dynamicOpacity})` // indigo-500 with increased opacity
        : `rgba(165, 180, 252, ${dynamicOpacity})`;
      
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y + waveOffset);
      ctx.lineWidth = isMobile ? 0.4 * dpr : 0.6 * dpr; // Slightly thicker lines
      ctx.stroke();
    }
    
    // Add grid points at intersections
    if (!isMobile) {
      for (let x = 0; x <= width; x += gridSpacing) {
        for (let y = 0; y <= height; y += gridSpacing) {
          const distFromCenterX = Math.abs(x - centerX) / (width / 2);
          const distFromCenterY = Math.abs(y - centerY) / (height / 2);
          const distFromCenter = Math.sqrt(distFromCenterX * distFromCenterX + distFromCenterY * distFromCenterY);
          
          if (distFromCenter < 1.0) { // Wider area for visible points
            const pointOpacity = Math.max(0, 1 - distFromCenter * 1.5) * 0.7; // Increased opacity
            const pointSize = 0.8 * dpr; // Larger point size
            
            ctx.fillStyle = isDark 
              ? `rgba(129, 140, 248, ${pointOpacity})` // indigo-400 with higher opacity
              : `rgba(129, 140, 248, ${pointOpacity})`;
            
            ctx.beginPath();
            ctx.arc(x, y, pointSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }
    
    // Restore the context state (removes the clipping)
    ctx.restore();
    
  }, [theme, optimizedCellSize, isMobile]);

  const animateCanvas = useCallback((timestamp: number) => {
    if (!timeRef.current) {
      timeRef.current = timestamp;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = updateCanvasSize() || 1;
    const { width, height } = canvas;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.scale(dpr, dpr);

    // Draw the scene with timestamp for animations
    drawBackground(ctx, width / dpr, height / dpr, timestamp);
    drawGridLines(ctx, width / dpr, height / dpr, dpr, timestamp);

    // Continue animation loop
    animationRef.current = requestAnimationFrame(animateCanvas);
  }, [drawBackground, drawGridLines, updateCanvasSize]);

  useEffect(() => {
    updateCanvasSize();
    
    // Start animation loop
    animationRef.current = requestAnimationFrame(animateCanvas);
    
    // Setup resize handler
    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup animation and event listeners
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [updateCanvasSize, animateCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className}`}
      style={{
        top: 0,
        left: 0,
        pointerEvents: 'none',
        background: theme === "dark" ? "#000" : "#fff",
      }}
    />
  );
});

GridBackground.displayName = 'GridBackground';

export default GridBackground;
