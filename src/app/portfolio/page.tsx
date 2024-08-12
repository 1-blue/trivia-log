import type { Metadata, NextPage } from "next";

import Skills from "./_components/Skills";

import { getSharedMetadata } from "#/libs";

export const metadata: Metadata = getSharedMetadata({
  title: "박상은 포트폴리오",
  description: "프론트엔드 개발자 박상은의 포트폴리오입니다.",
});

const Page: NextPage = () => {
  return (
    <>
      <Skills />
    </>
  );
};

export default Page;
