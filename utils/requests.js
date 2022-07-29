import buildRequest from "./buildRequest";
// TODO: define each type of requests
export default {
  home: {
    PointandClick: {
      title: "Point-and-Click",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (2); limit 20;"
      ),
    },
    Fighting: {
      title: "Fighting",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (4); limit 20;"
      ),
    },
    Shooter: {
      title: "Shooter",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (5); limit 20;"
      ),
    },
    Music: {
      title: "Music",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (7); limit 20;"
      ),
    },
    Platform: {
      title: "Platform",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (8); limit 20;"
      ),
    },
    Puzzel: {
      title: "Puzzel",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (9); limit 20;"
      ),
    },
    Racing: {
      title: "Racing",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (10); limit 20;"
      ),
    },
    RTS: {
      title: "Real Time Strategy",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (11); limit 20;"
      ),
    },
    RPG: {
      title: "Role Playing Game",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (12); limit 20;"
      ),
    },
    Simulator: {
      title: "Simulator",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (13); limit 20;"
      ),
    },
    Sport: {
      title: "Sport",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (14); limit 20;"
      ),
    },
    Strategy: {
      title: "Strategy",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (15); limit 20;"
      ),
    },
    TurnBased: {
      title: "Turn-Based Strategy",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (16); limit 20;"
      ),
    },
    Tactical: {
      title: "Tactical",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (24); limit 20;"
      ),
    },
    QuizTrivia: {
      title: "Quiz/Trivia",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (26); limit 20;"
      ),
    },
    HackandSlash: {
      title: "Hack and Slash",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (25); limit 20;"
      ),
    },
    // Pinball: {
    //   title: "Pinball",
    //   promise: buildRequest(
    //     "igdb",
    //     "games",
    //     "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (30); limit 20;"
    //   ),
    // },
    Adventure: {
      title: "Adventure",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (31); limit 20;"
      ),
    },
    Arcade: {
      title: "Arcade",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (33); limit 20;"
      ),
    },
    VisualNovel: {
      title: "Visual Novel",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (34); limit 20;"
      ),
    },
    Indie: {
      title: "Indie",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (32); limit 20;"
      ),
    },
    CardBoard: {
      title: "Card and Board Games",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (35); limit 20;"
      ),
    },
    // MOBA: {
    //   title: "MOBA",
    //   promise: buildRequest(
    //     "igdb",
    //     "games",
    //     "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (36); limit 20;"
    //   ),
    // },
  },
};
