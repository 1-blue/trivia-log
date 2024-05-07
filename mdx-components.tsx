import Link from "next/link";
import Image, { type ImageProps } from "next/image";
import type { MDXComponents } from "mdx/types";
import { twMerge } from "tailwind-merge";

import Pre from "#/components/mdx/Pre";
import Blockquote from "#/components/mdx/Blockquote";
import Heading from "#/components/mdx/Heading";

/** 모든 `.mdx`에 적용 ( `next.js`에서 약속된 이름 ) */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <Heading.H1
        {...props}
        id={(props.children as string).replaceAll(" ", "-").toLowerCase()}
      />
    ),
    h2: (props) => {
      const { children } = props;

      // 존재하지 않는 경우 ( `TS`라서 예외처리 )
      if (typeof children !== "string") return;

      // metadata를 없앨수가 없어서 강제로 렌더링하지 않음
      // ( 이유는 모르겠지만 h2로 변환됨 )
      if (children.includes("changefreq: ")) return;

      return (
        <Heading.H2
          {...props}
          id={(props.children as string).replaceAll(" ", "-").toLowerCase()}
        />
      );
    },
    h3: (props) => (
      <Heading.H3
        {...props}
        id={(props.children as string).replaceAll(" ", "-").toLowerCase()}
      />
    ),
    h4: (props) => (
      <Heading.H4
        {...props}
        id={(props.children as string).replaceAll(" ", "-").toLowerCase()}
      />
    ),
    h5: (props) => (
      <Heading.H5
        {...props}
        id={(props.children as string).replaceAll(" ", "-").toLowerCase()}
      />
    ),
    h6: (props) => (
      <Heading.H6
        {...props}
        id={(props.children as string).replaceAll(" ", "-").toLowerCase()}
      />
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        // style={{ width: "100%", height: "auto" }}
        width="100"
        height="100"
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
            "my-code rounded-sm px-[5px] py-0.5 text-sm font-semibold",
          className,
        )}
      >
        {children}
      </code>
    ),
    /** 리스트 */
    ol: ({ children, ...restProps }) => (
      <ol {...restProps} className="mb-2 mt-4 list-decimal space-y-1 pl-10">
        {children}
      </ol>
    ),
    /** 리스트 */
    ul: ({ children, ...restProps }) => (
      <ul {...restProps} className="mb-2 mt-4 list-disc space-y-1 pl-10">
        {children}
      </ul>
    ),
    /** 링크 */
    a: ({ href, children, className, ...restProps }) => (
      <Link
        {...restProps}
        href={href!}
        target="_blank"
        rel="noreferrer noopener"
        className="font-semibold text-main-500 underline underline-offset-2 transition-colors hover:text-main-600"
      >
        {children}
      </Link>
    ),
    /** 인용 블럭 */
    blockquote: (props) => <Blockquote {...props} />,
    /** 수평라인 ( 메타데이터를 사용하는 부분과 문법이 같은데 파싱할때 제외가 안되어서 아예 제거 `---` ) */
    hr: () => null,
    ...components,
  };
}
