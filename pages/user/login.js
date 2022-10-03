import {
  FaLock,
  FaCheck,
  FaEnvelope,
  FaGithub,
  FaGoogle,
} from "react-icons/fa";
import { IconContext } from "react-icons";

import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/router";

function Login({ providers, csrfToken }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    let options = {
      redirect: false,
      email,
      password,
    };

    const res = await signIn("credentials", options);
    console.log(res);
    if (res?.error) {
      setMessage(res.error);
    } else return router.push("/user");
  };

  return (
    <>
      <div className="justify-center flex w-full mt-14">
        <div className="card shadow-xl bg-base-200 text-base-content w-1/4">
          <div className="card-body">
            <h1 className="card-title justify-center text-3xl">LOGIN</h1>
            <div className="divider"></div>

            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="text-red-600 break-normal">{message}</p>

            <button className="btn gap-2 mt-5" onClick={(e) => handleSignIn(e)}>
              <FaLock />
              Sign in
            </button>

            <div className="divider w-inherit">OR</div>

            <div className="grid gap-2 grid-cols-1">
              {Object.values(providers).map((provider) => {
                if (provider.name !== "Credential") {
                  return (
                    <button
                      key={provider.name}
                      className="btn gap-2"
                      onClick={() => signIn(provider.id)}
                    >
                      {provider.name === "GitHub" ? <FaGithub /> : ""}
                      {provider.name === "Google" ? <FaGoogle /> : ""}
                      Sign in with {provider.name}
                    </button>
                  );
                }
              })}
            </div>

            <div className="grid gap-2 grid-cols-1">
              <Link href="/user/register">
                <a>Don't have an account?</a>
              </Link>
              <Link href="">
                <a>Forgot Password?</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });
  const providers = await getProviders(context);
  const csrfToken = await getCsrfToken(context);

  if (session && res) {
    res.writeHead(302, {
      Location: "/user",
    });
    res.end();
  }
  return {
    props: {
      session: null,
      providers: providers,
      csrfToken: csrfToken,
    },
  };
}

export default Login;
