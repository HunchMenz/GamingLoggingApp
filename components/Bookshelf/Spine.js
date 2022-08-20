import Image from "next/image";
import { useState } from "react";

import Style from "../../styles/Shelf.module.css";

function Spine({ game, icon, logo }) {
  const [clicked, setClicked] = useState(false);
  //   console.log(game);

  const Background = game.screenshots
    ? "https:" + game.screenshots[0].url.replace("t_thumb", "t_screenshot_big")
    : "https://bulma.io/images/placeholders/128x128.png";

  const cover = game.cover
    ? "https:" + game.cover.url.replace("t_thumb", "t_720p")
    : "https://bulma.io/images/placeholders/128x128.png";

  console.log(cover);

  // Fix rotation so that items are not seperated according to original width before rotation
  return (
    <div
      className={`${Style.gameBox} ${
        game.platforms[0].abbreviation === "Switch"
          ? Style["gameBox-switch"] + " " + Style["gameBox-red"]
          : Style["gameBox-default"] + " " + Style["gameBox-umber"]
      } ${clicked ? Style["gameBox-3d"] + " " + Style.nohover : ""}`}
      onClick={() => setClicked(!clicked)}
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
      <div class={`${Style.side} ${Style.top}`}></div>
      <div
        class={`${Style.side} ${Style.cover}`}
        style={{ "background-image": `url(${cover})` }}
      ></div>
    </div>
  );
}

export default Spine;

// <div
//   className="flex rotate-90 border-rose-600 border-4 w-48 h-16"
//   //   style={{
//   //     backgroundImage:
//   //       "linear-gradient(rgba(7, 18, 36, 0.4), rgb(7, 18, 36)), url(" +
//   //       Background +
//   //       ")",
//   //   }}
// >
//   <div className="rotate-[270deg] p-0.5">
//     {/* <Image
//       src={
//         game.artworks
//           ? "https:" + game.artworks[0].url.replace("t_thumb", "t_720p")
//           : "https://bulma.io/images/placeholders/32x32.png"
//       }
//       // layout="fill"
//       objectFit="cover"
//       layout="fixed"
//       width={45}
//       height={45}
//     /> */}
//     <Image
//       src={
//         icon.data[0]
//           ? icon.data[0].thumb
//           : "https://bulma.io/images/placeholders/32x32.png"
//       }
//       // layout="fill"
//       objectFit="cover"
//       layout="fixed"
//       width={45}
//       height={45}
//     />
//   </div>
//   <p className="p-1 text-sm text-center self-center line-clamp-2 w-28">
//     {game.name}
//   </p>
// </div>
