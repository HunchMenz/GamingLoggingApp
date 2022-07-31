// import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
// import { themeChange } from "theme-change";
import { useGameListContext } from "../context/gameList";

import ThemeChanger from "./ThemeChanger";

function NavBar() {
  const { user } = useGameListContext();

  return (
    //Make the derk mode detect :)
    <>
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <Link href="/">
            <a className="btn btn-ghost border-none hover:bg-transparent normal-case text-5xl primary-content">
              <p className="text-highlight">G</p>
              <p className="text-primary">-List</p>
            </a>
          </Link>
        </div>
        <div className="flex-1">
          <ul className="menu menu-horizontal p-0 text-base-content text-xl font-bold">
            <li>
              <Link href="/testImages">
                <a className="bg-transparent hover:text-hovered focus:text-selected">
                  Test Images
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className="bg-transparent hover:text-hovered focus:text-selected">
                  Browse
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className="bg-transparent hover:text-hovered focus:text-selected">
                  Users
                </a>
              </Link>
            </li>
            <li>
              <Link href="/user/list">
                <a className="bg-transparent hover:text-hovered focus:text-selected">
                  Game List
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end mr-5 text-base-content">
          <ThemeChanger />
        </div>
        {user ? (
          <div className="dropdown dropdown-end mr-5 text-base-content">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={user.image || "https://via.placeholder.com/150"}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                />
              </div>
            </label>
            <ul
              tabindex="0"
              class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="bg-transparent hover:text-hovered focus:text-selected text-xl font-bold px-4 py-3"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </div>
    </>
  );
}

export default NavBar;
