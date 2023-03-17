/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        clear: "clear 1.5s ease-in-out",
        transformCard: 'transformCard 1s ease-in-out'
      },
      keyframes: {
        clear: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        transformCard: {
          "0%": { top: 0 },
          "50%": {  top:'-50%',opacity: 0 },
          "100%": { top: 0 },
        },
      },
    },
  },
  plugins: [],
};
