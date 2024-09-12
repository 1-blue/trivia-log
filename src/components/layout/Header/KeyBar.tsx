"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import CommandPalette, {
  filterItems,
  getItemIndex,
  useHandleOpenCommandPalette,
} from "react-cmdk";
import { useTheme } from "next-themes";

import "react-cmdk/dist/cmdk.css";

import { ME, ROUTES, THEMES } from "#/constants";
import type { IPost } from "#/types";
import { createClientFromClient } from "#/supabase/client";
import useToastStore from "#/store/toast";

type KeyBarPost = Pick<IPost, "title" | "path">;

interface Props {
  isLoggedIn: boolean;
  keyBarPosts: KeyBarPost[];
}

/** 초기 게시글 개수 */
const INITIAL_POST_LIMIT = 5;

const KeyBar: React.FC<Props> = ({ isLoggedIn, keyBarPosts }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();
  const [page] = useState<"root">("root");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<KeyBarPost[]>([]);

  // `cmd + k`를 이용해서 검색창 열기 설정
  useHandleOpenCommandPalette(setOpen);

  /** 게시글 목록 초기화 */
  const resetSearchPosts = useCallback(() => {
    setPosts(keyBarPosts.slice(0, INITIAL_POST_LIMIT));
  }, [keyBarPosts]);

  // 최초 게시글 목록 설정 ( `INITIAL_POST_LIMIT`개 )
  useEffect(resetSearchPosts, [resetSearchPosts]);

  /** 게시글 검색 시 실행할 함수 ( `Metadata`의 `title`을 기준으로 검색 ) */
  const onChangeSearch = (keyword: string) => {
    setSearch(keyword);

    // 입력창을 비우면 초기화
    if (keyword.trim().length === 0) return resetSearchPosts();

    setPosts(
      keyBarPosts.filter((keyBarPosts) => keyBarPosts.title.includes(keyword)),
    );
  };

  const githubLinkRef = useRef<null | HTMLAnchorElement>(null);

  const supabase = createClientFromClient();
  const { openToast } = useToastStore();
  const onLogIn = async (provider: "github" | "google" | "kakao") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/callback?next=${pathname}`,
      },
    });

    if (error) return openToast({ type: "error", message: error.message });

    openToast({
      type: "info",
      message: `"${provider[0].toUpperCase()}${provider.slice(1)}" 로그인 요청중입니다.\n잠시만 기다려주세요!`,
    });
  };
  const onLogOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) return openToast({ type: "error", message: error.message });

    openToast({ type: "success", message: "로그아웃 되었습니다." });
  };

  const filteredItems = useMemo(
    () =>
      filterItems(
        [
          // 게시글
          {
            id: "posts",
            heading: "게시글",
            items: posts.map((post) => ({
              id: post.title,
              children: post.title,
              icon: "DocumentTextIcon",
              onClick: () => router.push(post.path),
            })),
          },
          // 페이지
          {
            id: "pages",
            heading: "페이지",
            items: ROUTES.map((route) => ({
              id: route.path,
              children: route.label,
              icon: route.path === pathname ? route.Solid : route.Outline,
              onClick: () => router.push(route.path),
            })),
          },
          // 테마
          {
            id: "theme",
            heading: "테마",
            items: THEMES.map((theme) => ({
              id: theme.value,
              children: theme.label,
              icon: theme.Icon,
              onClick: () => setTheme(theme.value),
            })),
          },
          // 내 정보
          {
            id: "information",
            heading: "개발자 정보",
            items: [
              {
                id: "github",
                children: "깃허브 ( 1-blue )",
                icon: "CodeBracketIcon",
                onClick: () => githubLinkRef.current?.click(),
              },
              {
                id: "email",
                children: `이메일 ( ${ME.EMAIL} )`,
                icon: "EnvelopeOpenIcon",
                href: `mailto:${ME.EMAIL}`,
              },
              {
                id: "phone",
                children: `휴대폰 번호 ( ${ME.PHONE} )`,
                icon: "PhoneIcon",
                href: `tel:${ME.PHONE}`,
              },
            ],
          },
          // 옵션
          {
            id: "option",
            heading: "옵션",
            items: isLoggedIn
              ? [
                  {
                    id: "logout",
                    children: "로그아웃",
                    icon: "ArrowRightOnRectangleIcon",
                    onClick: onLogOut,
                  },
                ]
              : [
                  {
                    id: "github-login",
                    children: "깃헙 로그인",
                    icon: "ArrowLeftOnRectangleIcon",
                    onClick: () => onLogIn("github"),
                  },
                  {
                    id: "google-login",
                    children: "구글 로그인",
                    icon: "ArrowLeftOnRectangleIcon",
                    onClick: () => onLogIn("google"),
                  },
                  {
                    id: "kakao-login",
                    children: "카카오 로그인",
                    icon: "ArrowLeftOnRectangleIcon",
                    onClick: () => onLogIn("kakao"),
                  },
                ],
          },
        ],
        search,
      ),
    [posts, search, pathname, isLoggedIn],
  );

  return (
    <>
      <a
        href={ME.GITHUB_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="hidden"
        tabIndex={0}
        ref={githubLinkRef}
      />

      <button
        type="button"
        className="btn btn-ghost space-x-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-sm">검색 ...</span>
        <span className="kbd text-xs">⌘ K</span>
      </button>

      <CommandPalette
        onChangeSearch={onChangeSearch}
        search={search}
        onChangeOpen={setOpen}
        isOpen={open}
        page={page}
        placeholder="ex) Akaps"
      >
        <CommandPalette.Page id="root">
          {filteredItems.length ? (
            filteredItems.map((list) => (
              <CommandPalette.List key={list.id} heading={list.heading}>
                {list.items.map(({ id, ...rest }) => (
                  <CommandPalette.ListItem
                    key={id}
                    index={getItemIndex(filteredItems, id)}
                    {...rest}
                  />
                ))}
              </CommandPalette.List>
            ))
          ) : (
            <CommandPalette.FreeSearchAction />
          )}
        </CommandPalette.Page>
      </CommandPalette>
    </>
  );
};

export default KeyBar;
