import { getSession } from "next-auth/react";
import Error from "next/error";

import Slider from "../components/Slider";

export default function Home({ gameMasterList }) {
  const handleTest = async () => {
    const sess = await getSession();
    const method = "POST";

    const res = await fetch(`/api/list/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        method === "POST"
          ? JSON.stringify({ userEmail: sess.user.email, list: "COOP games" }) // POST body
          : JSON.stringify({
              userEmail: sess.user.email,
              gameID: 7342,
              list: "Backlog",
            }), // PUT body
    });

    const data = await res.json();
    console.log(data);
  };

  if (!gameMasterList) {
    return <Error statusCode={404} />;
  }
  return (
    <div>
      Temp Words
      <Slider gameProp={gameMasterList.gameList} sliderTitle="Top Games" />
      <button onClick={() => handleTest()}>Tester</button>
    </div>
  );
}

export async function getServerSideProps() {
  // IGDB \\
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
    dataList: searchRes.map((game) => game.data[0].id),
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
