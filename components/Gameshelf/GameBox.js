import Image from "next/image";
import { useRef, useState } from "react";

// Components
import Menu from "./Menu";

// Icons
import { FaAngleRight } from "react-icons/fa";

// Style Sheet
import Style from "../../styles/Shelf.module.css";

// Hooks
import useClickOutside from "../../utils/hooks/usClickOutside";

function GameBox({ game, icon, logo }) {
  const [preview, setPreview] = useState(false);
  const [opened, setOpened] = useState(false);
  const [xOffset, setxOffset] = useState("0");

  const clickRef = useRef();
  useClickOutside(clickRef, () => {
    setPreview(false);
    setOpened(false);
  });

  const cover = game?.cover
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
        {/* GameBox */}
        <div
          className={`${Style.gameBox} ${
            // game.platforms[0].abbreviation === "Switch"
            //   ? Style["gameBox-switch"] + " " + Style["gameBox-red"]
            //   :
            Style["gameBox-default"] + " " + Style["gameBox-umber"]
          } ${
            preview && !opened
              ? Style["gameBox-preview"] + " " + Style.nohover
              : ""
          } ${opened ? Style["gameBox-opened"] + " " + Style.nohover : ""}`}
          onClick={() => setPreview(!preview)}
          style={{ "--x-offset": xOffset }}
        >
          <section className="flex justify-center">
            <Image
              src={
                icon?.url || "https://bulma.io/images/placeholders/32x32.png"
              }
              objectFit="cover"
              layout="intrinsic"
              width={30}
              height={30}
            />
          </section>
          <div className="divider m-0"></div>
          {logo?.url ? (
            <section className={`flex justify-center ${Style.logo}`}>
              <div
                className={`${
                  // game.platforms[0].abbreviation === "Switch" ? "h-6" :
                  "h-8"
                }`}
              >
                <Image
                  src={
                    logo?.url ||
                    "https://bulma.io/images/placeholders/32x32.png"
                  }
                  layout="fill"
                  objectFit="contain"
                  width={30}
                  height={30}
                />
              </div>
            </section>
          ) : (
            <h2 className="line-clamp-2">{game.name}</h2>
          )}
          {/* Top of Box */}
          <div className={`${Style.side} ${Style.top}`}></div>
          {/* Box Cover Art */}
          <div
            className={`${Style.side} ${Style.cover}`}
            style={{ backgroundImage: `url(${cover})` }}
          >
            {/* Buckle */}
            <div
              className={`${Style.side} ${Style.buckle}`}
              onClick={() => {
                setOpened(!opened);
                setxOffset(`-${clickRef.current.offsetLeft}px`);
              }}
            >
              <FaAngleRight />
            </div>
          </div>
          {/* Menu  ${
              opened ? "block" : "hidden"
            } */}
          <div
            className={`${Style.side} ${Style.menu} glass ${
              opened ? "block" : "hidden"
            }`}
          >
            <Menu game={game} />
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
}

export default GameBox;
