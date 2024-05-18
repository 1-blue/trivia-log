import {
  Bars3BottomLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
  DocumentIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";

import type { PostMetadataWithETC } from "#/types";

import CopyLinkButton from "../CopyLinkButton";
import ScrollBottomButton from "../ScrollBottomButton";

interface Props extends PostMetadataWithETC {}

const TopSection: React.FC<Props> = ({
  title,
  description,
  date,
  readingMinutes,
  wordCount,
  breadcrumbs,
}) => {
  return (
    <section className="mt-6 flex flex-col items-center gap-4">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl font-semibold">{description}</p>
      <div className="flex gap-4 text-xs *:flex *:items-center *:gap-1">
        <div>
          <CalendarDaysIcon className="h-5 w-5" />
          <time>{date}</time>
        </div>
        <div>
          <ClockIcon className="h-5 w-5" />
          <span>{readingMinutes}분</span>
        </div>
        <div>
          <Bars3BottomLeftIcon className="h-5 w-5" />
          <span>단어: {wordCount.toLocaleString()}개</span>
        </div>
      </div>
      <div className="mt-8 flex w-full justify-between">
        <div className="breadcrumbs text-sm">
          <ul className="flex items-center">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb} className="space-x-1">
                {index === breadcrumbs.length - 1 ? (
                  <DocumentIcon className="h-4 w-4" />
                ) : (
                  <FolderIcon className="h-4 w-4" />
                )}
                <span>{breadcrumb}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-1.5 self-start">
          <CopyLinkButton />
          <ScrollBottomButton />
        </div>
      </div>
    </section>
  );
};

export default TopSection;
