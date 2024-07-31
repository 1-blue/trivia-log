import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";

import { getLatestPosts } from "#/libs";
import { sharedMetadata } from "#/constants/sharedMetadata";

import PostSection from "./_sections/PostSection";

const ARTICLE_STYLE = `mx-auto my-8 max-w-7xl`;

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "박상은 블로그",
  description: "프론트엔드 개발자 박상은의 블로그입니다.",
};

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
