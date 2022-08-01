import buildRequest from "./buildRequest";
// TODO: define each type of requests
export default {
  home: {
    TopGames: {
      id: 0,
      title: "Top Games",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url, screenshots.url, rating, summary; sort aggregated_rating_count desc; where aggregated_rating >= 90; limit 20;"
      ),
    },
    PointandClick: {
      id: 2,
      title: "Point-and-Click",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (2); limit 20;"
      ),
    },
    Fighting: {
      id: 4,
      title: "Fighting",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (4); limit 20;"
      ),
    },
    Shooter: {
      id: 5,
      title: "Shooter",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (5); limit 20;"
      ),
    },
    Music: {
      id: 7,
      title: "Music",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (7); limit 20;"
      ),
    },
    Platform: {
      id: 8,
      title: "Platform",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (8); limit 20;"
      ),
    },
    Puzzle: {
      id: 9,
      title: "Puzzle",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (9); limit 20;"
      ),
    },
    Racing: {
      id: 10,
      title: "Racing",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (10); limit 20;"
      ),
    },
    RTS: {
      id: 11,
      title: "Real Time Strategy",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (11); limit 20;"
      ),
    },
    RPG: {
      id: 12,
      title: "Role Playing Game",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (12); limit 20;"
      ),
    },
    Simulator: {
      id: 13,
      title: "Simulator",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (13); limit 20;"
      ),
    },
    Sport: {
      id: 14,
      title: "Sport",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (14); limit 20;"
      ),
    },
    Strategy: {
      id: 15,
      title: "Strategy",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (15); limit 20;"
      ),
    },
    TurnBased: {
      id: 16,
      title: "Turn-Based Strategy",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (16); limit 20;"
      ),
    },
    Tactical: {
      id: 24,
      title: "Tactical",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (24); limit 20;"
      ),
    },
    // QuizTrivia: {
    //   id: 26,
    //   title: "Quiz/Trivia",
    //   promise: buildRequest(
    //     "igdb",
    //     "games",
    //     "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (26); limit 20;"
    //   ),
    // },
    HackandSlash: {
      id: 25,
      title: "Hack and Slash",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (25); limit 20;"
      ),
    },
    // Pinball: {
    //   id: 30,
    //   title: "Pinball",
    //   promise: buildRequest(
    //     "igdb",
    //     "games",
    //     "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (30); limit 20;"
    //   ),
    // },
    Adventure: {
      id: 31,
      title: "Adventure",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (31); limit 20;"
      ),
    },
    Arcade: {
      id: 33,
      title: "Arcade",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (33); limit 20;"
      ),
    },
    VisualNovel: {
      id: 34,
      title: "Visual Novel",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (34); limit 20;"
      ),
    },
    Indie: {
      id: 32,
      title: "Indie",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (32); limit 20;"
      ),
    },
    CardBoard: {
      id: 35,
      title: "Card and Board Games",
      promise: buildRequest(
        "igdb",
        "games",
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (35); limit 20;"
      ),
    },
    // MOBA: {
    //   id: 36,
    //   title: "MOBA",
    //   promise: buildRequest(
    //     "igdb",
    //     "games",
    //     "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (36); limit 20;"
    //   ),
    // },
  },

  home2: {
    TopGames: {
      id: 0,
      title: "Top Games",
      query:
        "fields name, slug, cover.url, screenshots.url, rating, summary; sort aggregated_rating_count desc; where aggregated_rating >= 90; limit 20;",
    },
    PointandClick: {
      id: 2,
      title: "Point-and-Click",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (2); limit 20;",
    },
    Fighting: {
      id: 4,
      title: "Fighting",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (4); limit 20;",
    },
    Shooter: {
      id: 5,
      title: "Shooter",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (5); limit 20;",
    },
    Music: {
      id: 7,
      title: "Music",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (7); limit 20;",
    },
    Platform: {
      id: 8,
      title: "Platform",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (8); limit 20;",
    },
    Puzzle: {
      id: 9,
      title: "Puzzle",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (9); limit 20;",
    },
    Racing: {
      id: 10,
      title: "Racing",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (10); limit 20;",
    },
    RTS: {
      id: 11,
      title: "Real Time Strategy",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (11); limit 20;",
    },
    RPG: {
      id: 12,
      title: "Role Playing Game",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (12); limit 20;",
    },
    Simulator: {
      id: 13,
      title: "Simulator",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (13); limit 20;",
    },
    Sport: {
      id: 14,
      title: "Sport",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (14); limit 20;",
    },
    Strategy: {
      id: 15,
      title: "Strategy",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (15); limit 20;",
    },
    TurnBased: {
      id: 16,
      title: "Turn-Based Strategy",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (16); limit 20;",
    },
    Tactical: {
      id: 24,
      title: "Tactical",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (24); limit 20;",
    },
    // QuizTrivia: {
    //   id: 26,
    //   title: "Quiz/Trivia",
    //   query: buildRequest(
    //     "igdb",
    //     "games",
    //     "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (26); limit 20;"
    //   ),
    // },
    HackandSlash: {
      id: 25,
      title: "Hack and Slash",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (25); limit 20;",
    },
    // Pinball: {
    //   id: 30,
    //   title: "Pinball",
    //   query: buildRequest(
    //     "igdb",
    //     "games",
    //     "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (30); limit 20;"
    //   ),
    // },
    Adventure: {
      id: 31,
      title: "Adventure",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (31); limit 20;",
    },
    Arcade: {
      id: 33,
      title: "Arcade",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (33); limit 20;",
    },
    VisualNovel: {
      id: 34,
      title: "Visual Novel",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (34); limit 20;",
    },
    Indie: {
      id: 32,
      title: "Indie",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (32); limit 20;",
    },
    CardBoard: {
      id: 35,
      title: "Card and Board Games",
      query:
        "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (35); limit 20;",
    },
    // MOBA: {
    //   id: 36,
    //   title: "MOBA",
    //   query: buildRequest(
    //     "igdb",
    //     "games",
    //     "fields name, slug, cover.url; sort aggregated_rating_count desc; where aggregated_rating >= 90 & genres = (36); limit 20;"
    //   ),
    // },
  },
};
