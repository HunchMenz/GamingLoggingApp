/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        highlight: "#9747FF",
        selected: "#BD89FF",
        hovered: "#1ABCFE",
        dropdown: "#4A52FF",
        dark: "#0193FF",
      },
      textDecorationThickness: {
        6: "6px",
      },
      height: {
        128: "32rem",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },
};
