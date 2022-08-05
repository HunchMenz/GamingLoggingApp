import Link from "next/link";

// Import Swiper React components
import { SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

// import components
import Poster from "../components/Poster";
import PosterButtonCard from "./PosterButtonCard";

// Context
import { useGameListContext } from "../context/gameList";

function SliderItem({ game }) {
  const { user } = useGameListContext();
  return (
    <SwiperSlide>
      <div className="card image-full carousel-poster">
        {user ? <PosterButtonCard game={game} /> : ""}
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
