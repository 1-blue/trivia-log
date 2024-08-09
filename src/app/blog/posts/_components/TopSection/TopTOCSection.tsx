import Link from "next/link";
import { FireIcon } from "@heroicons/react/24/solid";

import type { ITableOfContent } from "#/types";

interface Props {
  tableOfContents: ITableOfContent[];
}

const TopTOCSection: React.FC<Props> = ({ tableOfContents }) => {
  return (
    <section className="collapse rounded-md">
      <input type="checkbox" className="peer" />
      <div className="collapse-title flex justify-between rounded-t-md bg-main-300 pr-6 text-gray-800">
        <span className="text-xl font-bold">책갈피</span>
        <FireIcon className="h-7 w-7" />
      </div>
      <ul className="collapse-content rounded-b-md border-2 border-t-0 px-0 !pb-0">
        {tableOfContents.map(({ text, link, subSections }, superIndex) => (
          <li key={link} className="border-t-2 first:border-t-0">
            <Link
              href={link}
              className="inline-block w-full px-4 py-4 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {superIndex + 1}. {text}
            </Link>

            <ul className="text-sm font-semibold">
              {subSections.map(({ link, text }, subIndex) => (
                <li key={link} className="border-t-2">
                  <Link
                    href={link}
                    className="inline-block w-full px-2 py-4 pl-8 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {superIndex + 1}.{subIndex + 1}. {text}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopTOCSection;
