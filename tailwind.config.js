/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
       'highlight': '#9747FF',
       'selected': '#BD89FF', 
       'hover': '#1ABCFE'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake", "bumblebee", "cyberpunk", "light", "dark"],
  },
};
