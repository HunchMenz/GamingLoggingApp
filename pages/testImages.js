import React from "react";
import Image from "next/image";
import buildRequest from "../utils/igdb/buildRequest";

// import style from "../styles/Test.module.css";

function Test({ gameList }) {
  return (
    <div>
      <h1>Test Page</h1>
      <div className="posterContainer">
        <div className="poster">
          {gameList.map((game) => {
            // let imgSrc = "https:" + game.url.replace("t_thumb", "t_cover_big");
            return (
              <div key={game.id} className="box posterItem">
                <figure className="image is-128x128 is-2by3">
                  <Image
                    // key={game.id}
                    src={
                      game.cover
                        ? "https:" + game.cover.url.replace("t_thumb", "t_720p")
                        : "https://bulma.io/images/placeholders/128x128.png"
                    }
                    layout="fill"
                    objectFit="contain"
                  />
                </figure>
              </div>
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
  ];

  const query = "fields " + fields.join(",") + ";";

  const response = await buildRequest("games", query);

  // console.log(response);

  return {
    props: { gameList: response },
  };
}

export default Test;
