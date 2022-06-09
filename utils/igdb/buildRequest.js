import axios from "axios";
import paramOverride from "../paramOveride";

const endpoint = "https://api.igdb.com/v4/";

const headers = new Headers();
headers.append("Client-ID", process.env.IGDB_CLIENT_ID);
headers.append("Authorization", `Bearer ${process.env.IGDB_AUTH_TOKEN}`);

const buildRequest = async (path, params, options = {}) => {
  // const optionsOverride = paramOverride(
  //   { headers, mode: "cors", method: "POST" },
  //   options
  // );

  // const url = `${endpoint}${path}?${params.toString()}`;
  // const request = new Request(url, optionsOverride);

  // return fetch(request).then((response) => response.json());

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
    url: "https://api.igdb.com/v4/games",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": process.env.IGDB_CLIENT_ID,
      Authorization: `Bearer ${simple.access_token}`,
    },
    data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;",
  })
    .then((response) => response)
    .catch((err) => {
      console.error(err);
    });

  return res;
  // return "hihi";
};

export default buildRequest;
