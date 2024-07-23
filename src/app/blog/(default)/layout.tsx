import { getAllPostDate, getAllPostMetadata } from "#/libs";
import { twMerge } from "tailwind-merge";
import Navigation from "./_components/Navigation";
import InfoSection from "./_sections/InfoSection";
import SelectedPostSection from "./_components/SelectedPostSection";

const ARTICLE_STYLE = `mx-auto my-8 max-w-7xl`;

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const dates = getAllPostDate();
  const posts = getAllPostMetadata();

  return (
    <>
      <article
        className={twMerge(ARTICLE_STYLE, "flex flex-col gap-4 xl:flex-row")}
      >
        <InfoSection dates={dates} />
      </article>

      {/* 선택 포스팅 */}
      <SelectedPostSection posts={posts} />

      <Navigation />

      <article>{children}</article>
    </>
  );
};

export default Layout;
