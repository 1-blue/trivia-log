import type { Metadata, NextPage } from "next";
import { redirect } from "next/navigation";

import { getSharedMetadata } from "#/libs";

export const metadata: Metadata = getSharedMetadata({
  title: "실험적",
  description: "프론트엔드 개발자 박상은의 실험적 페이지입니다.",
});

const Page: NextPage = async () => {
  return redirect("/blog");
};

export default Page;
