/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fib': 'repeat(10, auto)',
        'sorting': 'repeat(2, auto)',
        'list': '80px auto',
      },
      gridTemplateRows: {
        'list': 'auto 110px 56px',
      }
    },
  },
  plugins: [],
}

