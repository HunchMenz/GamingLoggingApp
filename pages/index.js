import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";

// Icon Imports
import { FcPlus } from "react-icons/fc";
import { CgPlayListRemove } from "react-icons/cg";
import { GrFormAdd } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { IconContext } from "react-icons/lib";

import buildRequest from "../utils/buildRequest";
import ButtonCard from "../components/ButtonCard";
import PosterButtonCard from "../components/PosterButtonCard";
import Slider from "../components/Slider";
import SliderItem from "../components/SliderItem";

export default function Home({ gameMasterList }) {
  return (
    <div>
      <NavBar />
      Temp Words
      <Slider gameProp={gameMasterList.gameList0} sliderTitle="Top Games" />
    </div>
  );
}

// {isAdded ? (
//   <IconContext.Provider value={{ color: "black", className: "remove" }}>
//     <div className="cursor-pointer">
//       <CgPlayListRemove style={{ position: "absolute" }} />
//     </div>
//   </IconContext.Provider>
// ) : (
//   <div className="cursor-pointer">
//     <FcPlus
//       style={{ position: "absolute" }}
//       onClick={() => {
//         setIsAdded(addGameToList());
//       }}
//     />
//   </div>
// )}

export async function getServerSideProps() {
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
  ];

  const filter_0 =
    "sort aggregated_rating_count desc; where aggregated_rating >= 90; limit 20;";

  const query_0 = "fields " + fields.join(",") + ";" + filter_0;

  const response_0 = await buildRequest("igdb", "games", query_0);

  const gameMasterList = {
    gameList0: response_0,
  };

  return {
    props: { gameMasterList: gameMasterList },
  };
}
