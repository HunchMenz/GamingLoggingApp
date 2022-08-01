import NavBar from "../../components/NavBar";
import { FaLock, FaCheck, FaEnvelope } from "react-icons/fa";
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
        <div className="card shadow-xl bg-white w-96 h-[30em]">
          <div className="card-body">
            <div className="card-title justify-center pt-5 pb-3">
              <h1>LOGIN</h1>
            </div>
            <hr></hr>
            <div class="flex flex-col w-full pt-3">
              <div className="text-center">
                <p >Email</p>
                <input type="text" className="input bg-black input-bordered w-full input-xl text-white"></input>
              </div>
              <div className="text-center mt-5">
                <p >Password</p>
                <input type="text" className="input bg-black input-bordered w-full input-xl text-white"></input>
              </div>
              <div className="divider">OR</div>

              <div>


              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="centered">
        <div className="card" style={{ borderColor: "rgb(215 225 223)" }}>
          <div className="notification is-primary">
            <h1 className="title is-3">Login</h1>
          </div>
          <div className="card-content" style={{ paddingTop: "0rem" }}>
            {Object.values(providers).map((provider, index) => {
              let topMargin = "mt-1";
              if (provider.name !== "Credential") {
                if (index === 0) {
                  topMargin = "";
                }
                return (
                  <button
                    key={provider.name}
                    className={`button is-fullwidth ${topMargin}`}
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                );
              }
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
                    <FaEnvelope />
                  </span>
                  <span className="icon is-small is-right">
                    <FaCheck />
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
                    <FaLock />
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
      </div> */}
    </div >
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
