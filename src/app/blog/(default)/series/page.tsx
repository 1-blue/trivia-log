import type { Metadata, NextPage } from "next";

import { getAllPosts } from "#/libs";
import { getSharedMetadata } from "#/libs";

import SeriesAccordion from "#/app/blog/(default)/series/_components/SeriesAccordion";

const allPosts = getAllPosts();

export const metadata: Metadata = getSharedMetadata({
  title: "블로그 시리즈",
  description: "프론트엔드 개발자 박상은의 블로그 시리즈입니다.",
});

const Page: NextPage = () => {
  return (
    <>
      <SeriesAccordion allPosts={allPosts} />
    </>
  );
};

export default Page;
