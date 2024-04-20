import {
  ArchiveBoxIcon as OArchiveBoxIcon,
  CubeIcon as OCubeIcon,
  NewspaperIcon as ONewspaperIcon,
  PuzzlePieceIcon as OPuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon as SArchiveBoxIcon,
  CubeIcon as SCubeIcon,
  NewspaperIcon as SNewspaperIcon,
  PuzzlePieceIcon as SPuzzlePieceIcon,
} from "@heroicons/react/24/solid";

/**
 * + 전체 경로
 *   1. 메인
 *   2. 시리즈
 *   3. 아카이브
 *   4. 실험적
 */
export const ROUTES = [
  { path: "/", Outline: OCubeIcon, Solid: SCubeIcon, label: "메인" },
  {
    path: "/series",
    Outline: ONewspaperIcon,
    Solid: SNewspaperIcon,
    label: "시리즈",
  },
  {
    path: "/archives",
    Outline: OArchiveBoxIcon,
    Solid: SArchiveBoxIcon,
    label: "아카이브",
  },
  {
    path: "/canary",
    Outline: OPuzzlePieceIcon,
    Solid: SPuzzlePieceIcon,
    label: "실험적",
  },
];
