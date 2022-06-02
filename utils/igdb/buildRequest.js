const endpoint = "https://api.igdb.com/v4/";

const headers = new Headers();
headers.append("Client-ID", process.env.IGDB_CLIENT_ID);
headers.append("Authorization", `bearer ${process.env.IGDB_AUTH_TOKEN}`);

const buildRequest = (path, params, options = {}) => {
  const optionsOverride = paramOverride(
    { headers, mode: "cors", method: "GET" },
    options
  );

  const url = `${endpoint}${path}?${params.toString()}`;
  const request = new Request(url, optionsOverride);

  return fetch(request).then((response) => response.json());
};

export default buildRequest;
