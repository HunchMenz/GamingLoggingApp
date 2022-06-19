import React from "react";
import buildRequest from "../utils/igdb/buildRequest";
import Poster from "../components/Poster";

// import style from "../styles/Test.module.css";

function Test({ gameList }) {
  return (
    <div>
      <h1>Test Page</h1>
      <div className="posterContainer">
        <div className="poster">
          {gameList.map((game) => {
            return <Poster key={game.id} image={game} />;
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const fields = [
    "name",
    "slug",
    "cover.url",
    "platforms.abbreviation",
    "platforms.platform_logo.url",
    "total_rating",
    "release_dates.date",
    "aggregated_rating_count",
  ];
  const filter =
    "sort aggregated_rating_count desc; where aggregated_rating >= 90;";

  const query = "fields " + fields.join(",") + ";" + filter;

  const response = await buildRequest("games", query);

  // console.log(response);

  return {
    props: { gameList: response },
  };
}

export default Test;
