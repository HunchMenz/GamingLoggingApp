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

let useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current?.contains(event.target)) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

function PosterButtonCard({ game }) {
  const { user, idList } = useGameListContext();
  const [isAdded, setIsAdded] = useState(false);
  const [showListOptions, setShowListOptions] = useState(false);
  const btnRef = useRef();

  useEffect(() => {
    if (idList.indexOf(game.id) > -1) {
      setIsAdded(true);
    }
  }, [idList, isAdded]);

  const domNode = useClickOutside(btnRef, () => {
    setShowListOptions(false);
  });

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
    <div
      key={`posterbtn-${generateKey(game.id)}`}
      ref={domNode}
      className={`absolute z-10 top-2.5 right-0`}
    >
      {showListOptions ? (
        <div className="btn-group btn-group-vertical">
          <button
            className="btn"
            onClick={() => {
              setIsAdded(addGameToList(0));
              setShowListOptions(false);
            }}
          >
            Backlog
          </button>
          <button
            className="btn"
            onClick={() => {
              setIsAdded(addGameToList(1));
              setShowListOptions(false);
            }}
          >
            In Progress
          </button>
          <button
            className="btn"
            onClick={() => {
              setIsAdded(addGameToList(2));
              setShowListOptions(false);
            }}
          >
            Finished
          </button>
          <button
            className="btn"
            onClick={() => {
              setIsAdded(addGameToList(3));
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
