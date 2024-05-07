"use client";

import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

import { useHeadingsObserver } from "../_hooks/useHeadingObserver";
import type { TableOfContent } from "#/types";

interface Props {
  tableOfContents: TableOfContent[];
}

const PostTOC: React.FC<Props> = ({ tableOfContents }) => {
  const activeId = useHeadingsObserver({
    query: "h2, h3",
    headings: tableOfContents.flatMap(({ link, subSections }) => [
      link,
      ...subSections.flatMap(({ link }) => link),
    ]),
  });

  return (
    <div className="mb-4 border-l py-2">
      <div className="mb-1 px-4 font-bold">목차</div>
      <ul>
        {tableOfContents.map((toc) => {
          const isIntersecting =
            activeId === toc.link ||
            toc.subSections.some(({ link }) => link === activeId);

          return (
            <li key={toc.link} className="space-y-1.5 py-1.5 transition">
              <div className="relative">
                <Link
                  href={toc.link}
                  className={twMerge(
                    "px-4 text-sm font-bold hover:text-main-400",
                    isIntersecting && "font-bold text-main-600",
                  )}
                >
                  {toc.text}
                </Link>
                {toc.link === activeId && <ActiveLine />}
              </div>

              <ul className="space-y-0.5 text-xs font-semibold">
                {toc.subSections.map(({ link, text }) => (
                  <li key={link}>
                    <Link
                      href={link}
                      className={twMerge(
                        "relative flex items-center gap-1 rounded-sm py-0.5 pl-6 pr-4 transition-colors hover:text-main-400",
                        link === activeId && "text-main-400",
                      )}
                    >
                      <ChevronRightIcon className="h-3 w-3" />
                      <span>{text}</span>
                      {link === activeId && <ActiveLine />}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostTOC;

const ActiveLine = () => (
  <motion.div
    className="absolute -left-[1px] top-0 h-full w-1 bg-main-500"
    layoutId="toc-focus-line"
  />
);
