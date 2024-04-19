import { getAllPostMetadata } from "#/libs";

import ThemeDropdown from "#/components/ThemeDropdown";
import KeyBar from "#/components/KeyBar";

const Header: React.FC = () => {
  const postMetadatas = getAllPostMetadata();

  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <KeyBar
            keyBarPosts={postMetadatas.map(({ title, path }) => ({
              title,
              path,
            }))}
          />
        </div>
        <ThemeDropdown />
      </div>
    </header>
  );
};

export default Header;
