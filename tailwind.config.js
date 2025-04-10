// tailwind.config.js
module.exports = {
  darkMode: "class", // 👈 enables dark mode via class strategy
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 covers all relevant files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
