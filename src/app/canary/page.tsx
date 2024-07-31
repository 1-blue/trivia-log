import type { Metadata, NextPage } from "next";

import { sharedMetadata } from "#/constants/sharedMetadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "실험적",
  description: "프론트엔드 개발자 박상은의 실험적 페이지입니다.",
};

const Page: NextPage = () => {
  return <>Canary</>;
};

export default Page;
