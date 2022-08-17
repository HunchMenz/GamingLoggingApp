import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Frame from "../../components/Bookshelf/Frame";
import NavBar from "../../components/NavBar";
import Poster from "../../components/Poster";

// Context
import { useGameListContext } from "../../context/gameList";

function listPage() {
  // Possible statuses to sort by
  const statusTypes = ["Backlog", "In Progress", "Finished", "Retired"];
  const { user, gameList } = useGameListContext();

  const [selectedStatus, setSelectedStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const [iconList, setIconList] = useState([]);

  // console.log(iconList);

  useEffect(() => {
    setLoading(true);

    fetch("/api/list/get-icons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameList: gameList }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIconList(data.iconList);
        setLoading(false);
      });
  }, [gameList]);

  if (user) {
    return (
      <>
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
        {loading || iconList.length === 0 ? (
          <div>LOADING...</div>
        ) : (
          <Frame
            gameList={gameList.filter(
              (game) => game.status === statusTypes[selectedStatus]
            )}
            iconList={iconList}
          />
        )}
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  // const { gameList } = useGameListContext();
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
