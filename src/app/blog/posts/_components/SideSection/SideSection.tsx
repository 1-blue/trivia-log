import type { ITableOfContent } from "#/types";

import SideTOCSection from "#/app/blog/posts/_components/SideSection/SideTOCSection";
import CopyLinkButton from "#/app/blog/posts/_components/CopyLinkButton";
import CommentDrawerButton from "#/app/blog/posts/_components/CommentDrawerButton";
import ScrollTopButton from "#/app/blog/posts/_components/ScrollTopButton";

interface Props {
  tableOfContents: ITableOfContent[];
  postId: string;
}

const SideSection: React.FC<Props> = ({ tableOfContents, postId }) => {
  return (
    <aside className="not-prose absolute left-full top-[220px] z-0 -mb-[100px] hidden h-[calc(90%+150px)] xl:block">
      <div className="sticky bottom-0 top-[200px] z-10 ml-[5rem] w-[200px]">
        <SideTOCSection tableOfContents={tableOfContents} />
        <div className="flex gap-2">
          <CopyLinkButton />
          <div className="flex-1" />
          <ScrollTopButton />
          <CommentDrawerButton postId={postId} />
        </div>
      </div>
    </aside>
  );
};

export default SideSection;
