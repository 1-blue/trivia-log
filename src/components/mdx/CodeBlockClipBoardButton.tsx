"use client";

import { useRef, useState } from "react";
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

const CodeBlockClipBoardButton = () => {
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  /**
   * 클립보드 핸들러
   * `DOM`에 직접 접근하는 방법은 안좋지만 `<Pre />를 서버 컴포넌트로 만들기 위해서 사용
   */
  const onClipboard = () => {
    if (!buttonRef.current) return;
    const $pre = buttonRef.current.parentElement?.nextElementSibling;

    if (!$pre) return;
    navigator.clipboard.writeText($pre.textContent as string);

    setCopied(true);
    setTimeout(() => setCopied(false), 500);

    // TODO: Toast
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className="btn btn-square w-10 h-10 min-h-10 border-none bg-gray-500 hover:bg-gray-600 text-gray-100 opacity-50 relative top-2 right-2"
      onClick={onClipboard}
    >
      {copied ? (
        <ClipboardDocumentCheckIcon className="h-6 w-6" />
      ) : (
        <ClipboardDocumentIcon className="h-6 w-6" />
      )}
    </button>
  );
};

export default CodeBlockClipBoardButton;
