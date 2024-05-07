import type { Config } from "tailwindcss";
import twColors from "tailwindcss/colors";
import daisyUI from "daisyui";
import daisyUITheme from "daisyui/src/theming/themes";

const mainColor = twColors.blue;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
      backgroundColor: {
        // `dark`와 `light` 상관없이 사용할 수 있는 배경색
        all: "#87837826",
      },
    },
  },
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
            color: mainColor["400"],
          },
          // `<h1>` > `<a>`
          ".my-anchor-block": {
            "background-color": "#87837826",
            color: mainColor["400"],
          },
          // tag
          ".my-tag": {
            "background-color": mainColor["100"],
            color: mainColor["500"],
          },
          ".my-tag:hover": {
            "background-color": mainColor["200"],
          },
          // side-button
          ".my-side-button": {
            border: "1px solid " + twColors.gray["500"],
          },
          ".my-side-button:hover": {
            "background-color": twColors.gray["200"],
          },
        },
        dark: {
          ...daisyUITheme["dark"],
          // `<code>`
          ".my-code": {
            "background-color": "#87837826",
            color: mainColor["500"],
          },
          // `<h*>` > `<a>`
          ".my-anchor-block": {
            "background-color": "#87837826",
            color: mainColor["400"],
          },
          // tag
          ".my-tag": {
            "background-color": mainColor["200"],
            color: mainColor["600"],
          },
          ".my-tag:hover": {
            "background-color": mainColor["300"],
          },
          // side-button
          ".my-side-button": {
            border: "1px solid " + twColors.gray["500"],
          },
          ".my-side-button:hover": {
            "background-color": twColors.gray["100"],
          },
        },
      },
    ],
  },
};
export default config;
