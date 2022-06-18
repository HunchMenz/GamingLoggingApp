import React, { Component } from "react";
import Image from "next/image";
import NavBar from "./testNavBar";
import buildRequest from "../utils/igdb/buildRequest";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function myCarousel({ gameList }) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="mySlider">
            <NavBar />
            <h2 class="title has-text-centered"> Game List </h2>
            <Slider {...settings}>
                {gameList.map((game) => (
                    <div class="card">
                        <header class="card-header has-text-centered">
                            {game.name}
                        </header>
                        <div class="card-image">
                            <figure class="image is-128x128 is-2by3">
                                <Image className="derp"
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
                    </div>
                ))}
            </Slider>
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

export default myCarousel;
