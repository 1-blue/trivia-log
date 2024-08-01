import { getAllPosts } from "#/libs";

import ListView from "#/app/blog/_components/organisms/ListView";
import { useMemo } from "react";

interface Props {
  baseURL: string;
}

const allPosts = getAllPosts();

/** 게시글 기본 경로 */
const DEFAULT_PATH = "/blog/posts";

const SuggestSection: React.FC<Props> = ({ baseURL }) => {
  /** 관련 게시글 */
  const relatedPosts = useMemo(
    () =>
      allPosts.filter(({ path }) => {
        if (path.includes(baseURL)) return false;

        const firstBreadcrumb = path
          .slice(DEFAULT_PATH.length + 1)
          .split("/")[0];

        return baseURL.includes(firstBreadcrumb);
      }),
    [baseURL],
  );

  return (
    <section>
      <ListView posts={relatedPosts} />
    </section>
  );
};

export default SuggestSection;
