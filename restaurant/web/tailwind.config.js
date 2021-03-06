const lineClampPlugin = require("@tailwindcss/line-clamp");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./features/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [lineClampPlugin],
};
