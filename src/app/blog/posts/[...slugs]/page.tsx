import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata, NextPage } from "next";
import dynamic from "next/dynamic";

import { getAllPosts, getTableOfContents } from "#/libs";
import { getSharedMetadata } from "#/libs";

import Thumbnail from "#/app/blog/posts/_components/Thumbnail";
import TopSection from "#/app/blog/posts/_components/TopSection/TopSection";
import SideSection from "#/app/blog/posts/_components/SideSection/SideSection";
import TopTOCSection from "#/app/blog/posts/_components/TopSection/TopTOCSection";
import ButtomSection from "#/app/blog/posts/_components/BottomSection/BottomSection";
import SuggestSection from "#/app/blog/posts/_components/SuggestSection/SuggestSection";

interface Props {
  params: {
    slugs: string[];
  };
}

const allPosts = getAllPosts();
const getTargetPost = cache((baseURL: string) =>
  allPosts.find(({ path }) => path.includes(baseURL)),
);

export const generateMetadata = async ({
  params: { slugs },
}: Props): Promise<Metadata> => {
  const baseURL = `${slugs.join("/")}`;
  const targetPost = getTargetPost(baseURL);
  if (!targetPost) return notFound();

  const { title, description, thumbnail, tags } = targetPost;

  return getSharedMetadata({
    title,
    description,
    keywords: tags,
    images: [thumbnail],
  });
};

const Page: NextPage<Props> = ({ params: { slugs } }) => {
  const baseURL = `${slugs.join("/")}`;
  const targetPost = getTargetPost(baseURL);
  if (!targetPost) return notFound();

  const tableOfContents = getTableOfContents(targetPost.content);

  // Vercel 빌드 시 에러 발생으로 인해 상대경로 사용
  const Post = dynamic(() => import(`../../../../_posts/${baseURL}.mdx`));

  return (
    <div className="relative">
      <TopSection {...targetPost} />

      <div className="divider mb-6 mt-0" />

      <Thumbnail thumbnail={targetPost.thumbnail} />

      <div className="divider my-6" />

      <TopTOCSection tableOfContents={tableOfContents} />
      <SideSection tableOfContents={tableOfContents} />

      <div className="divider my-6" />

      <Post />

      <div className="divider my-6" />

      <ButtomSection {...targetPost} />

      <div className="divider my-6" />

      <SuggestSection baseURL={baseURL} />
    </div>
  );
};

export default Page;
