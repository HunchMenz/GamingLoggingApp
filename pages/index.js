import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";

import buildRequest from "../utils/buildRequest";

export default function Home({ gameList }) {
  return (
    <div>
      <NavBar />
      Temp Words
    </div>
  );
}

export async function getServerSideProps() {
  // const fields = [
  //   "alpha_channel",
  //   "animated",
  //   "checksum",
  //   "game",
  //   "height",
  //   "image_id",
  //   "url",
  //   "width",
  // ];

  const fields = [
    "name",
    "slug",
    "cover.url",
    "platforms.abbreviation",
    "platforms.platform_logo.url",
    "total_rating",
  ];

  const query = "fields " + fields.join(",") + ";";

  const response = await buildRequest("igdb", "games", query);

  return {
    props: { gameList: response },
  };
}
