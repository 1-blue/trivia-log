"use client";

import { ArrowUturnDownIcon } from "@heroicons/react/24/outline";

const ScrollBottomButton = () => {
  return (
    <ArrowUturnDownIcon
      role="button"
      className="my-side-button h-8 w-8 rounded-md p-1.5 transition-colors"
      onClick={() =>
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }
    />
  );
};

export default ScrollBottomButton;
