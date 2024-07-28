import { getAllPostMetadata } from "#/libs";

import Nav from "#/components/layout/Nav";
import ThemeDropdown from "#/components/layout/Header/ThemeDropdown";
import KeyBar from "#/components/layout/Header/KeyBar";

const Header: React.FC = () => {
  const postMetadatas = getAllPostMetadata();

  return (
    <header className="navbar sticky top-4 z-10 mx-auto max-w-7xl rounded-box bg-base-100 shadow-xl">
      <Nav />
      <div className="flex-none gap-2">
        <KeyBar
          keyBarPosts={postMetadatas.map(({ title, path }) => ({
            title,
            path,
          }))}
        />
        <ThemeDropdown />
      </div>
    </header>
  );
};

export default Header;
