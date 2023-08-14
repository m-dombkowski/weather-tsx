/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      "300px": "300px",
    },
    maxWidth: {
      "500px": "500px",
    },
    width: {
      "296px": "296px",
      "300px": "300px",
    },
    height: {
      "50px": "50px",
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
        darkGrayBg: "#313131",
        veryDarkBg: "#1a1a1a",
      },
      backgroundColor: {
        dark: "#1a1a1a",
      },
    },
  },
  plugins: [],
};
