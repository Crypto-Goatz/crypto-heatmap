/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        accent: '#00F0FF',
        secondary: '#A7FF83',
        base: '#0f0f0f',
        surface: '#1a1a1a',
        textPrimary: '#f5f5f5',
        textSecondary: '#a0a0a0',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        neon: '0 0 10px rgba(0, 240, 255, 0.2)',
      }
    },
  },
  plugins: [],
}
