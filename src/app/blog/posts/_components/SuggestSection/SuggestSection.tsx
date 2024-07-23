import Link from "next/link";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/solid";

import { getAllRelatedPostMetadata } from "#/libs";

import Thumbnail from "../Thumbnail";

interface Props {
  baseUrl: string;
}

const SuggestSection: React.FC<Props> = ({ baseUrl }) => {
  const relatedPostMetadatas = getAllRelatedPostMetadata(baseUrl);

  return (
    <section>
      <ul className="carousel carousel-center flex space-x-4">
        {relatedPostMetadatas.map((metadata) => (
          <li
            key={metadata.path}
            className="card carousel-item w-2/5 shadow-sm"
          >
            <Link href={metadata.path}>
              <Thumbnail
                thumbnail={metadata.thumbnail}
                className="rounded-none rounded-t-md"
              />
            </Link>
            <div className="reverse card-body gap-2.5 rounded-b-md px-6 py-4">
              <div className="mb-1 flex items-center justify-between">
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <time>{metadata.date}</time>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold">
                  <ClockIcon className="h-4 w-4" />
                  <time>{metadata.readingMinutes}분</time>
                </div>
              </div>
              <h6 className="card-title">{metadata.title}</h6>
              <p className="my-1 line-clamp-2 flex-grow-0 text-xs opacity-70">
                {metadata.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SuggestSection;
