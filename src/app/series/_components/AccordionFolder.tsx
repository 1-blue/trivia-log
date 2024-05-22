"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { FolderIcon } from "@heroicons/react/24/outline";

import type { File, Folder as FolderType } from "#/types";

import RecursiveFolderOrFile from "./RecursiveFolderOrFile";

interface Props {
  folderKey: string;
  folderValue: FolderType | File;
}

const AccordionFolder: React.FC<Props> = ({ folderKey, folderValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = () => setIsOpen((prev) => !prev);

  return (
    <li className="collapse collapse-arrow rounded-md bg-gray-600/50">
      <input type="checkbox" checked={isOpen} onChange={handleChange} />
      <div className="collapse-title flex items-center gap-1.5 text-lg font-semibold">
        <FolderIcon className="h-5 w-5" />
        <span>{folderKey}</span>
      </div>
      <RecursiveFolderOrFile
        folderOrFile={folderValue}
        className={twMerge(
          "collapse-content !py-2.5 px-4 before:w-0",
          !isOpen && "!py-0",
        )}
      />
    </li>
  );
};

export default AccordionFolder;
