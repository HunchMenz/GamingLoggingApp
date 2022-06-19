import React from "react";
import Image from "next/image";

function Poster({ image }) {
  return (
    <div key={image.id} className="posterItem">
      <figure className="image is-2by3">
        <Image
          src={
            image.cover
              ? "https:" + image.cover.url.replace("t_thumb", "t_720p")
              : "https://bulma.io/images/placeholders/128x128.png"
          }
          layout="fill"
          objectFit="contain"
        />
      </figure>
    </div>
  );
}

export default Poster;
