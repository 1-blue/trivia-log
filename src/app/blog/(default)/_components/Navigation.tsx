"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { ROUTES } from "#/constants";

const BLOG_ROUTE = ROUTES.find((route) => route.path === "/blog")!;
const BLOG_SUB_ROUTES = BLOG_ROUTE.subRoutes!;
const NAV_ROUTES = [{ ...BLOG_ROUTE, label: "포스팅" }, ...BLOG_SUB_ROUTES];

const Navigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <ul className="mx-auto my-8 flex max-w-7xl gap-4 border-b">
      {NAV_ROUTES.map(({ path, label, Outline, Solid }) => {
        const isCurrentPath = pathname === path;

        return (
          <li key={path}>
            <Link
              href={path}
              className="relative flex items-center gap-1 px-4 py-2"
            >
              {isCurrentPath ? (
                <Solid className="h-5 w-5 text-main-600" />
              ) : (
                <Outline className="h-5 w-5" />
              )}
              <span
                className={twMerge(
                  "font-semibold",
                  isCurrentPath && "font-bold text-main-600",
                )}
              >
                {label}
              </span>
              {isCurrentPath && (
                <motion.div
                  className="absolute -bottom-0.5 left-0 h-[3px] w-full bg-main-600"
                  layoutId="blog-nav-underline"
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navigation;
