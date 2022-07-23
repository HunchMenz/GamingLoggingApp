import buildRequest from "./buildRequest";
// TODO: define each type of requests
export default {
  home: {
    Trending: {
      title: "Trending",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90;"
      ),
    },
    Horror: {
      title: "Horror",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90;"
      ),
    },
    Adventure: {
      title: "Adventure",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90;"
      ),
    },
  },
};
