import type { Config } from "tailwindcss";
import { spacing } from "tailwindcss/defaultTheme";
import daisyUI from "daisyui";

import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            "h1,h2,h3,h4": {
              "scroll-margin-top": spacing[32],
            },
          },
        },
      }),
    },
  },
  plugins: [daisyUI, typography],
  daisyui: {
    // dark와 light만 사용
    themes: false,
  },
};
export default config;
