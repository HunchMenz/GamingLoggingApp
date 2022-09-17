// React Import
import { useEffect, useState, useRef } from "react";

// Util
import { generateKey } from "../utils/generateKey";

// Context
import { useGameListContext } from "../context/gameList";

// Icon Imports
import { IoIosRemoveCircle } from "react-icons/io";
import { BsCheckCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";

import useClickOutside from "../utils/hooks/usClickOutside";
import { useSession } from "next-auth/react";

function PosterButtonCard({ game }) {
  // Game List Context
  const { idList, updateGameList } = useGameListContext();

  // Option States
  const [isAdded, setIsAdded] = useState(false);
  const [showListOptions, setShowListOptions] = useState(false);

  // Grab user session details
  const { data: session, status } = useSession();

  // Ref
  const btnRef = useRef();
  useClickOutside(btnRef, () => setShowListOptions(false));

  useEffect(() => {
    if (idList?.indexOf(game.id) > -1) {
      setIsAdded(true);
    }
  }, [idList]);

  const addGameToList = async (list) => {
    const userID = session.user.id;
    const gameID = game.id;

    const res = await fetch("/api/list/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, gameID, list }),
    }).then((response) => response.json());

    if (res.data) {
      updateGameList();
      return true;
    } else return false;
  };

  const removeGameFromList = async () => {
    const userID = session.user.id;
    const gameID = game.id;

    const res = await fetch("/api/list/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, gameID, updateAction: 0 }),
    });

    let { doc } = await res.json();

    if (doc) {
      updateGameList();
      return true;
    } else return false;
  };

  return (
    <div
      key={`posterbtn-${generateKey(game.id)}`}
      ref={btnRef}
      className={`absolute z-10 top-2.5 right-0`}
    >
      {showListOptions ? (
        <div className="btn-group btn-group-vertical">
          <button
            className="btn"
            onClick={() => {
              setIsAdded(addGameToList("Backlog"));
              setShowListOptions(false);
            }}
          >
            Backlog
          </button>
          <button
            className="btn"
            onClick={() => {
              setIsAdded(addGameToList("In Progress"));
              setShowListOptions(false);
            }}
          >
            In Progress
          </button>
          <button
            className="btn"
            onClick={() => {
              setIsAdded(addGameToList("Finished"));
              setShowListOptions(false);
            }}
          >
            Finished
          </button>
          <button
            className="btn"
            onClick={() => {
              setIsAdded(addGameToList("Retired"));
              setShowListOptions(false);
            }}
          >
            Retired
          </button>
        </div>
      ) : isAdded ? (
        <IconContext.Provider value={{ color: "darkred" }}>
          <IoIosRemoveCircle
            className="w-6 h-6 m-1"
            onClick={() => setIsAdded(!removeGameFromList())}
          />
        </IconContext.Provider>
      ) : (
        <IconContext.Provider value={{ color: "#0055FF" }}>
          {/* , style: { color: "white" }  */}
          <BsCheckCircleFill
            className="w-6 h-6 m-1"
            onClick={() => setShowListOptions(!showListOptions)}
          />
        </IconContext.Provider>
      )}
    </div>
  );
}

export default PosterButtonCard;
