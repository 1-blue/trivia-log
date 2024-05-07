import type { Metadata, NextPage } from "next";
import dynamic from "next/dynamic";

import { getPostMetadata, getTableOfContents } from "#/libs";

import PostTopSection from "#/app/posts/_components/PostTopSection";
import PostSidebar from "../_components/PostSidebar";

interface Props {
  params: {
    slugs: string[];
  };
}

export const generateMetadata = async ({
  params: { slugs },
}: Props): Promise<Metadata> => {
  const BASE_URL = `${slugs.join("/")}`;
  const { title, description } = getPostMetadata(BASE_URL);

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
  const postMetadata = getPostMetadata(BASE_URL);

  const tableOfContents = getTableOfContents(postMetadata.content);

  const Post = dynamic(() => import(`#/_posts/${BASE_URL}.mdx`));

  return (
    <>
      <PostTopSection {...postMetadata} />

      <hr className="mb-8" />

      <div className="relative">
        <Post />
        <PostSidebar tableOfContents={tableOfContents} />
      </div>
    </>
  );
};

export default Page;
