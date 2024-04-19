import ThemeDropdown from "#/components/ThemeDropdown";

const Header: React.FC = () => {
  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <ThemeDropdown />
      </div>
    </header>
  );
};

export default Header;
