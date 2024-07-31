import { useMemo } from "react";
import type { Metadata, NextPage } from "next";

import { getAllPostMetadata } from "#/libs";
import { sharedMetadata } from "#/constants/sharedMetadata";

import PostList from "#/app/blog/_components/molecules/PostList";
import SearchInputByTag from "./_components/SearchInputByTag";
import AllTag from "./_components/AllTag";

interface Props {
  searchParams: { tag?: string };
}

export const generateMetadata = async ({
  searchParams: { tag },
}: Props): Promise<Metadata> => {
  if (!tag) {
    return {
      ...sharedMetadata,
      title: "블로그 태그",
      description: "프론트엔드 개발자 박상은의 블로그 태그입니다.",
      openGraph: {
        ...sharedMetadata.openGraph,
      },
    };
  }

  const postMetadatas = getAllPostMetadata();
  const firstPostWithTag = postMetadatas.find((metadata) =>
    metadata.tags.includes(tag),
  );

  if (!firstPostWithTag) return { ...sharedMetadata };

  return {
    ...sharedMetadata,
    title: `블로그 태그 - ${tag}`,
    description: `프론트엔드 개발자 박상은의 블로그 "${tag}"를 가진 게시글들 입니다.`,
    openGraph: {
      ...sharedMetadata.openGraph,
      title: `블로그 태그 - ${tag}`,
      description: `프론트엔드 개발자 박상은의 블로그 "${tag}"를 가진 게시글들 입니다.`,
      images: [firstPostWithTag.thumbnail],
    },
    twitter: {
      ...sharedMetadata.twitter,
      title: `블로그 태그 - ${tag}`,
      description: `프론트엔드 개발자 박상은의 블로그 "${tag}"를 가진 게시글들 입니다.`,
      images: [firstPostWithTag.thumbnail],
    },
  };
};

const Page: NextPage<Props> = ({ searchParams: { tag } }) => {
  const postMetadatas = getAllPostMetadata();
  const duplicatedTags = postMetadatas.map((metadata) => metadata.tags).flat();
  const tags = duplicatedTags.reduce(
    (prev, acc) => {
      if (acc in prev) prev[acc] += 1;
      else prev[acc] = 1;

      return prev;
    },
    {} as Record<string, number>,
  );

  const filteredPosts = useMemo(() => {
    if (!tag) return [];
    return postMetadatas.filter((metadata) => metadata.tags.includes(tag));
  }, [postMetadatas, tag]);

  return (
    <article>
      {/* 태그 검색 */}
      <section className="mx-auto my-8 flex max-w-7xl flex-col-reverse justify-between gap-6 sm:flex-row">
        <AllTag tags={tags} targetTag={tag} />
        <SearchInputByTag tags={tags} />
      </section>

      {/* 검색된 게시글들 */}
      <section className="mx-auto my-8 max-w-7xl">
        <ul className="flex flex-col gap-4">
          {filteredPosts.map((metadata) => (
            <PostList key={metadata.path} post={metadata} />
          ))}
        </ul>
      </section>
    </article>
  );
};

export default Page;
