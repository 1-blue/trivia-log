import {
  Bars3BottomLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

import type { PostMetadataWithETC } from "#/types";

import Tag from "../atoms/Tag";
import Link from "next/link";

interface Props {
  post: PostMetadataWithETC;
}

const PostList: React.FC<Props> = ({ post }) => {
  return (
    <li key={post.path} className="flex gap-4">
      <Link href={post.path}>
        <figure className="relative h-full w-60 flex-shrink-0 overflow-hidden rounded-xl sm:block">
          <Image
            src={post.thumbnail}
            alt={post.title + " 썸네일"}
            fill
            className="transition-all hover:scale-x-110 hover:scale-y-105"
          />
        </figure>
      </Link>
      <div className="flex flex-col gap-1">
        <div className="flex gap-4 text-xs *:flex *:items-center *:gap-1">
          <div>
            <CalendarDaysIcon className="h-5 w-5" />
            <time>{post.date}</time>
          </div>
          <div>
            <Bars3BottomLeftIcon className="h-5 w-5" />
            <span>단어: {post.wordCount.toLocaleString()}개</span>
          </div>
          <div>
            <ClockIcon className="h-5 w-5" />
            <span>{post.readingMinutes}분</span>
          </div>
        </div>
        <Link href={post.path} className="underline-offset-2 hover:underline">
          <h2 className="line-clamp-1 text-lg font-bold">{post.title}</h2>
        </Link>
        <Link href={post.path} className="underline-offset-2 hover:underline">
          <p className="mb-1 line-clamp-2 h-10 text-sm text-gray-500 sm:line-clamp-3 sm:h-16">
            {post.description}
          </p>
        </Link>
        <ul className="flex flex-wrap gap-3 self-start pb-1 text-sm font-semibold">
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default PostList;
