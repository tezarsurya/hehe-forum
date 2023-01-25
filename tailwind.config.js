/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        veryLightGray: "#f5f6fa",
        lightGray: "#eaecf1",
        grayishBlue: "#67727e",
        darkBlue: "#324152",
        moderateBlue: "#5457b6",
        softRed: "#ed6469",
        lightGrayishBlue: "#c3c4ef",
        paleRed: "#ffb8bc",
      },
    },
  },
  plugins: [],
};
