import buildRequest from "../utils/buildRequest";
import Slider from "../components/Slider";

export default function Home({ gameMasterList }) {
  // console.log(gameMasterList.gameList);
  return (
    <div>
      Temp Words
      <Slider gameProp={gameMasterList.gameList} sliderTitle="Top Games" />
      {/* <Frame
        gameList={gameMasterList.gameList}
        iconList={gameMasterList.steamGridIcons}
      /> */}
    </div>
  );
}

export async function getServerSideProps() {
  // IGDB
  const fields = [
    "name",
    "rating",
    "slug",
    "cover",
    "cover.url",
    "summary",
    "genres",
    "genres.name",
    "screenshots.url",
    "platforms.abbreviation",
    "platforms.platform_logo.url",
    "total_rating",
    "release_dates.date",
    "aggregated_rating_count",
    "artworks.url",
  ];

  const filter =
    "sort aggregated_rating_count desc; where aggregated_rating >= 90; limit 20;";

  const query = "fields " + fields.join(",") + ";" + filter;

  const response = await buildRequest("igdb", "games", query);

  // SteamGridDB \\
  // Get game id by searching using slug field
  const steamGridGamePromises = response.map((game) => {
    return buildRequest("steamgrid", `search/autocomplete/${game.slug}`, "", {
      method: "GET",
    });
  });

  let steamGridGameResponse = await Promise.all(steamGridGamePromises);

  // Use game ID to grab game Icons
  const steamGridIconPromises = steamGridGameResponse.map((game) => {
    return buildRequest(
      "steamgrid",
      `icons/game/${game.data ? game.data[0].id : ""}`,
      "",
      {
        method: "GET",
      }
    );
  });

  let steamGridIconResponse = await Promise.all(steamGridIconPromises);

  // const steamGridResponse = {};

  const gameMasterList = {
    gameList: response,
    steamGridGames: steamGridGameResponse,
    steamGridIcons: steamGridIconResponse,
  };

  return {
    props: { gameMasterList: gameMasterList },
  };
}
