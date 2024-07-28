"use client"

import { twMerge } from "tailwind-merge";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { motion, type Variants } from "framer-motion";

const variants: Variants = {
  initial: {},
  animate: {
    transition: { delayChildren: 0.2, staggerChildren: 0.3, type: "spring" },
  },
};

interface Props {
  title: string;
  defaultOpen?: boolean;
}

const Accordion: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  defaultOpen,
  children,
}) => {
  return (
    <section className="w-full">
      <div className="w-full rounded-xl bg-white p-2">
        <Disclosure defaultOpen={defaultOpen}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={twMerge(
                  "flex w-full items-center rounded-md bg-main-100 px-4 py-2 text-left text-sm font-medium text-main-900 transition-colors hover:bg-main-200 focus:outline-none focus-visible:ring focus-visible:ring-main-500 focus-visible:ring-opacity-75",
                  open &&
                    "bg-emerald-300 text-emerald-900 hover:bg-emerald-400 focus-visible:ring-emerald-600",
                )}
              >
                <span className="flex-1 text-center text-xl font-bold">
                  {title}
                </span>
                <ChevronUpIcon
                  className={twMerge("h-8 w-8", open && "rotate-180 transform")}
                />
              </Disclosure.Button>
              <Disclosure.Panel
                as={motion.div}
                initial="initial"
                animate="animate"
                variants={variants}
                className="flex flex-wrap justify-center gap-6 px-6 py-4 pb-2"
              >
                {children}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </section>
  );
};

export default Accordion;
