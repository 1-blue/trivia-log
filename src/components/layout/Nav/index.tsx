import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { ROUTES } from "#/constants";

import NavBall from "#/components/layout/Nav/NavBall";
import NavIcon from "#/components/layout/Nav/NavIcon";

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
                <NavBall path={path} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* sm 이상인 경우 */}
      <div className="hidden sm:flex">
        {ROUTES.map(({ path, label, Outline, Solid }) => (
          <Link
            key={path}
            href={path}
            className={twMerge(
              "btn btn-ghost relative",
              path === "/" && "text-xl",
            )}
          >
            <NavIcon
              path={path}
              outline={
                <Outline
                  className={path === "/" ? "h-8 w-8 text-xl" : "h-5 w-5"}
                />
              }
              solid={
                <Solid
                  className={path === "/" ? "h-8 w-8 text-xl" : "h-5 w-5"}
                />
              }
            />
            {path !== "/" && <span>{label}</span>}
            <NavBall path={path} greaterThanSmall />
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
