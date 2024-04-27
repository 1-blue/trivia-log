import path from "path";
import dayjs from "dayjs";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { sync } from "glob";

import type { PostMetadata, PostMetadataWithETC } from "#/types";

/** 특정 게시글의 메타데이터 얻는 함수 */
export const getPostMetadata = (postPath: string): PostMetadataWithETC => {
  const PATH = path.join(process.cwd(), "src", "_posts", `${postPath}.mdx`);
  const POST_FILE = fs.readFileSync(PATH, { encoding: "utf8" });

  const { data, content } = matter(POST_FILE);

  const grayMatter = data as PostMetadata;

  return {
    ...grayMatter,
    tags: grayMatter.tags,
    date: dayjs(grayMatter.date).format("YYYY년 MM월 DD일"),
    path: "/posts" + PATH.slice(PATH.indexOf("_posts") + 6).replace(".mdx", ""),
    readingMinutes: Math.ceil(readingTime(content).minutes),
    wordCount: content.split(/\s+/gu).length,
  };
};

/** 모든 게시글의 메타데이터 얻는 함수 */
export const getAllPostMetadata = (): PostMetadataWithETC[] => {
  const PATH = path.join(process.cwd(), "src", "_posts");
  const postPaths: string[] = sync(`${PATH}/**/*.mdx`);

  const metadatas = postPaths.map((postPath) => {
    const POST_FILE = fs.readFileSync(postPath, { encoding: "utf8" });

    const { data, content } = matter(POST_FILE);
    const grayMatter = data as PostMetadata;

    return {
      ...grayMatter,
      tags: grayMatter.tags,
      date: dayjs(grayMatter.date).format("YYYY-MM-DD"),
      path: "/posts" + postPath.slice(PATH.length).replace(".mdx", ""),
      readingMinutes: Math.ceil(readingTime(content).minutes),
      wordCount: content.split(/\s+/gu).length,
    };
  });

  return metadatas;
};
