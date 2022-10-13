// React Icons
import {
  FaLock,
  // FaCheck,
  FaPencilAlt,
  FaEnvelope,
  FaUser,
  FaGithub,
  FaGoogle,
} from "react-icons/fa";

// Next-Auth
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";

// React
import { useState } from "react";
import { useRouter } from "next/router";

function Register({ providers, csrfToken }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Register User
    const regRes = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    }).then((response) => response.json());

    // If register was successful...
    if (regRes.data) {
      // Create default list
      const listRes = await fetch("/api/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: regRes.data }),
      }).then((response) => response.json());

      // If user list was created...
      if (listRes.data) {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };

        const res = await signIn("credentials", options);
        if (res?.error) {
          setMessage(res.error);
        } else return router.push("/user");
      } else {
        setMessage(listRes.message);
      }
    } else {
      setMessage(regRes.message);
    }
  };

  const handleProviderRegister = async (e, providerID) => {
    e.preventDefault();
    signIn(providerID);
  };

  return (
    <div>
      <div className="justify-center flex w-full mt-14">
        <div className="card shadow-xl bg-base-200 text-base-content w-1/4">
          <div className="card-body">
            <h1 className="card-title justify-center text-3xl">Register</h1>
            <div className="divider"></div>
            <p className="box-border clear-both relative">
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full px-10"
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="absolute h-[3.0em] w-[2.5em] z-10 top-0 items-center inline-flex justify-center left-0">
                <FaUser />
              </span>
            </p>

            <p className="box-border clear-both relative">
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full px-10"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute h-[3.0em] w-[2.5em] z-10 top-0 items-center inline-flex justify-center left-0">
                <FaEnvelope />
              </span>
              {/* example of right icon */}
              {/* <span className="absolute h-[3.0em] w-[2.5em] z-10 top-0 items-center inline-flex justify-center right-0">
                <FaCheck />
              </span> */}
            </p>

            <p className="box-border clear-both relative">
              <input
                type="text"
                placeholder="Password"
                className="input input-bordered w-full px-10"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute h-[3.0em] w-[2.5em] z-10 top-0 items-center inline-flex justify-center left-0">
                <FaLock />
              </span>
            </p>

            <p className="text-red-600 break-normal">{message}</p>

            <button
              className="btn gap-2 mt-5"
              onClick={(e) => handleRegister(e)}
            >
              <FaPencilAlt />
              Sign up
            </button>

            <div className="divider w-inherit">OR</div>

            <div className="grid gap-2 grid-cols-1">
              {Object.values(providers).map((provider) => {
                if (provider.name !== "Credential") {
                  return (
                    <button
                      key={provider.name}
                      className="btn gap-2"
                      onClick={(event) =>
                        handleProviderRegister(event, provider.id)
                      }
                    >
                      {provider.name === "GitHub" ? <FaGithub /> : ""}
                      {provider.name === "Google" ? <FaGoogle /> : ""}
                      Sign in with {provider.name}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
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
    return;
  }
  return {
    props: {
      session: null,
      providers: providers,
      csrfToken: csrfToken,
    },
  };
}

export default Register;
