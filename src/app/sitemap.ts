import type { MetadataRoute } from "next";

import { getAllPosts } from "#/libs/server";
import { ROUTES } from "#/constants";
import type { IRoute } from "#/types";

const allPosts = getAllPosts();

/** 재귀적으로 돌아서 `sitemap` 생성 */
const generateSitemap = (routes: IRoute[]): MetadataRoute.Sitemap => {
  return routes.flatMap(({ path, sitemap, subRoutes }) => [
    {
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}${path}`,
      priority: sitemap?.priority,
      lastModified: sitemap?.lastmod,
      changeFrequency: sitemap?.changefreq,
    },
    ...(subRoutes ? generateSitemap(subRoutes) : []), // 하위 경로에 대해 재귀 호출
  ]);
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...generateSitemap(
      ROUTES.filter((route): route is Required<IRoute> => !!route.sitemap),
    ),
    ...allPosts.map((postMetadata) => ({
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}${postMetadata.path}`,
      priority: postMetadata.sitemap.priority,
      lastModified: postMetadata.sitemap.lastmod,
      changeFrequency: postMetadata.sitemap.changefreq,
    })),
  ];
}
