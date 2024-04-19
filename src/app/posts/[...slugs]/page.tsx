import type { Metadata, NextPage } from "next";
import dynamic from "next/dynamic";

import { parsedPostMetadata } from "#/libs";

interface Props {
  params: {
    slugs: string[];
  };
}

export const generateMetadata = async ({
  params: { slugs },
}: Props): Promise<Metadata> => {
  const BASE_URL = `${slugs.join("/")}`;
  const { title, description } = parsedPostMetadata(BASE_URL);

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

const Page: NextPage<Props> = ({ params: { slugs } }) => {
  const BASE_URL = `${slugs.join("/")}`;
  const Post = dynamic(() => import(`#/_posts/${BASE_URL}.mdx`));

  return (
    <>
      <Post />
    </>
  );
};

export default Page;
