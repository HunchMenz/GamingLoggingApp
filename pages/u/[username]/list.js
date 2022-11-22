import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Frame from "../../../components/Gameshelf/Shelf";

// Context
import { useGameListContext } from "../../../context/gameList";

// Icons
import { AiOutlineFolderAdd } from "react-icons/ai";

//** SHOW ALL PUBLIC LISTS */

function listPage({ gameList, iconList, logoList, notfound }) {
  if (notfound) {
    return <>hello</>;
  }

  const [selectedList, setSelectedList] = useState(gameList[0].name);
  const [gameListTabs, setGameListTabs] = useState(gameList);

  const addList = () => {
    const defaultListRegex = new RegExp(/\bNew List[(d)]?/);
    const defaultListFilter = gameListTabs
      .filter((list) => defaultListRegex.test(list.name))
      .sort();

    console.log(defaultListFilter);

    let defaultListName =
      defaultListFilter.length === 0
        ? "New List"
        : `New List(${defaultListFilter.length + 1})`;

    for (let i = 0; i < defaultListFilter.length; i++) {
      // Catch the next default name number if it is not = length
      if (i !== 0 && defaultListFilter[i].name !== `New List(${i + 1})`) {
        defaultListName = `New List(${i + 1})`;
        break;
      }

      // Make sure the first default name does not have a number
      if (i === 0 && defaultListFilter[i].name !== "New List") {
        defaultListName = "New List";
        break;
      }
    }

    // Default List Values
    const defaultList = {
      name: defaultListName,
      theme: "default",
      games: [],
    };

    setGameListTabs(() => [...gameListTabs, defaultList]);

    console.log(gameListTabs);
  };

  return (
    <>
      <h1>Welcome to the List Page!</h1>
      <div className="tabs mt-10 justify-center">
        {/* Left Column */}
        <div className="flex-1 border-b border-gray-200"></div>

        {/* Middle Column */}
        {gameListTabs.map((list, idx) => (
          <a
            key={`${idx}_${list._id}`}
            className={`tab tab-lg tab-lifted ${
              selectedList === list.name && "tab-active"
            }`}
            onClick={() => setSelectedList(list.name)}
          >
            {list.name}
          </a>
        ))}

        {/* Right Column */}
        <div className="flex-1 border-b border-gray-200">
          <a
            key={`add_0`}
            className={`tab tab-lg tab-lifted`}
            onClick={() => addList()}
          >
            <AiOutlineFolderAdd />
          </a>
        </div>
      </div>
      {iconList?.length === 0 ? (
        <div>LOADING...</div>
      ) : (
        <Frame
          gameList={
            gameListTabs.filter((list) => list.name === selectedList)[0]
          }
          iconList={iconList}
          logoList={logoList}
        />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res, params } = context;

  // get request user session
  const session = await getSession({ req });
  const currUser = session?.user;

  // get dynamic parameter
  const { username } = params;

  // I can reuse this bit for something else...
  /*
  // Check if the session does not exist, and redirect
  if (!session && res) {
    res.writeHead(302, {
      Location: "/login",
    });
    res.end();
    return;
  }
   */

  // Get details associated with "username"
  const user = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user?${new URLSearchParams({
      username: username,
    })}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((response) => response.data);

  // user was successfully found
  if (user) {
    let owner = false;
    // Check if current user has the same username from url
    if (currUser?.id === user._id) {
      owner = true;
    }

    // Get User List
    const userGameList = await fetch(
      `${process.env.NEXTAUTH_URL}/api/list/${user._id}`,
      { method: "GET" }
    ).then((response) => response.json());

    // Flatten IGDB ID's
    const flatArrayOfGameIDs = userGameList.data
      .map((list) => list.games.map((game) => game.IGDB_id))
      .flat();

    // Flatten game slugs
    const flatArrayOfGameSlugs = userGameList.data
      .map((list) => list.games.map((game) => game.slug))
      .flat();

    // Get IGDB data for each game
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
      "external_games",
    ];

    const filter = `where id = (${flatArrayOfGameIDs.join(",")}); limit 20;`;

    const query = "fields " + fields.join(",") + ";" + filter;

    const gameIGDB = await fetch(`${process.env.NEXTAUTH_URL}/api/igdb`, {
      method: "POST",
      body: JSON.stringify({ query: query, endpoint: igdbEndpoint }),
    })
      .then((res) => res.json())
      .then((response) => response.data);

    // Save IGDB data in game list object
    const newGames = userGameList.data.map((list) =>
      list.games.map((game) => ({
        ...game,
        ...gameIGDB.filter((IGDBGame) => IGDBGame.id === game.IGDB_id)[0],
      }))
    );

    let newGameList = [];

    // Overwrite game data array in list with the new game data array
    userGameList.data.forEach((list, idx) => {
      newGameList.push(list);
      newGameList[idx].games = newGames[idx];
    });

    // Get Steam Grid ID's
    const SGSearchEndpoint = "search/autocomplete/";
    const SGSearchBody = {
      method: "GET",
      dataList: flatArrayOfGameSlugs,
    };

    const SGSearchResponse = await fetch(
      `${
        process.env.NEXTAUTH_URL
      }/api/steamGridDB?endpoint=${encodeURIComponent(SGSearchEndpoint)}`,
      {
        method: "POST",
        body: JSON.stringify(SGSearchBody),
      }
    )
      .then((res) => res.json())
      .then((data) => ({ ...data }));

    const SGIDList = SGSearchResponse.data.map((res) => res?.data?.[0].id);

    // Get Steam Grid Icons
    const SGIconEndpoint = `icons/game/`;
    const SGIconBody = {
      method: "GET",
      dataList: SGIDList,
    };

    const SGIconResponse = await fetch(
      `${
        process.env.NEXTAUTH_URL
      }/api/steamGridDB?endpoint=${encodeURIComponent(SGIconEndpoint)}`,
      {
        method: "POST",
        body: JSON.stringify(SGIconBody),
      }
    )
      .then((res) => res.json())
      .then((data) => ({ ...data }));

    const SGIconList = SGIconResponse.data.map((res, idx) => ({
      IGDB_ID: flatArrayOfGameIDs[idx],
      SG_ID: SGIDList[idx],
      url: res?.data[0]?.thumb,
    }));

    // Get Steam Grid Logos
    const SGLogoEndpoint = `logos/game/`;
    const SGLogoBody = {
      method: "GET",
      dataList: SGIDList,
    };

    const SGLogoResponse = await fetch(
      `${
        process.env.NEXTAUTH_URL
      }/api/steamGridDB?endpoint=${encodeURIComponent(SGLogoEndpoint)}`,
      {
        method: "POST",
        body: JSON.stringify(SGLogoBody),
      }
    )
      .then((res) => res.json())
      .then((data) => ({ ...data }));

    const SGLogoList = SGLogoResponse.data.map((res, idx) => ({
      IGDB_ID: flatArrayOfGameIDs[idx],
      SG_ID: SGIDList[idx],
      url: res?.data[0]?.thumb,
    }));

    return {
      props: {
        gameList: newGameList,
        iconList: SGIconList,
        logoList: SGLogoList,
        notfound: 0,
      },
    };
  }

  // user was not found. Display new screen like reddit or steam does
  return {
    props: { notfound: 1 },
  };
}

export default listPage;
