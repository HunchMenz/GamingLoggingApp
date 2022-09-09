import GameBox from "./GameBox";
import Style from "../../styles/Shelf.module.css";
import Menu from "./Menu";
import { useRef, useState } from "react";

function Frame({ gameList, iconList, logoList }) {
  return (
    <div
      className={Style.gameShelf}
      style={{
        "background-image":
          "linear-gradient(#241909, #2c1e0b 220px, #b87e2c 220px, #b87e2c 222px, #a87328 222px, #a87328 228px, #986824 228px, #986824 230px)",
      }}
    >
      {gameList.map((game) => {
        const iconData = iconList.find((icon) => icon.IGDB_ID === game.id);
        const logoData = logoList.find((logo) => logo.IGDB_ID === game.id);
        return (
          <div key={`GameBox-${game.id}`} className="flex">
            <GameBox game={game} icon={iconData} logo={logoData} />
            {/* Menu
            <div
              className={`${Style.menu} glass`}
              style={{ "--x-offset": xOffset }}
            >
              <Menu game={game} />
            </div> */}
          </div>
        );
      })}
    </div>
  );
}

export default Frame;
