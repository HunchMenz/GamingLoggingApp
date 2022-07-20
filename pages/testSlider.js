import React, { Component } from "react";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import buildRequest from "../utils/buildRequest";

function myCarousel({ gameList }) {
  return (
    <>
      <NavBar />
      <Slider gameProp={gameList} />
    </>
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

export default myCarousel;
