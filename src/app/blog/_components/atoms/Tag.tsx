import Link, { type LinkProps } from "next/link";
import { TagIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

interface Props extends Partial<LinkProps> {
  tag: string;
  className?: string;
}

const Tag: React.FC<Props> = ({ tag, href, className, ...props }) => {
  return (
    <li className="my-tag overflow-hidden rounded-sm transition-colors">
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
