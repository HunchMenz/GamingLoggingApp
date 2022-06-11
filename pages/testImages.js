import React from "react";
import Image from "next/image";
import buildRequest from "../utils/igdb/buildRequest";

// import style from "../styles/Test.module.css";

function Test({ gameList }) {
  return (
    <div>
      <h1>Test Page</h1>
      <div class="posterContainer">
        <div class="box poster">
          {gameList.map((game) => {
            // let imgSrc = "https:" + game.url.replace("t_thumb", "t_cover_big");
            return (
              <div class="box posterItem">
                <figure class="image is-128x128">
                  <Image
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
