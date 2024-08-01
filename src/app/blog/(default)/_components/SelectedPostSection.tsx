"use client";

import useCalendarStore from "#/store/calendar";
import { IPostWithETC } from "#/types";
import dayjs from "dayjs";
import PostSection from "../_sections/PostSection";
import { twMerge } from "tailwind-merge";
import { SECTION_STYLE } from "../_constant";

const ARTICLE_STYLE = `mx-auto my-8 max-w-7xl`;

interface Props {
  posts: IPostWithETC[];
}

const SelectedPostSection: React.FC<Props> = ({ posts }) => {
  const { selectedDate } = useCalendarStore();

  const targetPosts = posts.filter((post) =>
    dayjs(post.date).isSame(selectedDate, "day"),
  );

  if (targetPosts.length === 0) return null;

  return (
    <article className={twMerge(ARTICLE_STYLE, "flex flex-col gap-6")}>
      <PostSection
        title={`${dayjs(selectedDate).format("YYYY-MM-DD")} 포스팅`}
        posts={targetPosts}
        fixedLayout="list"
      />
    </article>
  );
};

export default SelectedPostSection;
