import Spine from "./Spine";
import Style from "../../styles/Shelf.module.css";

function Frame({ gameList, iconList }) {
  return (
    <div
      className={Style.gameShelf}
      style={{
        "background-image":
          "linear-gradient(#241909, #2c1e0b 220px, #b87e2c 220px, #b87e2c 222px, #a87328 222px, #a87328 228px, #986824 228px, #986824 230px)",
      }}
    >
      {gameList.map((game, idx) => {
        const iconData = iconList.find((icon) => icon.IGDB_ID === game.id);
        return (
          <div key={`spine-${game.id}`}>
            <Spine game={game} SG={iconData} />
          </div>
        );
      })}
    </div>
  );
}

export default Frame;
