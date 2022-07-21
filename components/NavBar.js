import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import brand from "/public/derpLMAO.png";
import { signIn, signOut, useSession } from "next-auth/react";
import { themeChange } from "theme-change";

function NavBar() {
  const { data, status } = useSession();
  const themeValues = ["cupcake", "cyberpunk", "light", "dark", "bumblebee"];
  useEffect(() => {
    themeChange(false);
  });
  return (
    <>
      <div className="navbar bg-ghost">
        <div>
          <Link href="/">
            <a
              className="btn btn-ghost normal-case text-5xl primary-content"
              href="/"
            >
              <p class="text-highlight">G</p><p className="text-primary">-List</p>
            </a>
          </Link>
        </div>
        <div className="flex-1">
          <div className="flex-1">
            <ul className="menu menu-horizontal p-0 text-white text-xl font-bold">
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href="/testImages">
                  <a>Test Images</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a>Page3</a>
                </Link>
              </li>
              <li>
                <select data-choose-theme>
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
          <div className="dropdown dropdown-end text-white">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-blue-900 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
