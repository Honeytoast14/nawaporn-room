/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-black": "#3E3E3E",
        "main-green": "#E1ECB2",
        "main-yellow": "#FFF4CA",
        "main-pink": "#F6D3D4",
        "main-white": "#FFF9F6",
      },
      fontFamily: {
        "dm-sans": ['"DM Sans"', "sans-serif"],
      },
      animation: {
        shake: "shake 0.45s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
