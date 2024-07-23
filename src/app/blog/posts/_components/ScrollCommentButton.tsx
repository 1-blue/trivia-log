"use client";

import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

// TODO:
const ScrollCommentButton = () => {
  return (
    <ChatBubbleLeftEllipsisIcon
      role="button"
      className="my-side-button h-8 w-8 rounded-md p-1.5 transition-colors"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    />
  );
};

export default ScrollCommentButton;
