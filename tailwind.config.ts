import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
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
  safelist: [{ pattern: /^pl-/ }],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
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
  plugins: [
    daisyUI,
    // 커스텀 스타일
    plugin(({ addUtilities }) => {
      addUtilities({
        ".section-style": {
          "@apply rounded-lg border px-6 py-8 border-gray-300 dark:border-gray-700":
            "",
        },
      });
    }),
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  daisyui: {
    // dark와 light만 사용
    themes: [
      {
        light: {
          ...daisyUITheme["light"],
          ".reverse": {
            "background-color": twColors.gray["200"],
            color: twColors.gray["700"],
          },
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
          // toc
          ".my-toc:hover": {
            "background-color": twColors.gray["200"],
          },
        },
        dark: {
          ...daisyUITheme["dark"],
          ".reverse": {
            "background-color": twColors.gray["700"],
            color: twColors.gray["200"],
          },
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
          // toc
          ".my-toc:hover": {
            "background-color": twColors.gray["600"],
          },
        },
      },
    ],
  },
};
export default config;
