import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/outline";

import type { File, Folder } from "#/types";

interface Props {
  folderOrFile: Folder | File;
  className?: string;
}

/** 재귀적으로 호출하는 컴포넌트에 들어온 값이 폴더인지 파일인지 구분하는 함수 ( 객체는 폴더, 문자열은 파일 ) */
const isFolder = (folderOrFile: Folder | File): folderOrFile is Folder =>
  typeof folderOrFile === "object";

const RecursiveFolderOrFile: React.FC<Props> = ({
  folderOrFile,
  className = "",
}) => {
  if (!isFolder(folderOrFile)) return null;

  return (
    <li
      className={twMerge(
        "relative bg-gray-500 pl-8 before:absolute before:left-3 before:top-0 before:h-[calc(100%-8px)] before:w-0.5 before:bg-current before:content-['']",
        className,
      )}
    >
      {Object.entries(folderOrFile).map(([key, value]) => (
        <React.Fragment key={key}>
          {isFolder(value) ? (
            // 폴더인 경우
            <>
              <div className="m-1 flex items-center gap-1.5 text-lg font-semibold">
                <FolderIcon className="h-5 w-5" />
                <span>{key}</span>
              </div>
              {/* 다음 폴더 or 파일 ( 재귀 ) */}
              <RecursiveFolderOrFile folderOrFile={value} />
            </>
          ) : (
            // 파일인 경우
            <div className="m-1 flex items-center gap-1">
              <DocumentIcon className="h-4 w-4" />
              <Link
                href={"/posts" + value}
                className="underline-offset-4 hover:font-semibold hover:text-main-400 hover:underline"
              >
                {key}
              </Link>
            </div>
          )}
        </React.Fragment>
      ))}
    </li>
  );
};

export default RecursiveFolderOrFile;
