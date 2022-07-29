import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { themeChange } from "theme-change";
import { useGameListContext } from "../context/gameList";

function NavBar() {
  const { user, gameList } = useGameListContext();
  const themeValues = ["cupcake", "cyberpunk", "light", "dark", "bumblebee"];
  useEffect(() => {
    themeChange(false);
  });
  return (
    <>
      <div className="navbar bg-ghost">
        <div className="text-left">
          <Link href="/">
            <a className="btn bg-transparent border-none hover:bg-transparent normal-case text-5xl primary-content">
              <p className="text-highlight">G</p>
              <p className="text-primary">-List</p>
            </a>
          </Link>
        </div>
        <div className="flex-1">
          <div className="flex-1">
            <ul className="menu menu-horizontal p-0 text-xl font-bold">
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
              <li>
                <select
                  data-choose-theme
                  className="bg-transparent hover:bg-primary"
                >
                  {themeValues.map((value) => (
                    <option
                      className="text-primary"
                      key={value.toLowerCase()}
                      value={value.toLowerCase()}
                    >
                      {value}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </div>
          {user ? (
            <div className="dropdown dropdown-end text-white mr-5">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.image} />
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
              className="bg-transparent hover:text-hovered focus:text-selected text-white text-xl font-bold px-4 py-3"
              onClick={() => signIn()}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
