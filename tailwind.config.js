/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        primary: '#3b82f6',
        secondary: '#a5f3fc',
        accent: '#818cf8',
        text: {
          primary: '#f8fafc',
          secondary: '#cbd5e1',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-raleway)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #3b82f6, 0 0 10px #3b82f6' },
          '100%': { textShadow: '0 0 10px #a5f3fc, 0 0 20px #a5f3fc' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'game-street': "url('/game-assets/background.png')",
      },
      boxShadow: {
        'neon': '0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6',
        'glow': '0 0 5px rgba(165, 243, 252, 0.5), 0 0 20px rgba(165, 243, 252, 0.3)',
      },
    },
  },
  plugins: [],
};
