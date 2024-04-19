"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import {
  CommandLineIcon as SCommandLineIcon,
  MoonIcon as SMoonIcon,
  SunIcon as SSunIcon,
} from "@heroicons/react/24/solid";

import { THEMES } from "#/contants";

const ThemeDropdown: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="dropdown dropdown-end">
      <button type="button" tabIndex={0} className="btn btn-ghost btn-circle">
        {theme === "system" && <SCommandLineIcon className="w-7 h-7" />}
        {theme === "light" && <SSunIcon className="w-7 h-7" />}
        {theme === "dark" && <SMoonIcon className="w-7 h-7" />}
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-1"
      >
        {THEMES.map(({ label, value, Icon }) => (
          <li key={value} onClick={() => setTheme(value)}>
            <button type="button">
              <Icon
                className={twMerge(
                  "w-5 h-5",
                  value === theme && "fill-current"
                )}
              />
              <span>{label}</span>
              {value === theme && (
                <motion.div
                  layoutId="theme-ball"
                  className="w-2 h-2 rounded-full bg-current"
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