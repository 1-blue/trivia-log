import { getAllPosts } from "#/libs/server";

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
        const isSamePath = path === `${DEFAULT_PATH}/${baseURL}`;
        if (isSamePath) return false;

        const firstBreadcrumb = path
          .slice(DEFAULT_PATH.length + 1)
          .split("/")[0];

        return baseURL.includes(firstBreadcrumb);
      }),
    [baseURL],
  );

  return (
    <section>
      <h6 className="mb-4 text-xl font-semibold">연관된 포스트</h6>
      <ListView posts={relatedPosts} />
    </section>
  );
};

export default SuggestSection;
