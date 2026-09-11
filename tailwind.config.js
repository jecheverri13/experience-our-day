/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        linen: {
          50: '#FDFBF8',
          100: '#FAF6F0',
          200: '#F3EBE0',
          300: '#E6D9C8',
          400: '#D4C4AD',
          500: '#B8A48A',
          600: '#9A8570',
          700: '#7A6B59',
          800: '#5A4E40',
          900: '#3D352C',
          950: '#1F1B17',
        },
        champagne: {
          DEFAULT: '#C8A96E',
          light: '#E2D4B3',
          dark: '#A08347',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['1.875rem', { lineHeight: '1.2' }],
        'display-sm': ['1.5rem', { lineHeight: '1.3' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-slow': 'fadeIn 1.4s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'slide-up-slow': 'slideUp 1s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'line-grow': 'lineGrow 1s ease-out forwards',
        'heart-beat': 'heartBeat 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        lineGrow: {
          '0%': { height: '0' },
          '100%': { height: '100%' },
        },
        heartBeat: {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.15)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
