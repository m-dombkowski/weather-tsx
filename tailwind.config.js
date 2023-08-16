/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    minWidth: {
      "120px": "120px",
      "300px": "300px",
    },
    maxWidth: {
      "500px": "500px",
    },
    width: {
      unset: "unset",
      "100px": "100px",
      "120px": "120px",
      "225px": "225px",
      "296px": "296px",
      "300px": "300px",
      "400px": "400px",
    },
    height: {
      "50px": "50px",
      "100vh": "100vh",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },

  extend: {
    colors: {
      blueishBorder: "#666eff",
    },
    backgroundColor: {
      grayBg: "#666666",
      darkGrayBg: "#313131",
      veryDarkBg: "#1a1a1a",
    },
    spacing: {
      "-65": "65px",
      40: "40px",
      46: "46px",
      48: "48px",
    },
  },

  plugins: [],
};
