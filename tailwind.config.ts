import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "74": "74rem",
      },
      fontSize: {
        sm: [
          "0.875rem",
          {
            lineHeight: "1.4rem",
          },
        ],
        base: [
          "1rem",
          {
            lineHeight: "1.7rem",
          },
        ],
        "3xl": [
          "1.875rem",
          {
            lineHeight: "2.6rem",
          },
        ],
        "4xl": [
          "2.25rem",
          {
            lineHeight: "3rem",
          },
        ],
      },
    },
  },
  plugins: [],
}
export default config
