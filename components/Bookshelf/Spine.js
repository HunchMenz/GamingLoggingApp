import Image from "next/image";
import { useRef, useState } from "react";

// Icons
import { FaAngleRight } from "react-icons/fa";

import Style from "../../styles/Shelf.module.css";

import useClickOutside from "../../utils/hooks/usClickOutside";

function Spine({ game, icon, logo }) {
  const [preview, setPreview] = useState(false);
  const [opened, setOpened] = useState(false);
  //   console.log(game);

  const clickRef = useRef();
  useClickOutside(clickRef, () => {
    setPreview(false);
    setOpened(false);
  });

  const Background = game.screenshots
    ? "https:" + game.screenshots[0].url.replace("t_thumb", "t_screenshot_big")
    : "https://bulma.io/images/placeholders/128x128.png";

  const cover = game.cover
    ? "https:" + game.cover.url.replace("t_thumb", "t_720p")
    : "https://bulma.io/images/placeholders/128x128.png";

  if (!false) {
    return (
      <div
        className={`${Style.scale} ${
          opened ? Style.in : preview ? Style.preview : Style.base
        }`}
        ref={clickRef}
      >
        <div
          className={`${Style.gameBox} ${
            game.platforms[0].abbreviation === "Switch"
              ? Style["gameBox-switch"] + " " + Style["gameBox-red"]
              : Style["gameBox-default"] + " " + Style["gameBox-umber"]
          } ${
            preview && !opened
              ? Style["gameBox-preview"] + " " + Style.nohover
              : ""
          } ${opened ? Style["gameBox-opened"] + " " + Style.nohover : ""}`}
          onClick={() => setPreview(!preview)}
        >
          <section className="flex justify-center">
            <Image
              src={
                icon.data[0]
                  ? icon.data[0].thumb
                  : "https://bulma.io/images/placeholders/32x32.png"
              }
              // layout="fill"
              objectFit="cover"
              layout="intrinsic"
              width={30}
              height={30}
            />
          </section>
          <div class="divider m-0"></div>
          {logo?.data[0] ? (
            <section className={`flex justify-center ${Style.logo}`}>
              <div
                className={`${
                  game.platforms[0].abbreviation === "Switch" ? "h-6" : "h-8"
                }`}
              >
                <Image
                  src={
                    logo.data[0]
                      ? logo.data[0].thumb
                      : "https://bulma.io/images/placeholders/32x32.png"
                  }
                  layout="fill"
                  objectFit="contain"
                  //   layout="intrinsic"
                  width={30}
                  height={30}
                />
              </div>
            </section>
          ) : (
            <h2 className="line-clamp-2">{game.name}</h2>
          )}
          <div className={`${Style.side} ${Style.top}`}></div>
          <div
            className={`${Style.side} ${Style.cover}`}
            style={{ "background-image": `url(${cover})` }}
          >
            <div
              className={`${Style.side} ${Style.buckle}`}
              onClick={() => setOpened(!opened)}
            >
              <FaAngleRight />
            </div>
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
}

export default Spine;
