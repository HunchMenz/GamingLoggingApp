import Poster from "./Poster";

function PosterButtonCard({ game }) {
  return game ? (
    <div class="card card-side bg-base-100 shadow-xl">
      {/* <figure>
        <img
          src={
            game?.cover
              ? "https:" + game.cover.url.replace("t_thumb", "t_720p")
              : "https://bulma.io/images/placeholders/128x128.png"
          }
          alt="Movie"
        />
      </figure> */}
      <Poster key={`PBC-${game.id}`} game={game} />
      <div class="card-body">
        <h2 class="card-title">New movie is released!</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default PosterButtonCard;
