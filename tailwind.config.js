/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1920px",
    },
    extend: {
      colors: {
        "main-black": "#3E3E3E",
        "main-green": "#E1ECB2",
        "main-yellow": "#FFF4CA",
        "main-pink": "#F6D3D4",
        "main-white": "#FFF9F6",
        second_white: "#F5EDE9",
      },
      fontFamily: {
        "dm-sans": ['"DM Sans"', "sans-serif"],
      },
      animation: {
        shake: "shake 0.45s cubic-bezier(.36,.07,.19,.97) both",
        typewriter: "typewriter 8s steps(25) forwards",
      },
      keyframes: {
        typewriter: {
          to: {
            left: "100%",
          },
        },
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
