import path from "path";
import dayjs from "dayjs";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { sync } from "glob";

// cache 사용하기

import type {
  Folder,
  PostMetadata,
  PostMetadataWithETC,
  TableOfContent,
} from "#/types";

/** 모든 게시글의 메타데이터 얻는 함수 */
export const getAllPostMetadata = (): PostMetadataWithETC[] => {
  const PATH = path.join(process.cwd(), "src", "_posts");
  const postPaths: string[] = sync(`${PATH}/**/*.mdx`);

  const metadatas = postPaths.map((postPath) => {
    /** 게시글 파일 읽기 */
    const POST_FILE = fs.readFileSync(postPath, { encoding: "utf8" });

    // 게시글 메타데이터 얻기
    const { data, content } = matter(POST_FILE);
    const grayMatter = data as PostMetadata;

    /** 마지막 `/`에서 확장자를 제외한 경로 */
    const lastPath = postPath.slice(PATH.length).replace(".mdx", "");

    return {
      content,
      ...grayMatter,
      tags: grayMatter.tags,
      date: dayjs(grayMatter.date).format("YYYY-MM-DD"),
      path: "/blog/posts" + lastPath,
      thumbnail: grayMatter.thumbnail ?? "/images/default/thumbnail.png",
      breadcrumbs: lastPath.split("/"),
      readingMinutes: Math.ceil(readingTime(content).minutes),
      wordCount: content.split(/\s+/gu).length,
    };
  });

  return metadatas;
};

/** 같은 맥락을 갖는 게시글들의 메타데이터를 얻는 함수 */
export const getAllRelatedPostMetadata = (
  postPath: string,
): Omit<PostMetadataWithETC, "content">[] => {
  const PATH = path.join(
    process.cwd(),
    "src",
    "_posts",
    postPath.slice(0, postPath.lastIndexOf("/")),
  );
  const postPaths = sync(`${PATH}/**/*.mdx`);

  // 연관된 모든 게시글
  const relatedPosts = postPaths.map((postPath) => {
    /** 게시글 파일 읽기 */
    const POST_FILE = fs.readFileSync(postPath, { encoding: "utf8" });

    // 게시글 메타데이터 얻기
    const { data, content } = matter(POST_FILE);
    const grayMatter = data as PostMetadata;

    /** 마지막 `/`에서 확장자를 제외한 경로 */
    const lastPath = postPath.slice(PATH.length).replace(".mdx", "");

    return {
      ...grayMatter,
      tags: grayMatter.tags,
      date: dayjs(grayMatter.date).format("YYYY-MM-DD"),
      path: "/posts" + lastPath,
      thumbnail: grayMatter.thumbnail ?? "/images/default/thumbnail.png",
      breadcrumbs: lastPath.split("/"),
      readingMinutes: Math.ceil(readingTime(content).minutes),
      wordCount: content.split(/\s+/gu).length,
    };
  });

  return relatedPosts;
};

/** 특정 게시글의 메타데이터 얻는 함수 */
export const getPostMetadata = (postPath: string): PostMetadataWithETC => {
  const PATH = path.join(process.cwd(), "src", "_posts", `${postPath}.mdx`);
  const POST_FILE = fs.readFileSync(PATH, { encoding: "utf8" });

  const { data, content } = matter(POST_FILE);
  const grayMatter = data as PostMetadata;

  return {
    content,
    ...grayMatter,
    tags: grayMatter.tags,
    date: dayjs(grayMatter.date).format("YYYY년 MM월 DD일"),
    path: "/posts" + PATH.slice(PATH.indexOf("_posts") + 6).replace(".mdx", ""),
    thumbnail: grayMatter.thumbnail ?? "/images/default/thumbnail.png",
    breadcrumbs: postPath.split("/"),
    readingMinutes: Math.ceil(readingTime(content).minutes),
    wordCount: content.split(/\s+/gu).length,
  };
};

// ======================================================================================

/** 특정 게시글의 `<h1>` ~ `<h3>` 태그만 읽는 함수 */
export const getTableOfContents = (content: string) => {
  return content
    .split("\n")
    .filter((line) => line.match(/(^#{2,3})\s/))
    .reduce<TableOfContent[]>((ac, rawHeading) => {
      const nac = [...ac];
      const removeMdx = rawHeading
        .replace(/^##*\s/, "")
        .replace(/[\*,\~]{2,}/g, "")
        .replace(/(?<=\])\((.*?)\)/g, "")
        .replace(/(?<!\S)((http)(s?):\/\/|www\.).+?(?=\s)/g, "");

      const section = {
        link:
          "#" +
          removeMdx
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣 -]/g, "")
            .replace(/\s/g, "-"),
        text: removeMdx,
      };

      const isSubTitle = rawHeading.split("#").length - 1 === 3;

      if (ac.length && isSubTitle) {
        nac.at(-1)?.subSections.push(section);
      } else {
        nac.push({ ...section, subSections: [] });
      }

      return nac;
    }, []);
};

/** 모든 게시글 작성시간 얻기 */
export const getAllPostDate = () => {
  const PATH = path.join(process.cwd(), "src", "_posts");
  const postPaths: string[] = sync(`${PATH}/**/*.mdx`);

  const dates = postPaths.reduce<Record<string, number>>((prev, curr) => {
    const POST_FILE = fs.readFileSync(curr, { encoding: "utf8" });

    const { data } = matter(POST_FILE);
    const grayMatter = data as PostMetadata;

    const date = dayjs(grayMatter.date).format("YYYY-MM-DD");

    prev[date] ? prev[date]++ : (prev[date] = 1);

    return prev;
  }, {});

  return dates;
};

/** 모든 게시글을 최신순으로 정렬하여 얻는 함수 */
export const getAllSortedPostMetadata = () => {
  const metadatas = getAllPostMetadata();

  return metadatas
    .map((metadata) => ({
      title: metadata.title,
      description: metadata.description,
      date: metadata.date,
      path: metadata.path,
    }))
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
};

/** 최근 게시글 얻는 함수 */
export const getLatestPosts = (count: number) => {
  const metadatas = getAllPostMetadata();

  return metadatas
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
    .slice(0, count);
};
