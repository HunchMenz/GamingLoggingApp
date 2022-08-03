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
  const [showListOptions, setShowListOptions] = useState(false);
  return (
    <SwiperSlide>
      <div className="card image-full carousel-poster">
        <PosterButtonCard game={game} />
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
  );
}

SliderItem.displayName = "SwiperSlide";

export default SliderItem;
