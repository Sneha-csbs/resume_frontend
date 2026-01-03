/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        amber: {
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        red: {
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}