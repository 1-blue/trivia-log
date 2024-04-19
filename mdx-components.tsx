import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";

/** 모든 `.mdx`에 적용 ( `next.js`에서 약속된 이름 ) */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 style={{ color: "blue", fontSize: "48px" }}>{children}</h1>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
        alt={props.alt || "블로그 이미지"}
      />
    ),
    ...components,
  };
}
