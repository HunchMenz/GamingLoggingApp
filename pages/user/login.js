import NavBar from "../../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faCheck, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

function Login({ providers, csrfToken }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signinUser = async (e) => {
    e.preventDefault();

    let options = {
      redirect: false,
      email,
      password,
    };
    // callbackUrl: `${window.location.origin}/`,

    const res = await signIn("credentials", options);
    setMessage(null);
    if (res?.error) {
      setMessage(res.error);
    } else return router.push("/user");
  };

  return (
    <div>
      <NavBar />
      <h1 className="title is-1">Login Page</h1>
      <div className="centered">
        <div className="card" style={{ borderColor: "rgb(215 225 223)" }}>
          <div className="notification is-primary">
            <h1 className="title is-3">Login</h1>
          </div>
          <div className="columns is-centered">
            {Object.values(providers).map((provider) => {
              if (provider.name !== "Username/Email")
                return (
                  <div key={provider.name} className="field">
                    <button
                      className="button"
                      onClick={() => signIn(provider.id)}
                    >
                      Sign in with {provider.name}
                    </button>
                  </div>
                );
            })}
          </div>
          <div className="columns is-centered is-vcentered">
            <hr style={{ width: "30%" }} />
            <span style={{ color: "darkgrey", padding: "0px 10px" }}>OR</span>
            <hr style={{ width: "30%" }} />
          </div>
          <div className="card-content" style={{ paddingTop: "0rem" }}>
            <form action="">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <span className="icon is-small is-right">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                </p>
              </div>
              <p style={{ color: "red" }}>{message}</p>
              <div className="field">
                <p className="control">
                  <button
                    type="submit"
                    className="button is-success"
                    onClick={(e) => signinUser(e)}
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
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

export default Login;
