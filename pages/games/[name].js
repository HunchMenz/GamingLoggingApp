import { useRouter } from "next/router";
import React from "react";
import NavBar from "../../components/NavBar";
import Poster from "../../components/Poster";
import Image from "next/image";
import buildRequest from "../../utils/igdb/buildRequest";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

import Style from "../../styles/Game.module.css";

function GamePage({ game }) {
  const router = useRouter();
  // const { name } = router.query;

  console.log(game);
  console.log("Screenshot: " + game.game.screenshots)

  const pics = () => {
    let size = game.game.screenshots.length;
    let scrnshots = [];
    for (let i = 0; i <= size - 1; i++) {
      scrnshots.push(
      <SwiperSlide>
        <Image
          src={
            game.game.screenshots
		        ? "https:" + game.game.screenshots[i].url.replace("t_thumb", "t_720p")
		        : "https://bulma.io/images/placeholders/128x128.png"
          }
          layout="fill"
          // objectFit="contain"
          // layout="intrinsic"
          // width={540}
          // height={720}
        />
      </SwiperSlide>)
    }

    console.log(scrnshots)
    return scrnshots;
  };

 

  const Background = game.game.screenshots
    ? "https:" +
    game.game.screenshots[0].url.replace("t_thumb", "t_screenshot_big")
    : "https://bulma.io/images/placeholders/128x128.png";

  return (
    <div>
      <NavBar />
      {/* <div className={Style["gamepage-header"]}> */}
      <div className={Style["bg-container"]}>
        <div
          className={Style["bg-img"]}
          style={{
            backgroundImage:
              "linear-gradient(rgba(7, 18, 36, 0.4), rgb(7, 18, 36)), url(" +
              Background +
              ")",
          }}
        >
          <div className={Style["poster-cover"]}>
            <Poster key={game.game} image={game.game} imageClass={"bigImage"} />
            <div className={Style["poster-content"]} style={{ float: "left" }}>
              <h1 className={`title is-1 ${Style.gameTitle}`}>{game.name}</h1>
              Rating: {game.game.rating.toFixed(0)}
            </div>
          </div>
        </div>
      </div>
      <div className={Style["bg-under"]}>
        <div>
          {game.game.summary}
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          slidesPerGroup={3}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {pics()}
        </Swiper>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.query;
  const fields = [
    "alternative_name",
    "character",
    "checksum",
    "collection",
    "company",
    "description",
    "name",
    "platform",
    "published_at",
    "test_dummy",
    "theme",
    "game.rating",
    "game.total_rating",
    "game.cover.url",
    "game.screenshots.url",
    "game.screenshots.height",
    "game.summary",
    "game.storyline",
  ];
  const filter = 'where game.slug = "' + name + '";';
  const query = "fields " + fields.join(",") + ";" + filter;

  const response = await buildRequest("search", query);

  // console.log(response[0]);

  return {
    props: { game: response[0] },
  };
}

export default GamePage;
