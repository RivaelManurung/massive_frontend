/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Pastikan Tailwind membaca semua file React
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // Tambahkan plugin DaisyUI
  ],
};
