import type { Metadata, NextPage } from "next";
import dayjs from "dayjs";

import { getAllPosts } from "#/libs";
import { getSharedMetadata } from "#/libs";

import Timeline from "#/app/blog/(default)/archives/_components/Timeline";

const allPosts = getAllPosts();
const latestSortedPosts = allPosts.sort(
  (a, b) => dayjs(b.date).unix() - dayjs(a.date).unix(),
);

export const metadata: Metadata = getSharedMetadata({
  title: "블로그 저장소",
  description: "프론트엔드 개발자 박상은의 블로그 저장소입니다.",
});

const Page: NextPage = () => {
  return (
    <section className="mx-auto my-8 max-w-7xl">
      <Timeline latestSortedPosts={latestSortedPosts} />
    </section>
  );
};

export default Page;
