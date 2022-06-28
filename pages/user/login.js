import NavBar from "../../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faCheck, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Login() {
  return (
    <div>
      <NavBar />
      <h1 className="title is-1">Login Page</h1>
      <div className="centered">
        <div className="card" style={{ "border-color": "rgb(215 225 223)" }}>
          <div className="notification is-primary">
            <h1 className="title is-3">Login</h1>
          </div>
          <div className="card-content" style={{ "padding-top": "0rem" }}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="Email" />
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
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">Login</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
