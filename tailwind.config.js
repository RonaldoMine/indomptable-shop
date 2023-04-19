/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        futura: 'Futura',
        space: 'Space Grostek',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
