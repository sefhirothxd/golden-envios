/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,jsx,ts,js}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'botton-blue': '#010066',
        sideblue: '#002c81',
        'top-blue': '#0c1540',
        'white-fondo': '#F1F1F1',
        'grey-ancla': '#7B7B7B',
      },
      spacing: {
        anchoGlobo: '100rem',
        altoGlobo: '80rem',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
