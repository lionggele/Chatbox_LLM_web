/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/shadcn-ui/dist/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#215742",
      },
    },
  },
  plugins: [],
};

