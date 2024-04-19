import { sync } from "glob";
import path from "path";
import dayjs from "dayjs";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";

/**
 * + 페이지 변경 빈도
 *   1. `always`: 접근할 때마다 변경
 *   1. `hourly`: 시간마다 변경
 *   1. `daily`: 일마다 변경
 *   1. `weekly`: 주마다 변경
 *   1. `monthly`: 월마다 변경
 *   1. `yearly`: 년마다 변경
 *   1. `never`: 보관용
 */
type Chamgefreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

/** 사이트맵 */
interface Sitemap {
  /** 게시글 마지막 수정일 ( `YYYY-MM-DD` ) */
  lastmod: string;
  /** 페이지 변경 빈도 */
  changefreq: Chamgefreq;
  /** 우선순위 0.0 ~ 1.0 */
  priority: number;
}

/** 게시글 메타 데이터 */
interface PostMatter {
  /** 게시글 제목 */
  title: string;
  /** 게시글 내용 */
  description: string;
  /** 게시글 태그들 */
  tags: string[];
  /** 게시글 아이콘 */
  icon: string;
  /** 게시글 썸네일 */
  image: string;
  /** 게시글 생성일 */
  date: string;
  /** 사이트맵 */
  sitemap: Sitemap;
  /** 게시글 게시 여부 */
  draft: boolean;
}

const BASE_PATH = "/posts";

export const parsedPostMetadata = (postPath: string) => {
  const PATH = path.join(process.cwd(), "src", "_posts", `${postPath}.mdx`);
  const POST_FILE = fs.readFileSync(PATH, { encoding: "utf8" });

  const { data, content } = matter(POST_FILE);

  const grayMatter = data as PostMatter;

  return {
    ...grayMatter,
    tags: grayMatter.tags,
    date: dayjs(grayMatter.date).format("YYYY-MM-DD"),
    slug: postPath.slice(postPath.indexOf(BASE_PATH)).replace(".mdx", ""),
    readingMinutes: Math.ceil(readingTime(content).minutes),
    wordCount: content.split(/\s+/gu).length,
  };
};
