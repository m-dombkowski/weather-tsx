/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      "300px": "300",
    },
    maxWidth: {
      "500px": "500",
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
    extend: {
      colors: {
        blueishBorder: "#666eff",
        grayBg: "#666666",
      },

      backgroundColor: {
        dark: "#1a1a1a",
      },
    },
  },
  plugins: [],
};
