/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'clover-bg':      '#FAF7F1',
        'clover-nav':     '#FFF3EE',
        'clover-brand':   '#A75716',
        'clover-blob':    '#F5DBC0',
        'clover-footer':  '#F1D1B8',
        'clover-text':    '#3B3C37',
        'clover-dark':    '#252018',
        'clover-navtext': '#362E21',
        'clover-muted':   '#7D6E57',
      },
      fontFamily: {
        nerko:     ['"Nerko One"', 'cursive'],
        grotesk:   ['"Space Grotesk"', 'sans-serif'],
        anybody:   ['"Anybody"', 'cursive'],
        spinnaker: ['"Spinnaker"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
