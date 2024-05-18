import type { TableOfContent } from "#/types";

import SideTOCSection from "./SideTOCSection";
import CopyLinkButton from "../CopyLinkButton";
import ScrollCommentButton from "../ScrollCommentButton";
import ScrollTopButton from "../ScrollTopButton";

interface Props {
  tableOfContents: TableOfContent[];
}

const SideSection: React.FC<Props> = ({ tableOfContents }) => {
  return (
    <aside className="not-prose absolute left-full top-[220px] z-0 -mb-[100px] hidden h-[calc(90%+150px)] xl:block">
      <div className="sticky bottom-0 top-[200px] z-10 ml-[5rem] w-[200px]">
        <SideTOCSection tableOfContents={tableOfContents} />
        <div className="flex gap-2">
          <CopyLinkButton />
          <div className="flex-1" />
          <ScrollTopButton />
          <ScrollCommentButton />
        </div>
      </div>
    </aside>
  );
};

export default SideSection;
