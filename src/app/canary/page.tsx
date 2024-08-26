import type { Metadata, NextPage } from "next";

import { getSharedMetadata } from "#/libs";
import { createClientFromServer } from "#/supabase/server";

export const metadata: Metadata = getSharedMetadata({
  title: "실험적",
  description: "프론트엔드 개발자 박상은의 실험적 페이지입니다.",
});

const Page: NextPage = async () => {
  const supabase = createClientFromServer();

  let { data: comments } = await supabase.from("comments").select();

  return (
    <>
      <h1 className="text-2xl font-bold">Canary Page !!</h1>
      <pre>{JSON.stringify(comments, null, 2)}</pre>
    </>
  );
};

export default Page;
