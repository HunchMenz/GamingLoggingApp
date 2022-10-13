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
import PosterSliderItem from "./PosterSliderItem";

// functions
import generateKey from "../../utils/generateKey";

function PosterSlider({ gameProp, sliderTitle = "" }) {
  return (
    <div>
      <h1 className="text-4xl m-6 font-bold underline decoration-blue-500 decoration-6">{`${sliderTitle}`}</h1>
      <Swiper
        touchStartPreventDefault={false}
        slidesPerView="auto" // without "auto" we get a hydration error when paired with breakpoints
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 1,
          },
          "@0.25": {
            slidesPerView: 2,
            spaceBetween: 2,
          },
          "@0.75": {
            slidesPerView: 3,
            spaceBetween: 3,
          },
          "@1.00": {
            slidesPerView: 4,
            spaceBetween: 4,
          },
          "@1.25": {
            slidesPerView: 5,
            spaceBetween: 5,
          },
          "@1.60": {
            slidesPerView: 6,
            spaceBetween: 6,
          },
          "@1.75": {
            slidesPerView: 7,
            spaceBetween: 7,
          },
        }}
        loop={true}
        // loopFillGroupWithBlank={true} // breaks component key structure when triggered
        pagination={{
          // clickable: true,
          type: "none",
        }}
        scrollbar={{
          hide: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Scrollbar]}
        className="flex flex-1 mx-0"
      >
        {gameProp.map((game) => {
          return (
            <SwiperSlide
              key={`SliderItem-${sliderTitle
                .split(" ")
                .join("_")}-${generateKey(game.id)}`}
            >
              <PosterSliderItem game={game} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default PosterSlider;
