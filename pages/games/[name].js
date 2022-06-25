import { useRouter } from "next/router";
import React from "react";
import NavBar from "../../components/NavBar";
import Poster from "../../components/Poster";
import buildRequest from "../../utils/igdb/buildRequest";

import Style from "../../styles/Game.module.css";

function GamePage({ game }) {
  const router = useRouter();
  // const { name } = router.query;

  console.log(game);

  const Background = game.game.screenshots
    ? "https:" +
    game.game.screenshots[0].url.replace("t_thumb", "t_screenshot_big")
    : "https://bulma.io/images/placeholders/128x128.png";

  return (
    <div>
      <NavBar />
      {/* <div className={Style["gamepage-header"]}> */}
      <div className={Style["bg-container"]}>
        <div
          className={Style["bg-img"]}
          style={{
            backgroundImage:
              "linear-gradient(rgba(7, 18, 36, 0.4), rgb(7, 18, 36)), url(" +
              Background +
              ")",
          }}
        >
          <div className={Style["poster-cover"]}>
            <Poster key={game.game} image={game.game} imageClass={"bigImage"} />
            <div className={Style["poster-content"]} style={{ float: "left" }}>
              <h1 className={`title is-1 ${Style.gameTitle}`}>{game.name}</h1>
              Rating: {game.game.rating.toFixed(0)}
            </div>
          </div>
        </div>
      </div>
      {/* <div className={Style.moveUp}>
        <div>
          <Poster key={game.game} image={game.game} imageClass={"bigImage"} />
        </div>
        <div style={{ float: "left" }}>
          <h1 className={`title is-3 ${Style.gameTitle}`}>{game.name}</h1>
        </div>
      </div> */}
      <div className={Style["bg-under"]}>
        {game.game.summary}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;
  const fields = [
    "alternative_name",
    "character",
    "checksum",
    "collection",
    "company",
    "description",
    "name",
    "platform",
    "published_at",
    "test_dummy",
    "theme",
    "game.rating",
    "game.total_rating",
    "game.cover.url",
    "game.screenshots.url",
    "game.screenshots.height",
    "game.summary",
    "game.storyline",
  ];
  const filter = 'where game.slug = "' + name + '";';
  const query = "fields " + fields.join(",") + ";" + filter;

  const response = await buildRequest("search", query);

  // console.log(response[0]);

  return {
    props: { game: response[0] },
  };
}

export default GamePage;
