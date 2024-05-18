"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import {
  CommandLineIcon as SCommandLineIcon,
  MoonIcon as SMoonIcon,
  SunIcon as SSunIcon,
} from "@heroicons/react/24/solid";

import { THEMES } from "#/constants";

const ThemeDropdown: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="dropdown dropdown-end">
      <button type="button" tabIndex={0} className="btn btn-circle btn-ghost">
        {theme === "system" && <SCommandLineIcon className="h-7 w-7" />}
        {theme === "light" && <SSunIcon className="h-7 w-7" />}
        {theme === "dark" && <SMoonIcon className="h-7 w-7" />}
      </button>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] mt-1 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        {THEMES.map(({ label, value, Icon }) => (
          <li key={value} onClick={() => setTheme(value)}>
            <button type="button">
              <Icon
                className={twMerge(
                  "h-5 w-5",
                  value === theme && "fill-current",
                )}
              />
              <span>{label}</span>
              {value === theme && (
                <motion.div
                  layoutId="theme-ball"
                  className="h-2 w-2 rounded-full bg-current"
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeDropdown;
