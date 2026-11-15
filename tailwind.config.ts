import type { Config } from "tailwindcss";
import typographyPlugin from "@tailwindcss/typography";

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
        assistant: ["var(--font-assistant)", "sans-serif"],
        serif: ["var(--font-suez)", "serif"],
      },
      fontSize: {
        display: ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-lg": ["3.25rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        h2: ["1.75rem", { lineHeight: "1.25" }],
        h3: ["1.375rem", { lineHeight: "1.3" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        caption: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.03em" }],
      },
      borderRadius: {
        card: "1.25rem",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#293A43",
            "--tw-prose-headings": "#293A43",
            "--tw-prose-links": "#36566A",
            "--tw-prose-bold": "#293A43",
            "--tw-prose-bullets": "#A7BAAC",
            "--tw-prose-hr": "#A7BAAC",
            "--tw-prose-quotes": "#293A43",
            "--tw-prose-quote-borders": "#A7BAAC",
            maxWidth: "none",
            a: { fontWeight: "600", textUnderlineOffset: "2px" },
            "h2, h3": { fontFamily: "var(--font-suez), serif", fontWeight: "400" },
          },
        },
      },
    },
  },
  plugins: [typographyPlugin],
};

export default config;
