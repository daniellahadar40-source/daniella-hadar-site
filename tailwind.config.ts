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
      fontSize: {
        display: ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-lg": ["3.25rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h2: ["1.75rem", { lineHeight: "1.25" }],
        h3: ["1.375rem", { lineHeight: "1.3" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        caption: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.03em" }],
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
