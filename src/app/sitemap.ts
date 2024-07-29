import type { MetadataRoute } from "next";

import { getAllPostMetadata } from "#/libs";
import { ROUTES } from "#/constants";
import type { Route } from "#/types";

// TODO: 태그에 대한 동적 사이트맵도 추가하기

export default function sitemap(): MetadataRoute.Sitemap {
  const postMetadatas = getAllPostMetadata();

  return [
    ...ROUTES.filter((route): route is Required<Route> => !!route.sitemap).map(
      ({ path, sitemap }) => ({
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}${path}`,
        priority: sitemap.priority,
        lastModified: sitemap.lastmod,
        changeFrequency: sitemap.changefreq,
      }),
    ),
    ...postMetadatas.map((postMetadata) => ({
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/${postMetadata.path}`,
      priority: postMetadata.sitemap.priority,
      lastModified: postMetadata.sitemap.lastmod,
      changeFrequency: postMetadata.sitemap.changefreq,
    })),
  ];
}
