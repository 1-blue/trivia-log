import type { Config } from "tailwindcss";
import { spacing } from "tailwindcss/defaultTheme";
import daisyUI from "daisyui";
import daisyUITheme from "daisyui/src/theming/themes";

import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
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
    themes: [
      {
        light: {
          ...daisyUITheme["light"],
          ".my-code": {
            "background-color": "#87837826",
            color: "#60a5fa",
          },
        },
        dark: {
          ...daisyUITheme["dark"],
          ".my-code": {
            "background-color": "#87837826",
            color: "#3b82f6",
          },
        },
      },
    ],
  },
};
export default config;
