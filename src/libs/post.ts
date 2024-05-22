import path from "path";
import dayjs from "dayjs";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { sync } from "glob";

import type {
  Folder,
  PostMetadata,
  PostMetadataWithETC,
  TableOfContent,
} from "#/types";

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
  const postPaths: string[] = sync(`${PATH}/**/*.mdx`);

  const relatedPosts = postPaths.map((postPath) => {
    const POST_FILE = fs.readFileSync(postPath, { encoding: "utf8" });

    const { data, content } = matter(POST_FILE);
    const grayMatter = data as PostMetadata;

    const lastPath = postPath.slice(PATH.length).replace(".mdx", "");

    return {
      ...grayMatter,
      tags: grayMatter.tags,
      date: dayjs(grayMatter.date).format("YYYY-MM-DD"),
      path: "/posts" + lastPath,
      thumbnail: "/images/default/" + (grayMatter.thumbnail ?? "thumbnail.png"),
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
    thumbnail: "/images/default/" + (grayMatter.thumbnail ?? "thumbnail.png"),
    breadcrumbs: postPath.split("/"),
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

    const lastPath = postPath.slice(PATH.length).replace(".mdx", "");

    return {
      content,
      ...grayMatter,
      tags: grayMatter.tags,
      date: dayjs(grayMatter.date).format("YYYY-MM-DD"),
      path: "/posts" + lastPath,
      breadcrumbs: lastPath.split("/"),
      readingMinutes: Math.ceil(readingTime(content).minutes),
      wordCount: content.split(/\s+/gu).length,
    };
  });

  return metadatas;
};

/** 특정 게시글의 `heading` 태그만 읽는 함수 */
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

/** 같은 맥락의 게시글끼리 그룹화된 형태의 객체 데이터 얻는 함수 */
export const getGroupedFolder = () => {
  const PATH = path.join(process.cwd(), "src", "_posts");
  const postPaths: string[] = sync(`${PATH}/**/*.mdx`);

  const folder: Folder = {};

  postPaths.forEach((postPath) => {
    const relativePath = postPath.replace(PATH, "").replace(".mdx", "");
    const parts = relativePath.split("/");

    let currentFolder = folder;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        currentFolder[part] = `${relativePath}`;
      } else {
        if (!currentFolder[part]) currentFolder[part] = {};

        currentFolder = currentFolder[part] as Folder;
      }
    });
  });

  return folder[""] as Folder;
};
