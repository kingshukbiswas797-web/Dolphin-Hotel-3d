/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0b0f',
        backgroundAlt: '#160821',
        gold: {
          400: '#f2c94c',
          500: '#d4af37',
        },
        neonPurple: '#9b30ff',
        neonTeal: '#2af5c1',
        brandRed: '#e3242b',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
