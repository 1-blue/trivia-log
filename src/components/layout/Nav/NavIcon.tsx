"use client";

import { usePathname } from "next/navigation";

import { isPathMatching } from "#/libs/nav";

interface Props {
  path: string;
  outline: JSX.Element;
  solid: JSX.Element;
}

const NavIcon: React.FC<Props> = ({ path, outline, solid }) => {
  const pathname = usePathname();

  if (isPathMatching(pathname, path)) return solid;
  else return outline;
};

export default NavIcon;
