import type { Metadata, NextPage } from "next";

import { sharedMetadata } from "#/constants/sharedMetadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "블로그 시리즈",
  description: "프론트엔드 개발자 박상은의 블로그 시리즈입니다.",
};

const Page: NextPage = () => {
  return (
    <>
      <span>구현 예정</span>
    </>
  );
};

export default Page;
