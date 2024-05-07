// import CopyLinkButton from "../common/CopyLinkButton";
// import { ScrollToComment, ScrollTop } from "../common/TocButtons";
import type { TableOfContent } from "#/types";

import PostTOC from "./PostTOC";
import CopyLinkButton from "./CopyLinkButton";
import ScrollCommentButton from "./ScrollCommentButton";
import ScrollTopButton from "./ScrollTopButton";

interface Props {
  tableOfContents: TableOfContent[];
}

const PostSidebar: React.FC<Props> = ({ tableOfContents }) => {
  return (
    <aside className="not-prose absolute -top-[200px] left-full -mb-[100px] hidden h-[calc(100%+150px)] xl:block ">
      <div className="sticky bottom-0 top-[200px] z-10 ml-[5rem] mt-[200px] w-[200px]">
        <PostTOC tableOfContents={tableOfContents} />
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

export default PostSidebar;
