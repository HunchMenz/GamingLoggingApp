import { useRouter } from "next/router";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import Poster from "../../components/Poster";
import Image from "next/image";
import buildRequest from "../../utils/buildRequest";
import { AiOutlineZoomIn } from "react-icons/ai";

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
  const [imageToShow, setImageToShow] = useState("");
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);

  const showImage = (image) => {
    setImageToShow(image);
    setLightBoxDisplay(true);
  };

  //hide lightbox
  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };

  //show next image in lightbox
  const showNext = (e) => {
    e.stopPropagation();
    let currentIndex = -1;
    for (let i = 0; i < game.game.screenshots.length && currentIndex < 0; i++) {
      if (
        game.game.screenshots[i].url &&
        "https:" +
          game.game.screenshots[i].url.replace(
            "t_thumb",
            "t_screenshot_big"
          ) ===
          imageToShow
      ) {
        currentIndex = i;
      }
    }

    let nextImage;
    if (currentIndex >= game.game.screenshots.length - 1) {
      nextImage =
        "https:" +
        game.game.screenshots[0].url.replace("t_thumb", "t_screenshot_big");
    } else {
      nextImage =
        "https:" +
        game.game.screenshots[currentIndex + 1].url.replace(
          "t_thumb",
          "t_screenshot_big"
        );
      setImageToShow(nextImage);
    }
  };

  //show previous image in lightbox
  const showPrev = (e) => {
    e.stopPropagation();
    let currentIndex = -1;
    for (let i = 0; i < game.game.screenshots.length && currentIndex < 0; i++) {
      if (
        game.game.screenshots[i].url &&
        "https:" +
          game.game.screenshots[i].url.replace(
            "t_thumb",
            "t_screenshot_big"
          ) ===
          imageToShow
      ) {
        currentIndex = i;
      }
    }

    let nextImage;

    if (currentIndex <= 0) {
      // setLightBoxDisplay(false);
      nextImage =
        "https:" +
        game.game.screenshots[game.game.screenshots.length - 1].url.replace(
          "t_thumb",
          "t_screenshot_big"
        );
    } else {
      nextImage =
        "https:" +
        game.game.screenshots[currentIndex - 1].url.replace(
          "t_thumb",
          "t_screenshot_big"
        );
    }

    setImageToShow(nextImage);
  };

  const imageCards = game.game.screenshots.map((sc) => {
    return (
      <SwiperSlide>
        <AiOutlineZoomIn
          style={{ color: "white", zIndex: 1, cursor: "pointer" }}
          size={"2em"}
          onClick={() =>
            showImage("https:" + sc.url.replace("t_thumb", "t_screenshot_big"))
          }
        />
        <div className={Style["bg-slide"]}>
          <Image
            src={
              sc
                ? "https:" + sc.url.replace("t_thumb", "t_screenshot_big")
                : "https://bulma.io/images/placeholders/128x128.png"
            }
            layout="fill"
          />
        </div>
      </SwiperSlide>
    );
  });

  const Background = game.game.screenshots
    ? "https:" +
      game.game.screenshots[0].url.replace("t_thumb", "t_screenshot_big")
    : "https://bulma.io/images/placeholders/128x128.png";

  return (
    <div>
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
            <Poster key={game.game} game={game.game} imageClass={"bigImage"} />
            <div className={Style["poster-content"]} style={{ float: "left" }}>
              <h1 className={`title is-1 ${Style.gameTitle}`}>{game.name}</h1>
              Rating: {game.game.rating.toFixed(0)}
            </div>
          </div>
        </div>
      </div>
      <div className={Style["bg-under"]}>
        <div>{game.game.summary}</div>
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
          {imageCards}
        </Swiper>
        {lightboxDisplay ? (
          <div id="lightbox" onClick={hideLightBox}>
            <button onClick={showPrev}>⭠</button>
            <img id="lightbox-img" src={imageToShow} />
            <button onClick={showNext}>⭢</button>
          </div>
        ) : (
          ""
        )}
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
    "game.first_release_date",
    "game.genres",
    "game.platforms",
  ];
  const filter = 'where game.slug = "' + name + '";';
  const query = "fields " + fields.join(",") + ";" + filter;
  const response = await buildRequest("igdb", "search", query);

  return {
    props: { game: response[0] },
  };
}

export default GamePage;
