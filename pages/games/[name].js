import { useRouter } from "next/router";
import React from "react";
import NavBar from "../../components/NavBar";
import Poster from "../../components/Poster";
import Image from "next/image";
import buildRequest from "../../utils/buildRequest";
import { AiOutlineZoomIn } from 'react-icons/ai';
import Modal from 'react-modal';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/zoom";


// import required modules
import { Pagination, Navigation} from "swiper";

import Style from "../../styles/Game.module.css";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    zIndex: '1000',
    background: 'rgba(222, 222, 222, 0.1)',

  }
};

function GamePage({ game }) {
  const router = useRouter();
  // const { name } = router.query;


  //////////////////////////////////////////////////

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  //////////////////////////////////////////////////

  const pics = () => {
    let size = game.game.screenshots.length;
    let scrnshots = [];
    for (let i = 0; i <= size - 1; i++) {
      scrnshots.push(
      <SwiperSlide>
        <AiOutlineZoomIn onClick={openModal} style={{color: 'white', zIndex: 1}} size={'2em'}/>
        <div className={Style["bg-slide"]}>
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
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          // className="Modal"
          // overlayClassName="Overlay"
          contentLabel="Example Modal"
        >
          {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div> */}

          <Image
            src={
              game.game.screenshots
              ? "https:" + game.game.screenshots[i].url.replace("t_thumb", "t_720p")
              : "https://bulma.io/images/placeholders/128x128.png"
            }
            // layout="fill"
            objectFit="contain"
            layout="intrinsic"
            width={900}
            height={500}
          />
          {console.log(i)}
        </Modal>
        {/* <div className={Style["bg-text"]}>Test stuff</div> */}
      </SwiperSlide>)
    }

    // console.log(scrnshots)
    return scrnshots;
  };

  const Background = game.game.screenshots
    ? "https:" +
    game.game.screenshots[0].url.replace("t_thumb", "t_screenshot_big")
    : "https://bulma.io/images/placeholders/128x128.png";

  const ref = React.useRef(null) 

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
          {/* <div>
            <button onClick={openModal}>Open Modal</button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
              <button onClick={closeModal}>close</button>
              <div>I am a modal</div>
            </Modal>
          </div> */}
        </div>
        <Swiper
          ref={ref}
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
    "game.first_release_date",
    "game.genres",
    "game.platforms",
  ];
  const filter = 'where game.slug = "' + name + '";';
  const query = "fields " + fields.join(",") + ";" + filter;

  const response = await buildRequest("igdb", "search", query);

  // console.log(response[0]);

  return {
    props: { game: response[0] },
  };
}

export default GamePage;
