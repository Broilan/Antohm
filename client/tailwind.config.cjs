/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "hsl(0, 0%, 18%)",
        secondary: "#e5e7eb",
        tertiary: "#E6E2DD",
        four: "#F2F2F2",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        blues: '#aeecfc',
        transBlack: "rgba(0, 0, 0, 0.1)"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
    keyframes: {
      shrink: {
        "0%": {scale: "100%"},
        "100%": {scale: "0%"}
      }
    },
    animation: {
      shrink: "shrink 0.5s ease-out normal"
    }
  },
  plugins: [
    require("tailwindcss-animation-delay"),
    require('flowbite/plugin')
  ],
};