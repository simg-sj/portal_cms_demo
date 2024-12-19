/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': 'var(--color-main)',
        'main-light' : 'var(--color-main-light)',
        'main-lighter' : 'var(--color-main-lighter)',
        'sub' : 'var(--color-sub)',
        'sub-light' : 'var(--color-sub-light)',
        'sub-lighter' : 'var(--color-sub-lighter)',
      },
    },
  },
  plugins: [],

}