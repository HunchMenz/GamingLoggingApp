import React, { Component } from "react";
import NavBar from "./testNavBar";
import Link from "next/link";
import Poster from "../components/Poster";
import buildRequest from "../utils/buildRequest";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function myCarousel({ gameList }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="mySlider">
        <NavBar />
        <h2 class="title has-text-centered"> Game List </h2>
        <Slider {...settings}>
          {gameList.map((game) => (
            <div class="card">
              <Link
                href={{
                  pathname: "/games/[name]",
                  query: { name: game.slug },
                }}
              >
                <a>
                  <Poster key={game.id} image={game} />
                </a>
              </Link>
              {/* <div className="card-content">
                                    Rating: {game.total_rating.toFixed(0)}
                                </div> */}
              <div>testrrr</div>
              <header class="game-title">{game.name}</header>
            </div>
          ))}
        </Slider>
      </div>
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

  // console.log(response);

  return {
    props: { gameList: response },
  };
}

export default myCarousel;
