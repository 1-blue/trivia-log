import { getAllPosts } from "#/libs/server";
import { createClientFromServer } from "#/supabase/server";

import Nav from "#/components/layout/Nav";
import ThemeDropdown from "#/components/layout/Header/ThemeDropdown";
import KeyBar from "#/components/layout/Header/KeyBar";

const postMetadatas = getAllPosts();

const Header: React.FC = async () => {
  const supabase = createClientFromServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <header className="navbar sticky top-4 z-10 mx-auto max-w-7xl rounded-box bg-base-100 shadow-xl">
      <Nav />
      <div className="flex-none gap-2">
        <KeyBar
          isLoggedIn={isLoggedIn}
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
