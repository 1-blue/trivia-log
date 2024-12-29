import { useMemo } from "react";
import { redirect } from "next/navigation";
import type { Metadata, NextPage } from "next";

import { getAllPosts } from "#/libs";
import { getSharedMetadata } from "#/libs";

import PostList from "#/app/blog/_components/molecules/PostList";
import SearchInputByTag from "#/app/blog/(default)/tags/_components/SearchInputByTag";
import AllTag from "#/app/blog/(default)/tags/_components/AllTag";

interface Props {
  searchParams: { tag?: string };
}

const allPosts = getAllPosts();
const DEFAULT_TAG = allPosts[0].tags[0];

export const generateMetadata = async ({
  searchParams: { tag },
}: Props): Promise<Metadata> => {
  if (!tag) {
    return getSharedMetadata({
      title: "블로그 태그",
      description: "프론트엔드 개발자 박상은의 블로그 태그입니다.",
    });
  }

  const firstPostWithTag = allPosts.find((metadata) =>
    metadata.tags.includes(tag),
  );

  if (!firstPostWithTag) {
    return getSharedMetadata({
      title: "블로그 태그",
      description: "프론트엔드 개발자 박상은의 블로그 태그입니다.",
    });
  }
  return {
    ...getSharedMetadata({
      title: `블로그 태그 - ${tag}`,
      description: `프론트엔드 개발자 박상은의 블로그 "${tag}"를 가진 게시글들 입니다.`,
      keywords: [tag],
      images: [firstPostWithTag.thumbnail],
    }),
  };
};

const Page: NextPage<Props> = ({ searchParams: { tag } }) => {
  const duplicatedTags = allPosts.map((metadata) => metadata.tags).flat();
  const tags = duplicatedTags.reduce<Record<string, number>>((prev, acc) => {
    if (acc in prev) prev[acc] += 1;
    else prev[acc] = 1;

    return prev;
  }, {});
  const filteredPosts = useMemo(() => {
    if (!tag) return [];
    return allPosts.filter((metadata) => metadata.tags.includes(tag));
  }, [tag]);

  if (!tag) return redirect(`/blog/tags?tag=${DEFAULT_TAG}`);

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
