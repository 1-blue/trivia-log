import Image, { type ImageProps } from "next/image";
import type { MDXComponents } from "mdx/types";

import Pre from "#/components/mdx/Pre";
import Blockquote from "#/components/mdx/Blockquote";
import { twMerge } from "tailwind-merge";
import Heading from "#/components/mdx/Heading";

/** 모든 `.mdx`에 적용 ( `next.js`에서 약속된 이름 ) */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <Heading.H1 {...props} />,
    h2: (props) => <Heading.H2 {...props} />,
    h3: (props) => <Heading.H3 {...props} />,
    h4: (props) => <Heading.H4 {...props} />,
    h5: (props) => <Heading.H5 {...props} />,
    h6: (props) => <Heading.H6 {...props} />,
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
        alt={props.alt || "블로그 이미지"}
      />
    ),
    /** 코드 블럭 */
    pre: (props) => <Pre {...props} />,
    /** 코드 */
    code: ({ children, className, ...restProps }) => (
      <code
        {...restProps}
        className={twMerge(
          typeof children === "string" &&
            "my-code px-[5px] py-0.5 rounded-sm text-sm font-semibold",
          className
        )}
      >
        {children}
      </code>
    ),
    /** 리스트 */
    ol: ({ children, ...restProps }) => (
      <ol {...restProps} className="list-decimal pl-10 mt-4 mb-2 space-y-1">
        {children}
      </ol>
    ),
    /** 리스트 */
    ul: ({ children, ...restProps }) => (
      <ul {...restProps} className="list-disc pl-10 mt-4 mb-2 space-y-1">
        {children}
      </ul>
    ),
    /** 링크 */
    a: ({ children, className, ...restProps }) => (
      <a
        {...restProps}
        target="_blank"
        rel="noreferrer noopener"
        className="underline underline-offset-2 font-semibold"
      >
        {children}
      </a>
    ),
    /** 인용 블럭 */
    blockquote: (props) => <Blockquote {...props} />,
    ...components,
  };
}
