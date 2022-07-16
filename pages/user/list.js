import { getSession, useSession } from "next-auth/react";
import NavBar from "../../components/NavBar";
import dbConnect from "../../utils/lib/dbConnect";
import Games from "../../database/user_data/model/Games";
import Poster from "../../components/Poster";
import buildRequest from "../../utils/buildRequest";

function listPage({ addedGames, gameList }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <NavBar />
        Signed in as {session.user.email} <br />
        <h1>Welcome to the List Page!</h1>
        {gameList.map((game) => {
          return <Poster game={game} />;
        })}
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

  await dbConnect("user_data");

  const currUser = session.user;

  // Verify req body
  if (!currUser) {
    return res
      .status(400)
      .json({ message: "Error in request to retrieve user list." });
  }
  // Status Translation:
  const statusTranslation = ["Backlog", "In Progress", "Finished", "Retired"];

  // Retrieve user list by user id
  // ** the lean function returns the query result as a POJ object
  let userList = await Games.find(
    { userID: currUser.id },
    "gameID status dateAdded dateRemoved"
  )
    .sort({ dateAdded: 1 })
    .lean();

  // Translate status
  userList.forEach((game) => {
    game["status"] = statusTranslation[game["status"]];
  });

  const idArray = userList.map((listItem) => listItem.gameID);

  // Get game info based on userList gameID's
  const fields = [
    "name",
    "slug",
    "cover.url",
    "platforms.abbreviation",
    "platforms.platform_logo.url",
    "total_rating",
    "release_dates.date",
    "aggregated_rating_count",
  ];
  const filter = `where id = (${idArray});`;

  const query = "fields " + fields.join(",") + ";" + filter;

  const response = await buildRequest("igdb", "games", query);

  return {
    props: {
      addedGames: JSON.stringify(userList),
      gameList: response.sort(
        (a, b) => idArray.indexOf(a.id) - idArray.indexOf(b.id)
      ),
    },
  };
}

export default listPage;
