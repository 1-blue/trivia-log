import dayjs from "dayjs";

import { getAllPosts } from "#/libs/server";

import InfoSection from "#/app/blog/(default)/_components/sections/InfoSection";
import Navigation from "#/app/blog/(default)/_components/Navigation";
import SelectedPostSection from "#/app/blog/(default)/_components/SelectedPostSection";

const allPosts = getAllPosts();
const dates = allPosts.reduce<Record<string, number>>((prev, curr) => {
  const date = dayjs(curr.date).format("YYYY-MM-DD");
  prev[date] ? prev[date]++ : (prev[date] = 1);
  return prev;
}, {});

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <article className="mx-auto my-8 flex max-w-7xl flex-col gap-4 xl:flex-row">
        <InfoSection dates={dates} />
      </article>

      {/* 선택 포스팅 */}
      <SelectedPostSection posts={allPosts} />

      <Navigation />

      <article>{children}</article>
    </>
  );
};

export default Layout;
