/** @type {import('tailwindcss').Config} */
export default {
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
        primary: {
          light: '#2EC4B6',
          DEFAULT: '#2EC4B6',
          dark: '#2EC4B6',
        },
      },
    },
    },
  plugins: [],
}
