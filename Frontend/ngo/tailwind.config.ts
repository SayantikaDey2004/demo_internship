/// <reference path="./types/tailwindcss-animate.d.ts" />
import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        ink: '#0f172a',
        muted: '#64748b',
        surface: '#ffffff',
        border: '#e2e8f0',
        primary: '#2563eb',
        accent: '#0f766e',
      },
      boxShadow: {
        soft: '0 16px 40px -28px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
