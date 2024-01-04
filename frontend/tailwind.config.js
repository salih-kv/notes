/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "p-dark": "#202124",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
