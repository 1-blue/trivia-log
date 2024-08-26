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
export type TChamgefreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

/** 사이트맵 */
export interface ISitemap {
  /** 게시글 마지막 수정일 ( `YYYY-MM-DD` ) */
  lastmod: string;
  /** 페이지 변경 빈도 */
  changefreq: TChamgefreq;
  /** 우선순위 0.0 ~ 1.0 */
  priority: number;
}

/** 게시글 메타 데이터 */
export interface IPost {
  /** 게시글 아이디 */
  id: string;
  /** 게시글 제목 */
  title: string;
  /** 게시글 내용 */
  description: string;
  /** 게시글 태그들 */
  tags: string[];
  /** 게시글 아이콘 */
  icon: string;
  /** 게시글 썸네일 */
  thumbnail: string;
  /** 게시글 생성일 */
  date: string;
  /** 사이트맵 */
  sitemap: ISitemap;
  /** 게시글 게시 여부 */
  draft: boolean;
  /** 게시글 경로 */
  path: string;
  /** 게시글 경로 (`/`단위 배열) */
  breadcrumbs: string[];
}

/** 필요한 데이터를 추가한 게시글 메타 데이터 */
export interface IPostWithETC extends IPost {
  /** 파싱된 게시글 내용 */
  content: string;
  /** 분량 ( 평균 읽기 시간 ) */
  readingMinutes: number;
  /** 단어 개수 */
  wordCount: number;
}
