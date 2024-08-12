import type { Metadata, NextPage } from "next";

import { getSharedMetadata } from "#/libs";

export const metadata: Metadata = getSharedMetadata({
  title: "FE 개발자 | 잡학일지",
  description: "프론트엔드 개발자 박상은의 잡학일지입니다.",
});

const Home: NextPage = () => {
  return (
    <main className="">
      <h1>메인</h1>
    </main>
  );
};

export default Home;
