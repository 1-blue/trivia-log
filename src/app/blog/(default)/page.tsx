import type { Metadata } from "next";
import dayjs from "dayjs";

import { getAllPosts } from "#/libs";
import { getSharedMetadata } from "#/constants/sharedMetadata";

import PostSection from "./_sections/PostSection";

export const metadata: Metadata = getSharedMetadata({
  title: "박상은 블로그",
  description: "프론트엔드 개발자 박상은의 블로그입니다.",
});

const allPosts = getAllPosts();
const latestSortedPosts = allPosts
  .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
  .slice(0, 6);

const Page: React.FC = () => {
  return (
    <article className="mx-auto my-8 flex max-w-7xl flex-col gap-6">
      <PostSection title="최근 포스팅" posts={latestSortedPosts} />
    </article>
  );
};

export default Page;
