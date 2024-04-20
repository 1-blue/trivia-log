"use client";

import { usePathname } from "next/navigation";

interface Props {
  path: string;
  outline: JSX.Element;
  solid: JSX.Element;
}

const NavIcon: React.FC<Props> = ({ path, outline, solid }) => {
  const pathname = usePathname();

  if (path === pathname) return solid;
  else return outline;
};

export default NavIcon;
