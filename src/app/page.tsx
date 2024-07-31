import type { Metadata, NextPage } from "next";

import { sharedMetadata } from "#/constants/sharedMetadata";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: "FE 개발자 | 잡학사전",
  description: "프론트엔드 개발자 박상은의 잡학사전입니다.",
};

const Home: NextPage = () => {
  return (
    <main className="">
      <h1>메인</h1>
    </main>
  );
};

export default Home;
