import { useState } from "react";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

// import components
import Poster from "../components/Poster";
import PosterButtonCard from "./PosterButtonCard";

function SliderItem({ game }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <SwiperSlide>
      <div
        class="card"
        onMouseEnter={() => setIsHover(game)}
        onMouseLeave={() => setIsHover(false)}
      >
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
        {isHover ? (
          <PosterButtonCard style={{ position: "absolute" }} game={isHover} />
        ) : (
          ""
        )}
      </div>
    </SwiperSlide>
  );
}

SliderItem.displayName = "SwiperSlide";

export default SliderItem;
