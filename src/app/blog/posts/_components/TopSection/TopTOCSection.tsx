import Link from "next/link";

import type { ITableOfContent } from "#/types";

interface Props {
  tableOfContents: ITableOfContent[];
}

const TopTOCSection: React.FC<Props> = ({ tableOfContents }) => {
  return (
    <section>
      <div className="rounded-t-md bg-main-300 px-4 py-3 font-bold text-gray-600">
        책갈피
      </div>
      <ul className="rounded-b-md border-2 border-t-0">
        {tableOfContents.map(({ text, link, subSections }, superIndex) => (
          <li key={link} className="border-t-2 first:border-t-0">
            <Link
              href={link}
              className="my-toc inline-block w-full px-4 py-4 transition-colors"
            >
              {superIndex + 1}. {text}
            </Link>

            <ul className="text-sm font-semibold">
              {subSections.map(({ link, text }, subIndex) => (
                <li key={link} className="border-t-2">
                  <Link
                    href={link}
                    className="my-toc inline-block w-full px-2 py-4 pl-8 transition-colors"
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
