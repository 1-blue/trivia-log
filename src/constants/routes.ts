import { Route } from "#/types";
import {
  ArchiveBoxIcon as OArchiveBoxIcon,
  CubeIcon as OCubeIcon,
  NewspaperIcon as ONewspaperIcon,
  PuzzlePieceIcon as OPuzzlePieceIcon,
  RectangleStackIcon as ORectangleStackIcon,
} from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon as SArchiveBoxIcon,
  CubeIcon as SCubeIcon,
  NewspaperIcon as SNewspaperIcon,
  PuzzlePieceIcon as SPuzzlePieceIcon,
  RectangleStackIcon as SRectangleStackIcon,
} from "@heroicons/react/24/solid";

/** 전체 경로 */
export const ROUTES: Route[] = [
  {
    path: "/",
    Outline: OCubeIcon,
    Solid: SCubeIcon,
    label: "메인",
    hidden: false,
  },
  {
    path: "/blog",
    Outline: ORectangleStackIcon,
    Solid: SRectangleStackIcon,
    label: "블로그",
    hidden: false,
    subRoutes: [
      {
        path: "/blog/series",
        Outline: ONewspaperIcon,
        Solid: SNewspaperIcon,
        label: "시리즈",
        hidden: false,
      },
      {
        path: "/blog/archives",
        Outline: OArchiveBoxIcon,
        Solid: SArchiveBoxIcon,
        label: "아카이브",
        hidden: false,
      },
    ],
  },

  {
    path: "/canary",
    Outline: OPuzzlePieceIcon,
    Solid: SPuzzlePieceIcon,
    label: "실험적",
    hidden: false,
  },
];
