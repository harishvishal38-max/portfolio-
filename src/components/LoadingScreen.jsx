import React from 'react';
import { Rocket, Sparkles } from 'lucide-react';

export default function LoadingScreen({ name = 'VISHAL M' }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050711] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-purple-600/20 blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/15 blur-[80px] pointer-events-none" />

      {/* Orbiting Orbital Rings */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-8">
        {/* Ring 1 */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/40 animate-spin-slow" />
        {/* Ring 2 */}
        <div
          className="absolute inset-2 rounded-full border-2 border-dashed border-pink-500/40 animate-spin"
          style={{ animationDuration: '8s', animationDirection: 'reverse' }}
        />
        {/* Ring 3 */}
        <div
          className="absolute inset-4 rounded-full border border-cyan-400/50 animate-spin"
          style={{ animationDuration: '4s' }}
        />

        {/* Center Glowing Planet Sphere */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 p-[2px] shadow-[0_0_25px_rgba(139,92,246,0.6)] animate-pulse-glow">
          <div className="w-full h-full rounded-full bg-[#070919] flex items-center justify-center">
            <Rocket className="w-7 h-7 text-cyan-300 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Title & Status */}
      <div className="text-center space-y-2 relative z-10">
        <h2 className="text-2xl font-black tracking-widest bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent">
          {name}
        </h2>
        <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-cyan-400/90 uppercase">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />
          <span>Syncing Space Matrix &bull; SQLite Active</span>
        </div>
      </div>

      {/* Loading Progress Bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 animate-shimmer" />
      </div>
    </div>
  );
}
