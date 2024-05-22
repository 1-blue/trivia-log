import { cache } from "react";
import type { Metadata, NextPage } from "next";

import { getGroupedFolder } from "#/libs";

import AccordionFolder from "./_components/AccordionFolder";

const getCachedGroupedFolder = cache(getGroupedFolder);

export const generateMetadata = async (): Promise<Metadata> => {
  const groupedFolder = getCachedGroupedFolder();

  const title = "시리즈";
  const description = Object.keys(groupedFolder).join(", ");

  return {
    title,
    description,
    keywords: [],
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: "",
      url: "",
      siteName: "",
      images: [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [],
    },
  };
};

const Page: NextPage = () => {
  const groupedFolder = getCachedGroupedFolder();

  return (
    <>
      <h1 className="mx-auto my-8 max-w-7xl text-2xl font-semibold">시리즈</h1>

      <ul className="mx-auto my-4 max-w-7xl space-y-6">
        {Object.entries(groupedFolder).map(([key, value]) => (
          <AccordionFolder key={key} folderKey={key} folderValue={value} />
        ))}
      </ul>
    </>
  );
};

export default Page;
