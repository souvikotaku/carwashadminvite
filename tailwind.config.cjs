// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add your paths to your files here
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
