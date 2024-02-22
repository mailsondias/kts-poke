/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        grass: '#08FEC3',
        poison: '#AF08FE',
        water: '#00A3FF',
        fire: '#FE0808',
        electric: '#FFB800',
        ground: '#85826E',
        fairy: '#FBA1EC',
        normal: '#C4C4C4',
        flying: '#5317FC',
        default: '#0E0E0E',
        bug: '#A6B91A',
        psychic: '#F95587',
        ice: '#96D9D6',
        fighting: '#C22E28',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
      },
    },
  },
  plugins: [],
}