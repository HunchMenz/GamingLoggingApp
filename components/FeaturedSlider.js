import React from "react";
import Link from "next/link";
import Poster from "./Poster";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// import required modules
import { Pagination, EffectFade, Autoplay } from "swiper";

function FeaturedSlider({ gameProp, sliderTitle = "" }) {
  return (
    <div>
      <Swiper
        loop={true}
        effect={"fade"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        style={{
          "--swiper-pagination-color": "rgb(29, 78, 216)",
          "--swiper-pagination-bullet-inactive-color": "rgb(255, 255, 255)",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          //   "--swiper-pagination-bullet-size": "16px",
          //   "--swiper-pagination-bullet-horizontal-gap": "6px",
        }}
        modules={[Pagination, EffectFade, Autoplay]}
        className="featuredSwiper"
      >
        {gameProp.map((game) => (
          <SwiperSlide
            className="bg-cover bg-center-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(7, 18, 36, 0.4), rgb(7, 18, 36)), url(https:" +
                game.screenshots[0].url.replace("t_thumb", "t_screenshot_big") +
                ")",
            }}
          >
            <div className="cardLength">
              <div className="card card-side backdrop-blur-xl backdrop-brightness-150">
                <Link
                  href={{
                    pathname: "/games/[name]",
                    query: { name: game.slug },
                  }}
                >
                  <a>
                    <Poster key={game.id} game={game} />
                  </a>
                </Link>
                <div className="card-body">
                  <h1 className="card-title text-white text-6xl">
                    {game.name}
                  </h1>
                  <h2 className="card-title text-white text-2xl">
                    Rating: {game.rating.toFixed(0)}
                  </h2>
                  <div className="divider"></div>
                  <p className="text-white text-left">
                    {game.summary
                      .substring(0, 200)
                      .substring(
                        0,
                        game.summary.substring(0, 200).lastIndexOf(" ")
                      ) + "..."}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default FeaturedSlider;
