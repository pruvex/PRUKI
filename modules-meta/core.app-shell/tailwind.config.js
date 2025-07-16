/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./renderer/**/*.{js,ts,jsx,tsx}",
  ], // Tailwind v3+: Nur content-Array, keine purge mehr nötig
  theme: {
    extend: {},
  },
  plugins: [],
  // JIT ist ab Tailwind v3+ Standard, purge-Array entfällt

};
