import type { Config } from "tailwindcss";
import { spacing } from "tailwindcss/defaultTheme";
import daisyUI from "daisyui";
import daisyUITheme from "daisyui/src/theming/themes";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  // theme: {
  //   extend: {
  //     typography: () => ({
  //       DEFAULT: {
  //         css: {
  //           "h1,h2,h3,h4": {
  //             "scroll-margin-top": spacing[32],
  //           },
  //         },
  //       },
  //     }),
  //   },
  // },
  plugins: [daisyUI],
  daisyui: {
    // dark와 light만 사용
    themes: [
      {
        light: {
          ...daisyUITheme["light"],
          // `<code>`
          ".my-code": {
            "background-color": "#87837826",
            color: "#60a5fa",
          },
          // `<h1>` > `<a>`
          ".my-anchor": {
            "background-color": "#87837826",
            color: "#60a5fa",
          },
        },
        dark: {
          ...daisyUITheme["dark"],
          // `<code>`
          ".my-code": {
            "background-color": "#87837826",
            color: "#3b82f6",
          },
          // `<h1>` > `<a>`
          ".my-anchor": {
            "background-color": "#87837826",
            color: "#60a5fa",
          },
        },
      },
    ],
  },
};
export default config;
