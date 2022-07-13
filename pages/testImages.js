import React from "react";
import buildRequest from "../utils/buildRequest";
import Poster from "../components/Poster";
import NavBar from "../components/NavBar";
import Link from "next/link";

// import style from "../styles/Test.module.css";

function Test({ gameList }) {
  console.log(gameList);
  return (
    <div>
      <NavBar />
      <h1>Test Page</h1>
      <div className="posterContainer">
        <div className="poster">
          {gameList.map((game) => {
            return (
              <Link
                key={game.id}
                href={{
                  pathname: "/games/[name]",
                  query: { name: game.slug },
                }}
              >
                <a>
                  <Poster image={game} imageClass={"grow smImage"} />
                </a>
              </Link>
            );
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

  const response = await buildRequest("igdb", "games", query);

  return {
    props: { gameList: response },
  };
}

export default Test;
