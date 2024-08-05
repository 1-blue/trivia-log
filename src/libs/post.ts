import { cache } from "react";
import path from "path";
import dayjs from "dayjs";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { sync } from "glob";

import type { IPost, IPostWithETC, ITableOfContent } from "#/types";

/** 게시글 기본 썸네일 */
const DEFAULT_THUMBNAIL = "/images/default/thumbnail.jpg";
/** 게시글 기본 경로 */
const DEFAULT_PATH = "/blog/posts";

/** 모든 게시글의 메타데이터 및 내용 얻는 함수 */
export const getAllPosts = cache((): IPostWithETC[] => {
  /** 모든 게시글들이 저장되어있는 폴더 경로 ( `src/_posts` ) */
  const postFolderPath = path.join(process.cwd(), "src", "_posts");
  /** 모든 게시글들의 경로들 ( `/Users/openknowl/MyWorkspace/trivia-log/src/_posts/state-management/redux.mdx` ) */
  const allPostPaths = sync(`${postFolderPath}/**/*.mdx`);

  return allPostPaths.map((postPath) => {
    /** 특정 게시글 파일 데이터 */
    const postFileData = fs.readFileSync(postPath, { encoding: "utf8" });

    // 게시글 메타데이터 얻기
    const { data, content } = matter(postFileData);
    const metadata = data as IPost;

    /** 게시글 상대 경로 ( `/state-management/redux` ) */
    const relativePostPath = postPath
      .slice(postFolderPath.length)
      .replace(".mdx", "");

    return {
      content,
      ...metadata,
      date: dayjs(metadata.date).format("YYYY-MM-DD"),
      path: DEFAULT_PATH + relativePostPath,
      thumbnail: metadata.thumbnail ?? DEFAULT_THUMBNAIL,
      breadcrumbs: relativePostPath.split("/").filter((v) => v !== ""),
      readingMinutes: Math.ceil(readingTime(content).minutes),
      wordCount: content.split(/\s+/g).length,
    };
  });
});

// ======================================================================================

/** 특정 게시글의 `<h1>` ~ `<h3>` 태그만 읽는 함수 */
export const getTableOfContents = (content: string) => {
  return content
    .split("\n")
    .filter((line) => line.match(/(^#{2,3})\s/))
    .reduce<ITableOfContent[]>((ac, rawHeading) => {
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
