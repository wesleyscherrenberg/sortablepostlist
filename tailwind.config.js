/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-primary": "#6356B0",
        "theme-success": "#16A349",
        "theme-secondary": "#27FE90",
        "theme-light": "#F6F6F6",
        "theme-danger": "#EF4444",
      }
    },

    container: {
      padding: "1rem",
      center: true
    }
  },
  plugins: [],
}

