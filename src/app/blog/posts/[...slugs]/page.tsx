import type { Metadata, NextPage } from "next";
import dynamic from "next/dynamic";

import { getPostMetadata, getTableOfContents } from "#/libs";

import Thumbnail from "#/app/blog/posts/_components/Thumbnail";
import TopSection from "#/app/blog/posts/_components/TopSection/TopSection";
import SideSection from "#/app/blog/posts/_components/SideSection/SideSection";
import TopTOCSection from "#/app/blog/posts/_components/TopSection/TopTOCSection";
import ButtomSection from "#/app/blog/posts/_components/BottomSection/BottomSection";
import SuggestSection from "#/app/blog/posts/_components/SuggestSection/SuggestSection";
import CommentSection from "#/app/blog/posts/_components/CommentSection/CommentSection";

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
    <div className="relative">
      <TopSection {...postMetadata} />

      <div className="divider mb-6 mt-0" />

      <Thumbnail thumbnail={postMetadata.thumbnail} />

      <div className="divider my-6" />

      <TopTOCSection tableOfContents={tableOfContents} />
      <SideSection tableOfContents={tableOfContents} />

      <div className="divider my-6" />

      <Post />

      <div className="divider my-6" />

      <ButtomSection {...postMetadata} />

      <div className="divider my-6" />

      <SuggestSection baseUrl={BASE_URL} />

      <div className="divider my-6" />

      <CommentSection />
    </div>
  );
};

export default Page;