import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F8F6F1",
        "smoked-blue": "#36566A",
        sage: "#A7BAAC",
        champagne: "#E3D5BE",
        ink: "#293A43",
      },
      fontFamily: {
        heebo: ["var(--font-heebo)", "sans-serif"],
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
