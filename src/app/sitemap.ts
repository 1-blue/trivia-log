import type { MetadataRoute } from "next";

import { getAllPosts } from "#/libs";
import { ROUTES } from "#/constants";
import type { IRoute } from "#/types";

const allPosts = getAllPosts();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...ROUTES.filter((route): route is Required<IRoute> => !!route.sitemap).map(
      ({ path, sitemap }) => ({
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}${path}`,
        priority: sitemap.priority,
        lastModified: sitemap.lastmod,
        changeFrequency: sitemap.changefreq,
      }),
    ),
    ...allPosts.map((postMetadata) => ({
      url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/${postMetadata.path}`,
      priority: postMetadata.sitemap.priority,
      lastModified: postMetadata.sitemap.lastmod,
      changeFrequency: postMetadata.sitemap.changefreq,
    })),
  ];
}
