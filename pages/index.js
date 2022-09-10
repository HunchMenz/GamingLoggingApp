import buildRequest from "../utils/buildRequest";
import Slider from "../components/Slider";

export default function Home({ gameMasterList }) {
  const handleTest = async () => {
    const endpoint = "games";
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

    const res = await fetch("/api/igdb", {
      method: "POST",
      body: JSON.stringify({ query: query, endpoint: endpoint }),
    });

    const data = await res.json();
  };
  return (
    <div>
      Temp Words
      <Slider gameProp={gameMasterList.gameList} sliderTitle="Top Games" />
      <button onClick={() => handleTest()}>Tester</button>
    </div>
  );
}

export async function getServerSideProps() {
  // IGDB
  const endpoint = "games";
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

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/igdb`, {
    method: "POST",
    body: JSON.stringify({ query: query, endpoint: endpoint }),
  });

  const gamesIGDB = await res.json().then((response) => response.data);

  // SteamGridDB \\
  // Get game id by searching using slug field
  const steamGridGamePromises = gamesIGDB.map((game) => {
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
    gameList: gamesIGDB,
    steamGridGames: steamGridGameResponse,
    steamGridIcons: steamGridIconResponse,
  };

  return {
    props: { gameMasterList: gameMasterList },
  };
}
