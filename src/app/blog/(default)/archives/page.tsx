import type { Metadata, NextPage } from "next";

import { getAllSortedPostMetadata } from "#/libs";
import { getSharedMetadata } from "#/constants/sharedMetadata";

import Timeline from "./_components/Timeline";

export const metadata: Metadata = getSharedMetadata({
  title: "블로그 아카이브",
  description: "프론트엔드 개발자 박상은의 블로그 아카이브입니다.",
});

const Page: NextPage = () => {
  const sortedPostMetadata = getAllSortedPostMetadata();

  return (
    <>
      <section className="mx-auto my-8 max-w-7xl">
        <Timeline sortedPostMetadata={sortedPostMetadata} />
      </section>
    </>
  );
};

export default Page;
