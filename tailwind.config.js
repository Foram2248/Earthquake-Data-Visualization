/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#282736",
        accent: "#00D852",
        secondary: "#5E5E6C",
      },
    },
  },
  plugins: [],
};
