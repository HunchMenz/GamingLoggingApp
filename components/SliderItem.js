import Link from "next/link";
import { useSession } from "next-auth/react";

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

function SliderItem({ game }) {
  const { data: session, status } = useSession();
  return (
    // <SwiperSlide>
    <div className="card image-full carousel-poster">
      {status === "authenticated" ? <PosterButtonCard game={game} /> : ""}
      {game?.slug ? (
        <div className="relative h-80 w-52">
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
      ) : (
        <div className="relative h-80 w-52">
          <Poster key={game?.id} game={game} />
        </div>
      )}
    </div>
    // </SwiperSlide>
  );
}

// SliderItem.displayName = "SwiperSlide";

export default SliderItem;
