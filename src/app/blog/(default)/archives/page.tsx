import type { NextPage } from "next";

import { getAllSortedPostMetadata } from "#/libs";

import Timeline from "./_components/Timeline";

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
