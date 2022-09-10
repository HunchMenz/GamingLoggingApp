import buildRequest from "../utils/buildRequest";
import Slider from "../components/Slider";

export default function Home({ gameMasterList }) {
  const handleTest = async () => {
    const endpoint = `search/autocomplete/inside`;
    const query = {};

    const res = await fetch(
      `/api/steamGridDB?endpoint=${encodeURIComponent(endpoint)}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();
    console.log(data);
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
  const igdbEndpoint = "games";
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
    body: JSON.stringify({ query: query, endpoint: igdbEndpoint }),
  });

  const gamesIGDB = await res.json().then((response) => response.data);

  // SteamGridDB \\
  // Get game id by searching using slug field
  const steamGridSearchEndpoint = `search/autocomplete/`;
  const steamGridSearchBody = {
    method: "GET",
    dataList: gamesIGDB.map((game) => game.slug),
  };
  const steamGridSearchResponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/steamGridDB?endpoint=${encodeURIComponent(
      steamGridSearchEndpoint
    )}`,
    {
      method: "POST",
      body: JSON.stringify(steamGridSearchBody),
    }
  );

  const searchRes = await steamGridSearchResponse
    .json()
    .then((response) => response.data);

  // Use game ID to grab game Icons
  const steamGridIconEndpoint = `icons/game/`;
  const steamGridIconBody = {
    method: "GET",
    dataList: searchRes.map((game) => game.id),
  };
  const steamGridIconResponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/steamGridDB?endpoint=${encodeURIComponent(
      steamGridIconEndpoint
    )}`,
    {
      method: "POST",
      body: JSON.stringify(steamGridIconBody),
    }
  );

  const iconRes = await steamGridIconResponse
    .json()
    .then((response) => response.data);

  const gameMasterList = {
    gameList: gamesIGDB,
    steamGridGames: searchRes,
    steamGridIcons: iconRes,
  };

  return {
    props: { gameMasterList: gameMasterList },
  };
}
