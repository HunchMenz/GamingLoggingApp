import { useRouter } from "next/router";
import React from "react";
import NavBar from "../../components/NavBar";
import Poster from "../../components/Poster";
import buildRequest from "../../utils/igdb/buildRequest";

function GamePage({ game }) {
  const router = useRouter();
  // const { name } = router.query;

  console.log(game);

  return (
    <div>
      <NavBar />
      <h1 className="title is-3">
        Page for specific Game ({game.game.id}: {game.name})
      </h1>
      <Poster key={game.game} image={game.game} imageClass={"bigImage"} />
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
    "game",
    "name",
    "platform",
    "published_at",
    "test_dummy",
    "theme",
    "game.cover.url",
  ];
  const filter = 'where game.slug = "' + name + '";';
  const query = "fields " + fields.join(",") + ";" + filter;

  const response = await buildRequest("search", query);

  console.log(response[0].game.cover);

  return {
    props: { game: response[0] },
  };
}

export default GamePage;
