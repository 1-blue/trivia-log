import Link from "next/link";
import {
  Bars3BottomLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import type { PostMetadataWithETC } from "#/types";

interface Props extends PostMetadataWithETC {}

const PostTopSection: React.FC<Props> = ({
  title,
  description,
  date,
  readingMinutes,
  wordCount,
  tags,
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
      <ul className="mx-2 mb-3 mt-4 flex flex-wrap gap-3 self-start text-sm font-semibold">
        {tags.map((tag) => (
          <li key={tag} className="my-tag rounded-sm transition-colors">
            <Link
              href={`/archives/tags/${tag}`}
              target="_blank"
              rel="noreferrer noopener"
              className="px-1.5"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostTopSection;
