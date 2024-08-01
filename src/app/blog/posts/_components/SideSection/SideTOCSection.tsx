"use client";

import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

import { useHeadingsObserver } from "../../_hooks/useHeadingObserver";
import type { ITableOfContent } from "#/types";

interface Props {
  tableOfContents: ITableOfContent[];
}

const SideTOCSection: React.FC<Props> = ({ tableOfContents }) => {
  const activeId = useHeadingsObserver({
    query: "h2, h3",
    headings: tableOfContents.flatMap(({ link, subSections }) => [
      link,
      ...subSections.flatMap(({ link }) => link),
    ]),
  });

  return (
    <section className="mb-4 rounded-md bg-gray-200 py-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
      <div className="mx-4 mb-2 flex items-center justify-between">
        <div className="text-base font-bold">책갈피</div>
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
      </div>
      <ul>
        {tableOfContents.map((toc) => {
          const isIntersecting =
            activeId === toc.link ||
            toc.subSections.some(({ link }) => link === activeId);

          return (
            <li key={toc.link} className="space-y-1.5 py-1.5 transition">
              <div className="relative flex">
                <Link
                  href={toc.link}
                  className={twMerge(
                    "px-6 text-sm font-bold hover:text-main-400",
                    isIntersecting && "font-bold text-main-500",
                  )}
                >
                  {toc.text}
                </Link>
                {toc.link === activeId && <ActiveBall />}
              </div>

              {toc.subSections.length > 0 && (
                <ul className="space-y-0.5 text-xs font-semibold">
                  {toc.subSections.map(({ link, text }) => (
                    <li key={link} className="flex">
                      <Link
                        href={link}
                        className={twMerge(
                          "relative flex items-center gap-1 rounded-sm py-0.5 pl-7 pr-4 transition-colors hover:text-main-400",
                          link === activeId && "text-main-400",
                        )}
                      >
                        <ChevronRightIcon className="h-3 w-3" />
                        <span>{text}</span>
                        {link === activeId && <ActiveBall />}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SideTOCSection;

const ActiveBall = () => (
  <motion.div
    className="absolute left-2 top-1.5 h-2 w-2 rounded-full bg-main-500"
    layoutId="toc-focus-line"
  />
);
