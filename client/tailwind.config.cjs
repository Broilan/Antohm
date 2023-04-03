/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./index.html",'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  "./dist/**/*.{html,js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}"
  ],
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
        Oswald: ["Oswald", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      '4xl': {'max': '1880px'},
      '3xl': {'max': '1675px'},
      '2xl': {'max': '1550px'},
      '1.5xl': {'max': '1455px'},
      'xl': {'max': '1275px'},
      'lg': {'max': '1024px'},
      'md': {'max': '880px'},
      'sm': {'max': '775px'},
      'xs': {'max': '625px'},
      '2xs': {'max': '475px'},
      '3xs': {'max': '375px'},
      '4xs': {'max': '300px'},
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
  ],
};