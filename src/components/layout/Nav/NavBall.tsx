"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { isPathMatching } from "#/libs/nav";

interface Props {
  path: string;
  position?: "vertical" | "horizontal";
}

const ROOT_PATHNAME = "/";
const isRootPathname = (path: string) => path === ROOT_PATHNAME;

const NavBall: React.FC<Props> = ({ path, position = "vertical" }) => {
  const pathname = usePathname();
  const isVertical = useMemo(() => position === "vertical", [position]);

  if (!isPathMatching(pathname, path)) return <></>;

  return (
    <motion.div
      layoutId={isVertical ? "vertical-nav-ball" : "horizontal-nav-ball"}
      className={twMerge(
        "h-2 w-2 rounded-full bg-current",
        isVertical && "absolute top-0",
        isRootPathname(pathname) && "-top-1",
      )}
    />
  );
};

export default NavBall;
