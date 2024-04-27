"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface Props {
  path: string;
  greaterThanSmall?: boolean;
}

const NavBall: React.FC<Props> = ({ path, greaterThanSmall }) => {
  const pathname = usePathname();

  if (path !== pathname) return <></>;

  return (
    <motion.div
      layoutId={greaterThanSmall ? "gt-nav-ball" : "nav-ball"}
      className={twMerge(
        "h-2 w-2 rounded-full bg-current",
        greaterThanSmall && "absolute -top-1",
      )}
    />
  );
};

export default NavBall;
