import type { Metadata } from "next";

const title: Metadata["title"] = {
  template: "%s | 잡학사전",
  default: "잡학사전",
};
const description = "프론트엔드 개발자 박상은의 잡학사전입니다.";
const keywords = [
  "프론트엔드",
  "개발자",
  "박상은",
  "잡학사전",
  "블로그",
  "포트폴리오",
  "이력서",
];
const images = ["/images/default/preview.jpg"];

/** 공용으로 사용할 메타데이터 */
export const sharedMetadata: Metadata = {
  title,
  description,
  keywords,
  openGraph: {
    title,
    description,
    images,
    type: "website",
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
    siteName: "프론트엔드 개발자 박상은의 잡학사전",
    locale: "ko_KR",
    countryName: "Korea",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images,
  },
};
