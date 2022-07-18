import { useState } from "react";

// Icon Imports
import { FcPlus } from "react-icons/fc";
import { CgPlayListRemove } from "react-icons/cg";

// NextAuth Imports
import { useSession } from "next-auth/react";

// NextJS Imports
import Image from "next/image";
import Link from "next/link";

// State Management
// import useAppContext from "../context/state";

/** NOTE TO SELF:
 * Read up on Context. It's kinda like global variables and can help store all the added games for a batch insert.
 * Consider using a react layout to push template type designs to the whole app.
 */

function Poster({ game, imageClass = "smImage", gameSlug }) {
  const { data: session } = useSession();
  const { isAdded, setIsAdded } = useState(false);

  const addGameToList = async () => {
    const userID = session.user.id;
    const gameID = game.id;
    const status = 0; // Default to 'backlog'

    const res = await fetch("/api/list/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, gameID, status }),
    });

    let message = await res.json();
    if (message) {
    }
  };

  return (
    <div className="relative h-40 min-w-[180px]">
      {/* <Image
                src="https://placeimg.com/400/225/arch"
                alt="Shoes"
                layout="intrinsic"
                width="100%"
                height="100%"
              /> */}
      {gameSlug ? (
        <Link
          key={game.id}
          href={{
            pathname: "/games/[name]",
            query: { name: game.slug },
          }}
        >
          <a>
            <Image
              src={
                game.cover
                  ? "https:" + game.cover.url.replace("t_thumb", "t_720p")
                  : "https://bulma.io/images/placeholders/128x128.png"
              }
              className="rounded-sm object-cover md:rounded"
              layout="fill"
            />
          </a>
        </Link>
      ) : (
        <Image
          src={
            game.cover
              ? "https:" + game.cover.url.replace("t_thumb", "t_720p")
              : "https://bulma.io/images/placeholders/128x128.png"
          }
          className="rounded-sm object-cover md:rounded"
          layout="fill"
        />
      )}
      {isAdded ? (
        <CgPlayListRemove style={{ position: "absolute" }} />
      ) : (
        <FcPlus style={{ position: "absolute" }} onClick={addGameToList} />
      )}
    </div>
  );
}

export default Poster;
