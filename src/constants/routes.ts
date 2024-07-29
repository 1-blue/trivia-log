import {
  ArchiveBoxIcon as OArchiveBoxIcon,
  CubeIcon as OCubeIcon,
  NewspaperIcon as ONewspaperIcon,
  PuzzlePieceIcon as OPuzzlePieceIcon,
  RectangleStackIcon as ORectangleStackIcon,
  FireIcon as OFireIcon,
} from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon as SArchiveBoxIcon,
  CubeIcon as SCubeIcon,
  NewspaperIcon as SNewspaperIcon,
  PuzzlePieceIcon as SPuzzlePieceIcon,
  RectangleStackIcon as SRectangleStackIcon,
  FireIcon as SFireIcon,
} from "@heroicons/react/24/solid";

import type { Route, Sitemap } from "#/types";

const DEFAULT_SITEMAP: Sitemap = {
  priority: 0.7,
  lastmod: new Date().toISOString(),
  changefreq: "weekly",
};

/** 전체 경로 */
export const ROUTES: Route[] = [
  {
    path: "/",
    Outline: OCubeIcon,
    Solid: SCubeIcon,
    label: "메인",
    hidden: false,
    sitemap: DEFAULT_SITEMAP,
  },
  {
    path: "/blog",
    Outline: ORectangleStackIcon,
    Solid: SRectangleStackIcon,
    label: "블로그",
    hidden: false,
    sitemap: DEFAULT_SITEMAP,
    subRoutes: [
      {
        path: "/blog/series",
        Outline: ONewspaperIcon,
        Solid: SNewspaperIcon,
        label: "시리즈",
        hidden: false,
        sitemap: DEFAULT_SITEMAP,
      },
      {
        path: "/blog/archives",
        Outline: OArchiveBoxIcon,
        Solid: SArchiveBoxIcon,
        label: "아카이브",
        hidden: false,
        sitemap: DEFAULT_SITEMAP,
      },
    ],
  },
  {
    path: "/portfolio",
    Outline: OFireIcon,
    Solid: SFireIcon,
    label: "포트폴리오",
    hidden: false,
    sitemap: DEFAULT_SITEMAP,
  },
  {
    path: "/canary",
    Outline: OPuzzlePieceIcon,
    Solid: SPuzzlePieceIcon,
    label: "실험적",
    hidden: false,
    sitemap: DEFAULT_SITEMAP,
  },
];
