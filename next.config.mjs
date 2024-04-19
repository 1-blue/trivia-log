import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      /** 코드 블럭 */
      rehypePrism,
      /** `h*`에 id 넣어줌 */
      rehypeSlug,
      /** 헤딩 */
      [rehypeAutolinkHeadings, { properties: { className: ["anchor"] } }],
    ],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
