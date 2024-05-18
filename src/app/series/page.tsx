import type { NextPage } from "next";

import { getAllPostMetadata } from "#/libs";

const Page: NextPage = () => {
  const result = getAllPostMetadata();

  console.log("🚀 result >> ", result);

  return <>Serise</>;
};

export default Page;
