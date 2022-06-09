import axios from "axios";
import paramOverride from "../paramOveride";

const endpoint = "https://api.igdb.com/v4/";

const headers = {};
headers["Client-ID"] = process.env.IGDB_CLIENT_ID;
// headers.append("Authorization", `Bearer ${process.env.IGDB_AUTH_TOKEN}`);

const buildRequest = async (path, params, options = {}) => {
  const optionsOverride = paramOverride(
    { headers, mode: "cors", method: "POST" },
    options
  );

  const url = `${endpoint}${path}`;
  const authData = {
    client_id: process.env.IGDB_CLIENT_ID,
    client_secret: process.env.IGDB_CLIENT_SECRET,
    grant_type: "client_credentials",
  };

  const simple = await axios
    .post("https://id.twitch.tv/oauth2/token", authData, {
      Accept: "application/json",
    })
    .then((response) => response.data);

  headers["Authorization"] = `Bearer ${simple.access_token}`;

  // const advanced = axios({
  //   url: "https://id.twitch.tv/oauth2/token",
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //   },
  //   data: authData,
  // })
  //   .then((response) => response.data)
  //   .catch((err) => {
  //     console.error(err);
  //   });

  const res = axios({
    url: url,
    method: "POST",
    headers: optionsOverride.headers,
    data: params.toString(),
  })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
    });

  return res;
};

export default buildRequest;
