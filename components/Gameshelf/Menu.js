import React from "react";

// Icons
import { FaXbox, FaSteam, FaPlaystation } from "react-icons/fa";
import { SiEpicgames, SiOculus } from "react-icons/si";

function Menu({ game }) {
  const uniqueExternal = game.external_games?.filter((val, idx, self) => {
    return (
      self.findIndex((element) => element.category === val.category) === idx
    );
  });

  return (
    <div className="text-left">
      <h1>{game.name}</h1>
      <div className="inline-flex pr-1">
        {uniqueExternal?.map((external) => {
          switch (external.category) {
            case "microsoft":
              return <FaXbox />;
            case "steam":
              return <FaSteam />;
            case "playstation_store_us":
              return <FaPlaystation />;
            case "epic_game_store":
              return <SiEpicgames />;
            case "oculus":
              return <SiOculus />;
            default:
              return "";
          }
        })}
      </div>
    </div>
  );
}

export default Menu;
