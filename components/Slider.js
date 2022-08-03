// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

// import required modules
import { Pagination, Navigation, Scrollbar } from "swiper";

// import components
import SliderItem from "./SliderItem";
import PosterButtonCard from "./PosterButtonCard";

function Slider({ gameProp, sliderTitle = "" }) {
  return (
    <div>
      <h1 className="text-4xl m-6 font-bold underline decoration-blue-500 decoration-6">{`${sliderTitle}`}</h1>
      <Swiper
        slidesPerView={4}
        spaceBetween={1}
        slidesPerGroup={4}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          // clickable: true,
          type: "none",
        }}
        scrollbar={{
          hide: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Scrollbar]}
        className="mySwiper"
      >
        {gameProp.map((game, idx) => (
          <SwiperSlide key={`slide-${idx}`}>
            <div class="card">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
