const plugin = require("tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
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
  },
  plugins: [],
};
