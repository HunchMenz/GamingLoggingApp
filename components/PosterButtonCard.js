import { useEffect, useState } from "react";
import { useGameListContext } from "../context/gameList";

// Icon Imports
import { FcPlus } from "react-icons/fc";
import { AiOutlineDown } from "react-icons/ai";
import { IoIosRemoveCircle } from "react-icons/io";
import { BsCheckCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons/lib";

function PosterButtonCard({ game }) {
  const { user, idList } = useGameListContext();
  const [isAdded, setIsAdded] = useState(false);
  const [showListOptions, setShowListOptions] = useState(false);

  useEffect(() => {
    if (idList.indexOf(game.id) > -1) {
      setIsAdded(true);
    }
  }, [idList, isAdded]);

  const addGameToList = async (stat = 0) => {
    const userID = user.id;
    const gameID = game.id;
    const status = stat; // Default to 'backlog'

    const res = await fetch("/api/list/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, gameID, status }),
    });

    let { doc } = await res.json();

    if (doc) {
      return true;
    } else return false;
  };

  const removeGameFromList = async () => {
    const userID = user.id;
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
      return true;
    } else return false;
  };

  return (
    <div className="absolute z-10 top-2.5 right-0">
      {showListOptions ? (
        <div className="btn-group btn-group-vertical">
          <button
            className="btn"
            onClick={() => {
              setIsAdded(addGameToList(0));
              setShowListOptions(!showListOptions);
            }}
          >
            Backlog
          </button>
          <button
            className="btn"
            onClick={() => {
              setIsAdded(addGameToList(1));
              setShowListOptions(!showListOptions);
            }}
          >
            In Progress
          </button>
          <button
            className="btn"
            onClick={() => {
              setIsAdded(addGameToList(2));
              setShowListOptions(!showListOptions);
            }}
          >
            Finished
          </button>
          <button
            className="btn"
            onClick={() => {
              setIsAdded(addGameToList(3));
              setShowListOptions(!showListOptions);
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
