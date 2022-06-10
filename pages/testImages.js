import React from "react";
import Image from "next/image";
import buildRequest from "../utils/igdb/buildRequest";

function Test({ gameList }) {
  return (
    <div>
      <h1>Test Page</h1>
      {gameList.map((game) => {
        let imgSrc = "https:" + game.url.replace("t_thumb", "t_cover_big");
        return <Image src={imgSrc} width={100} height={100}></Image>;
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const fields = [
    "alpha_channel",
    "animated",
    "checksum",
    "game",
    "height",
    "image_id",
    "url",
    "width",
  ];

  const query = "fields " + fields.join(",") + ";";

  const response = await buildRequest("covers", query);

  // console.log(response);

  return {
    props: { gameList: response },
  };
}

export default Test;
