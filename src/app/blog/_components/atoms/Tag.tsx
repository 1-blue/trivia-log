import Link from "next/link";
import { TagIcon } from "@heroicons/react/24/solid";

interface Props {
  tag: string;
}

const Tag: React.FC<Props> = ({ tag }) => {
  return (
    <li className="my-tag rounded-sm transition-colors">
      <Link
        href={`/blog/archives/tags/${tag}`}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-1.5 px-2 py-1"
      >
        <TagIcon className="h-3.5 w-3.5" />
        <span>{tag}</span>
      </Link>
    </li>
  );
};

export default Tag;
