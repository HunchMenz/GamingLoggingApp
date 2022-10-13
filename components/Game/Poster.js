// NextJS Imports
import Image from "next/image";

function Poster({ game }) {
  return (
    <>
      <Image
        src={
          game.cover
            ? "https:" + game.cover.url.replace("t_thumb", "t_720p")
            : "https://bulma.io/images/placeholders/128x128.png"
        }
        layout="fill"
        objectFit="contain"
      />
    </>
  );
}

export default Poster;
