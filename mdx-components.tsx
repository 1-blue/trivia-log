import Image, { type ImageProps } from "next/image";
import type { MDXComponents } from "mdx/types";

import Pre from "#/components/mdx/Pre";
import Blockquote from "#/components/mdx/Blockquote";
import { twMerge } from "tailwind-merge";

/** 모든 `.mdx`에 적용 ( `next.js`에서 약속된 이름 ) */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...restProps }) => (
      <h1 className="text-4xl mt-8 mb-5" {...restProps}>
        {children}
      </h1>
    ),
    h2: ({ children, ...restProps }) => (
      <h2 className="text-3xl mt-7 mb-4" {...restProps}>
        {children}
      </h2>
    ),
    h3: ({ children, ...restProps }) => (
      <h3 className="text-2xl mt-6 mb-3" {...restProps}>
        {children}
      </h3>
    ),
    h4: ({ children, ...restProps }) => (
      <h4 className="text-xl mt-5 mb-2.5" {...restProps}>
        {children}
      </h4>
    ),
    h5: ({ children, ...restProps }) => (
      <h5 className="text-lg mt-4 mb-2" {...restProps}>
        {children}
      </h5>
    ),
    h6: ({ children, ...restProps }) => (
      <h6 className="text-base mt-4 mb-2" {...restProps}>
        {children}
      </h6>
    ),
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
    a: ({ children, ...restProps }) => (
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
