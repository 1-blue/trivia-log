"use client";

import React, { useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<Props> = ({ className, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    }
  };

  useEffect(adjustHeight, []);

  return (
    <textarea
      ref={textareaRef}
      className={twMerge("textarea textarea-bordered resize-none", className)}
      onInput={adjustHeight}
      {...props}
    />
  );
};

export default Textarea;
