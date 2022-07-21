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
      <div className="navbar bg-primary">
        <div className="flex-1">
          <Link href="/">
            <a
              className="btn btn-ghost normal-case text-xl primary-content"
              href="/"
            >
              G-List
            </a>
          </Link>
        </div>
        <div className="flex-none">
          {/* <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <div
            tabIndex="0"
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div> */}
          <div className="flex-none">
            <ul className="menu menu-horizontal p-0 primary-focus">
              <li>
                <select data-choose-theme>
                  <option value="">default</option>
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
