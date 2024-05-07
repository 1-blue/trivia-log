"use client";

import { usePathname } from "next/navigation";
import { LinkIcon } from "@heroicons/react/24/outline";

import useToastStore from "#/store/toast";

const CopyLinkButton = () => {
  const pathname = usePathname();
  const { openToast } = useToastStore();

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        window.document.location.origin + pathname,
      );
      openToast({ message: "게시글 링크를 복사했습니다.", type: "info" });
    } catch (error) {
      openToast({
        message: "게시글 링크를 복사에 실패했습니다.",
        type: "error",
      });
    }
  };

  return (
    <LinkIcon
      role="button"
      className="my-side-button h-8 w-8 rounded-md p-1.5 transition-colors"
      onClick={copyLink}
    />
  );
};

export default CopyLinkButton;
