import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import Poster from "../../components/Poster";

// Context
import { useGameListContext } from "../../context/gameList";

function listPage() {
  // Possible statuses to sort by
  const statusTypes = ["Backlog", "In Progress", "Finished", "Retired"];
  const { user, gameList } = useGameListContext();
  const [selectedStatus, setSelectedStatus] = useState(0);

  if (user) {
    return (
      <>
        <NavBar />
        Signed in as {user.email} <br />
        <h1>Welcome to the List Page!</h1>
        <div className="tabs mt-10 justify-center">
          <div className="flex-1 border-b border-gray-200"></div>
          {statusTypes.map((status) => (
            <a
              className={`tab tab-lg tab-lifted ${
                selectedStatus === statusTypes.indexOf(status) && "tab-active"
              }`}
              onClick={() => setSelectedStatus(statusTypes.indexOf(status))}
            >
              {status}
            </a>
          ))}
          <div className="flex-1 border-b border-gray-200"></div>
        </div>
        {gameList[selectedStatus] ? (
          <div className="posterContainer">
            <div className="poster">
              {gameList[selectedStatus].map((game) => {
                return (
                  <div className="card w-96 bg-base-100 shadow-xl m-2">
                    <figure>
                      <Poster key={game.id} game={game} />
                    </figure>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
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
