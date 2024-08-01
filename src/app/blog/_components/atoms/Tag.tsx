import Link, { type LinkProps } from "next/link";
import { TagIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

interface Props extends Partial<LinkProps> {
  tag: string;
  className?: string;
}

const Tag: React.FC<Props> = ({ tag, href, className, ...props }) => {
  return (
    <li className="overflow-hidden rounded-sm bg-main-100 text-main-500 transition-colors hover:bg-main-200 dark:bg-main-200 dark:text-main-600 dark:hover:bg-main-300">
      <Link
        href={href ?? `/blog/tags?tag=${tag}`}
        className={twMerge(
          "inline-flex items-center gap-1.5 whitespace-nowrap px-2 py-1",
          className,
        )}
        {...props}
      >
        <TagIcon className="h-3.5 w-3.5" />
        <span>{tag}</span>
      </Link>
    </li>
  );
};

export default Tag;
