/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      maxWidth: {
        content: "1350px",
        container: "1400px",
      },
      colors: {
        background: "#101011",
        coffee: {
          primary: "#BA8039",
          text: "#938E8E",
          title: "#D3AD7F",
          description: "#909090",
        },
        badge: {
          arabic: "#77A9B0",
          robusta: "#3A383D",
        },
        filter: {
          bg: "#383838",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        display: ["var(--font-bebas)", "sans-serif"],
      },
      height: {
        header: "100px",
        banner: "932px",
      },
      fontSize: {
        banner: ["130px", "130px"],
        subtitle: ["20px", "30px"],
        "coffee-title": ["24px", "normal"],
        "coffee-description": ["16px", "normal"],
        "coffee-price": ["20px", "normal"],
        "section-title": ["50px", "normal"],
      },
      gap: {
        coffee: "30px",
        "coffee-y": "40px",
      },
      spacing: {
        "section-top": "180px",
        "filters-top": "50px",
      },
    },
  },
  plugins: [],
};
