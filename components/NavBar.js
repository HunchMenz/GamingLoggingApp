import React from "react";
import Image from "next/image";
import Link from "next/link";
import brand from "/public/derpLMAO.png";
import { signIn, signOut, useSession } from "next-auth/react";

function NavBar() {
  const { data, status } = useSession();

  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">
            <Image src={brand} alt="Temp Brand" />
          </a>
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item has-text-white" href="/">
            Home
          </a>

          <Link href="/user/list">
            <a className="navbar-item has-text-white">Games List</a>
          </Link>

          <Link href="/testImages">
            <a className="navbar-item has-text-white">TestImages</a>
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link has-text-white">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {status === "authenticated" ? (
                <a
                  className="button is-light"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <strong>Log Out</strong>
                </a>
              ) : (
                <Link href="/user/login">
                  <a className="button is-light">
                    <strong>Log In</strong>
                  </a>
                </Link>
              )}
              {/* <Link href="/user/register">
                <a className="button is-link">
                  <strong>Sign up</strong>
                </a>
              </Link>
              <Link href="/user/login">
                <a className="button is-light">
                  <strong>Log in</strong>
                </a>
              </Link>
              {status === "authenticated" ? (
                <button
                  onClick={() => {
                    signOut();
                  }}
                >
                  {" "}
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    signIn(undefined, { callbackUrl: "/user" });
                  }}
                >
                  {" "}
                  Sign In
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
