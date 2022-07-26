import { getSession, useSession } from "next-auth/react";
import NavBar from "../../components/NavBar";
import Poster from "../../components/Poster";

// Context
import { useGameListContext } from "../../context/gameList";

function listPage() {
  const { data: session } = useSession();
  const { gameList } = useGameListContext();

  if (session) {
    return (
      <>
        <NavBar />
        Signed in as {session.user.email} <br />
        <h1>Welcome to the List Page!</h1>
        <div className="posterContainer">
          <div className="poster">
            {gameList.map((game) => {
              return (
                <div class="card w-96 bg-base-100 shadow-xl m-2">
                  <figure>
                    <Poster key={game.id} game={game} />
                  </figure>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });

  // Check if the session does not exist, and redirect
  if (!session && res) {
    res.writeHead(302, {
      Location: "/user/login",
    });
    res.end();
    return;
  }

  const currUser = session.user;

  // Verify req body
  if (!currUser) {
    return res
      .status(400)
      .json({ message: "Error in request to retrieve user list." });
  }

  return {
    props: {},
  };
}

export default listPage;
