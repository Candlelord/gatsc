/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        'retro-bg': 'var(--retro-bg)',
        'retro-text': 'var(--retro-text)',
        'retro-accent': 'var(--retro-accent)',
      },
      fontFamily: {
        'vt323': ['VT323', 'monospace'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glitch: 'glitch 0.3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};