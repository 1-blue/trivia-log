import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { ROUTES } from "#/constants";

import NavBall from "#/components/layout/Nav/NavBall";
import NavIcon from "#/components/layout/Nav/NavIcon";

const ROOT_PATHNAME = "/";
const isRootPathname = (path: string) => path === ROOT_PATHNAME;

const Nav: React.FC = () => {
  return (
    <nav className="flex-1">
      {/* sm 이하인 경우 */}
      <div className="dropdown-start dropdown sm:hidden">
        <button type="button" className="btn btn-ghost text-xl">
          <Bars3Icon className="h-8 w-8 text-current" />
        </button>
        <ul className="menu dropdown-content z-[1] mt-1 w-52 rounded-box bg-base-100 p-2 shadow">
          {ROUTES.map(({ path, label, Outline, Solid }) => (
            <li key={path}>
              <Link href={path}>
                <NavIcon
                  path={path}
                  outline={<Outline className="h-5 w-5" />}
                  solid={<Solid className="h-5 w-5" />}
                />
                <span>{label}</span>
                <NavBall path={path} position="horizontal" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* sm 이상인 경우 */}
      <div className="hidden sm:flex">
        {ROUTES.map(({ path, label, Outline, Solid }) => (
          <Link key={path} href={path} className="btn btn-ghost relative">
            <NavIcon
              path={path}
              outline={
                <Outline
                  className={isRootPathname(path) ? "h-8 w-8" : "h-5 w-5"}
                />
              }
              solid={
                <Solid
                  className={isRootPathname(path) ? "h-8 w-8" : "h-5 w-5"}
                />
              }
            />
            {!isRootPathname(path) && <span>{label}</span>}
            <NavBall path={path} />
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
