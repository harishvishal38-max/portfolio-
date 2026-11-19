/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          black: '#050711',
          dark: '#0a0e23',
          navy: '#0d1126',
          panel: 'rgba(13, 17, 38, 0.55)',
          panelHover: 'rgba(20, 27, 60, 0.7)',
          border: 'rgba(255, 255, 255, 0.12)',
          borderGlow: 'rgba(139, 92, 246, 0.4)',
        },
        primary: {
          DEFAULT: '#8B5CF6',
          glow: '#A78BFA',
          dark: '#6D28D9',
        },
        secondary: {
          DEFAULT: '#EC4899',
          glow: '#F472B6',
          dark: '#BE185D',
        },
        accent: {
          DEFAULT: '#38BDF8',
          glow: '#7DD3FC',
          dark: '#0284C7',
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #38BDF8 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'planet-pink': 'radial-gradient(circle at 30% 30%, #f472b6, #ec4899 50%, #831843 90%)',
        'planet-blue': 'radial-gradient(circle at 30% 30%, #38bdf8, #2563eb 55%, #0f172a 90%)',
        'planet-purple': 'radial-gradient(circle at 35% 30%, #c084fc, #7e22ce 60%, #3b0764 90%)',
        'planet-cyan': 'radial-gradient(circle at 30% 30%, #67e8f9, #0891b2 55%, #083344 90%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-glow': '0 8px 32px 0 rgba(139, 92, 246, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
        'glow-primary': '0 0 25px rgba(139, 92, 246, 0.4)',
        'glow-secondary': '0 0 25px rgba(236, 72, 153, 0.4)',
        'glow-accent': '0 0 25px rgba(56, 189, 248, 0.4)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'float-reverse 10s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 45s linear infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(18px) rotate(-3deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
