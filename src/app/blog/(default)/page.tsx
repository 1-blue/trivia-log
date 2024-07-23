import { twMerge } from "tailwind-merge";

import { getLatestPosts } from "#/libs";

import PostSection from "./_sections/PostSection";

const ARTICLE_STYLE = `mx-auto my-8 max-w-7xl`;

const Page: React.FC = () => {
  const latestPosts = getLatestPosts(6);

  return (
    <>
      {/* 최근 포스팅 */}
      <article className={twMerge(ARTICLE_STYLE, "flex flex-col gap-6")}>
        <PostSection title="최근 포스팅" posts={latestPosts} />
      </article>
    </>
  );
};

export default Page;
