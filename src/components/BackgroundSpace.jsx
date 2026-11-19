import React, { useEffect, useRef, useState } from 'react';

export default function BackgroundSpace({ bgImageUrl }) {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const defaultBg =
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80';
  const finalBg = bgImageUrl || defaultBg;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Starfield particles
    const starCount = Math.min(220, Math.floor((width * height) / 4500));
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.05 + 0.02,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      color: ['#ffffff', '#e0e7ff', '#fbcfe8', '#bae6fd', '#ddd6fe'][Math.floor(Math.random() * 5)],
    }));

    // Shooting stars
    const meteors = [];
    const spawnMeteor = () => {
      if (Math.random() < 0.015 && meteors.length < 3) {
        meteors.push({
          x: Math.random() * width * 1.2 - width * 0.1,
          y: Math.random() * (height * 0.5),
          length: Math.random() * 120 + 80,
          speed: Math.random() * 12 + 10,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          alpha: 1,
          decay: Math.random() * 0.02 + 0.012,
        });
      }
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Deep space subtle gradient wash with semi-transparency so student image is visible
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        width * 0.1,
        width * 0.5,
        height * 0.5,
        width * 0.9
      );
      bgGrad.addColorStop(0, 'rgba(10, 13, 37, 0.45)');
      bgGrad.addColorStop(0.5, 'rgba(7, 9, 25, 0.65)');
      bgGrad.addColorStop(1, 'rgba(5, 7, 17, 0.85)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render cosmic nebula dust spots
      const nebulae = [
        { x: width * 0.2, y: height * 0.25, r: width * 0.35, col: 'rgba(139, 92, 246, 0.09)' },
        { x: width * 0.85, y: height * 0.45, r: width * 0.4, col: 'rgba(236, 72, 153, 0.08)' },
        { x: width * 0.5, y: height * 0.85, r: width * 0.45, col: 'rgba(56, 189, 248, 0.08)' },
      ];
      nebulae.forEach((neb) => {
        const rad = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.r);
        rad.addColorStop(0, neb.col);
        rad.addColorStop(1, 'transparent');
        ctx.fillStyle = rad;
        ctx.fillRect(0, 0, width, height);
      });

      // Render stars with gentle twinkling
      stars.forEach((star) => {
        star.alpha += Math.sin(tick * star.twinkleSpeed) * 0.015;
        if (star.alpha > 0.95) star.alpha = 0.95;
        if (star.alpha < 0.2) star.alpha = 0.2;

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.shadowBlur = star.size > 1.2 ? 6 : 0;
        ctx.shadowColor = star.color;
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Render shooting stars
      spawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        grad.addColorStop(0.3, `rgba(167, 139, 250, ${m.alpha * 0.8})`);
        grad.addColorStop(0.7, `rgba(236, 72, 153, ${m.alpha * 0.4})`);
        grad.addColorStop(1, 'transparent');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= m.decay;

        if (m.alpha <= 0 || m.x > width + 200 || m.y > height + 200) {
          meteors.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const parallaxX = mousePos.x;
  const parallaxY = mousePos.y;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Professional Student Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={finalBg}
          alt="Professional Student Background"
          className="w-full h-full object-cover object-center filter saturate-[1.15] contrast-[1.1] brightness-[0.6] transition-transform duration-1000 ease-out"
          style={{
            transform: `translate3d(${parallaxX * -12}px, ${parallaxY * -12}px, 0) scale(1.05)`,
          }}
          onError={(e) => {
            e.target.src = defaultBg;
          }}
        />
        {/* Atmospheric Space Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050711]/80 via-[#050711]/60 to-[#050711]/92" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#050711_85%)]" />
        <div className="absolute inset-0 bg-purple-950/20 mix-blend-color" />
      </div>

      {/* Dynamic Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

      {/* 3D Floating Planets with Parallax */}

      {/* Planet 1: Main Purple-Pink Ringed Gas Giant (Top Right) */}
      <div
        className="absolute top-12 -right-16 md:right-12 lg:right-24 w-52 h-52 md:w-72 md:h-72 transition-transform duration-700 ease-out animate-float-slow z-20"
        style={{
          transform: `translate3d(${parallaxX * -25}px, ${parallaxY * -25}px, 0)`,
        }}
      >
        {/* Atmospheric Glow */}
        <div className="absolute inset-0 rounded-full bg-purple-600/30 blur-2xl animate-pulse-glow" />

        {/* Planet Sphere */}
        <div
          className="relative w-full h-full rounded-full shadow-2xl"
          style={{
            background: 'radial-gradient(circle at 32% 28%, #f472b6 0%, #a855f7 35%, #6b21a8 70%, #1e1035 95%)',
            boxShadow:
              'inset -25px -25px 50px rgba(0, 0, 0, 0.9), inset 15px 15px 30px rgba(255, 255, 255, 0.4), 0 0 50px rgba(168, 85, 247, 0.45)',
          }}
        >
          {/* Subtle Surface cloud band */}
          <div className="absolute inset-0 rounded-full opacity-30 bg-gradient-to-b from-transparent via-pink-400 to-transparent blur-[2px]" />

          {/* Planetary Ring */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[40%] rounded-[50%] border-4 border-pink-400/30 pointer-events-none"
            style={{
              transform: 'translate(-50%, -50%) rotate(-28deg)',
              boxShadow:
                '0 0 30px rgba(236, 72, 153, 0.4), inset 0 0 20px rgba(168, 85, 247, 0.3)',
              background:
                'radial-gradient(ellipse at center, transparent 58%, rgba(244, 114, 182, 0.25) 60%, rgba(168, 85, 247, 0.2) 75%, transparent 80%)',
            }}
          />
        </div>
      </div>

      {/* Planet 2: Cyan Ice Giant with Blue Atmosphere (Mid-Left) */}
      <div
        className="absolute top-[48%] -left-12 md:left-8 lg:left-16 w-36 h-36 md:w-52 md:h-52 transition-transform duration-700 ease-out animate-float-reverse z-20"
        style={{
          transform: `translate3d(${parallaxX * 35}px, ${parallaxY * 35}px, 0)`,
        }}
      >
        <div className="absolute inset-0 rounded-full bg-cyan-500/25 blur-xl animate-pulse-glow" />
        <div
          className="relative w-full h-full rounded-full shadow-2xl"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #7dd3fc 0%, #38bdf8 40%, #0284c7 75%, #082f49 95%)',
            boxShadow:
              'inset -20px -20px 40px rgba(0, 0, 0, 0.9), inset 12px 12px 25px rgba(255, 255, 255, 0.45), 0 0 45px rgba(56, 189, 248, 0.35)',
          }}
        >
          {/* Cyan planetary ring */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[145%] h-[32%] rounded-[50%] border-2 border-cyan-300/40"
            style={{
              transform: 'translate(-50%, -50%) rotate(22deg)',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.35)',
            }}
          />
        </div>
      </div>

      {/* Planet 3: Vibrant Magenta Dwarf (Bottom Right) */}
      <div
        className="absolute bottom-28 right-8 md:right-32 w-24 h-24 md:w-36 md:h-36 transition-transform duration-700 ease-out animate-float-slow z-20"
        style={{
          transform: `translate3d(${parallaxX * -45}px, ${parallaxY * -45}px, 0)`,
        }}
      >
        <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-lg" />
        <div
          className="relative w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #f472b6 0%, #db2777 50%, #831843 85%, #4c0519 100%)',
            boxShadow:
              'inset -12px -12px 25px rgba(0, 0, 0, 0.85), inset 8px 8px 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(236, 72, 153, 0.3)',
          }}
        />
      </div>

      {/* Planet 4: Deep Violet Moon (Top Left) */}
      <div
        className="absolute top-24 left-10 md:left-40 w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 ease-out opacity-80 z-20"
        style={{
          transform: `translate3d(${parallaxX * 20}px, ${parallaxY * 20}px, 0)`,
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #e9d5ff 0%, #a855f7 45%, #581c87 80%, #2e1065 100%)',
            boxShadow:
              'inset -8px -8px 16px rgba(0,0,0,0.9), inset 5px 5px 10px rgba(255,255,255,0.5), 0 0 20px rgba(168,85,247,0.3)',
          }}
        />
      </div>

      {/* Ambient Cosmic Horizon Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none z-10" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-10" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none z-10" />
    </div>
  );
}
