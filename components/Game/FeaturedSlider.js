import React from "react";
import Link from "next/link";
import Poster from "./Poster";

// Import Hook
import useFitText from "../../utils/hooks/useFitText";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// import required modules
import { Pagination, EffectFade, Autoplay, Navigation } from "swiper";

// import function
import generateKey from "../../utils/generateKey";

function FeaturedSlider({ gameProp }) {
  return (
    <div>
      <Swiper
        loop={true}
        effect={"fade"}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        style={{
          "--swiper-pagination-color": "rgb(29, 78, 216)",
          "--swiper-pagination-bullet-inactive-color": "rgb(255, 255, 255)",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          //   "--swiper-pagination-bullet-size": "16px",
          //   "--swiper-pagination-bullet-horizontal-gap": "6px",
        }}
        modules={[Pagination, EffectFade, Autoplay, Navigation]}
        className="featuredSwiper"
      >
        {gameProp.map((game) => {
          const { fontSize, ref } = useFitText({ maxFontSize: 500 });
          return (
            <SwiperSlide
              key={`Featured-${generateKey(game.id)}`}
              className="bg-cover bg-center-center"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(7, 18, 36, 0.4), rgb(7, 18, 36)), url(https:" +
                  game.screenshots[0].url.replace(
                    "t_thumb",
                    "t_screenshot_big"
                  ) +
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
                      <div className="relative h-96 w-72">
                        <Poster key={game.id} game={game} />
                      </div>
                    </a>
                  </Link>
                  <div className="card-body">
                    <div
                      ref={ref}
                      style={{ fontSize }}
                      className="card-title text-white h-14 w-11/12"
                    >
                      {`${game.name}`}
                    </div>
                    <h2 className="card-title text-white text-2xl">
                      Rating: {game.rating?.toFixed(0)}
                    </h2>
                    <div className="divider"></div>
                    <div className="text-white text-left line-clamp-5">
                      {game.summary}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default FeaturedSlider;
