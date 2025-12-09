const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.resolve(__dirname, '../../index.html'),
    path.resolve(__dirname, '../../src/**/*.{js,ts,jsx,tsx}'),
    path.resolve(__dirname, '../../src/demo/**/*.{js,ts,jsx,tsx}'),
    path.resolve(__dirname, '../../src/demo/components/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        'electric': {
          50: '#e6f1ff',
          100: '#b3d9ff',
          200: '#80c1ff',
          300: '#4da9ff',
          400: '#1a91ff',
          500: '#0079e6',
          600: '#0061b3',
          700: '#004980',
          800: '#00314d',
          900: '#00191a',
        },
      },
    },
  },
  plugins: [],
};
