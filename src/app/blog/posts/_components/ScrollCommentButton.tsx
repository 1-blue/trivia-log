"use client";

import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const ScrollCommentButton = () => {
  const scrollToComments = () => {
    const commentSection = document.getElementById("post-comment-section");
    commentSection?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <ChatBubbleLeftEllipsisIcon
      role="button"
      className="h-8 w-8 rounded-md border border-gray-500 p-1.5 transition-colors hover:border-gray-200 dark:hover:border-gray-100"
      onClick={scrollToComments}
    />
  );
};

export default ScrollCommentButton;
