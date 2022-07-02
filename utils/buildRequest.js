import axios from "axios";
import paramOverride from "./paramOveride";

const baseCollection = {
  twitchToken: process.env.TWITCH_HOST_TOKEN,
  igdb: process.env.IGDB_HOST,
};

/**
 * Helper function to build and send a request to any base url listed in the environment variables
 * @param {string} base - keyword used to select base url from environment variables.
 * @param {string} path - endpoint path.
 * @param {string} params - body.
 * @param {objects} options - optional object to add/override request options.
 * @returns response promise
 */
const buildRequest = async (base, path, params, options = {}) => {
  const url = `${baseCollection[base]}${path}`;
  const headers = {};

  if (base === "igdb") {
    const authData = {
      client_id: process.env.IGDB_CLIENT_ID,
      client_secret: process.env.IGDB_CLIENT_SECRET,
      grant_type: "client_credentials",
    };

    const retrieveToken = await axios
      .post(baseCollection["twitchToken"], authData, {
        Accept: "application/json",
      })
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
      });

    headers["Client-ID"] = process.env.IGDB_CLIENT_ID;
    headers["Authorization"] = `Bearer ${retrieveToken.access_token}`;
  }

  const optionsOverride = paramOverride(
    { headers, mode: "cors", method: "POST" },
    options
  );

  const res = axios({
    url: url,
    method: optionsOverride.method,
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
