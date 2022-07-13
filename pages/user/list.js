import { getSession, useSession } from "next-auth/react";
import NavBar from "../../components/NavBar";
import dbConnect from "../../utils/lib/dbConnect";
import Games from "../../database/user_data/model/Games";

function listPage({ addedGames }) {
  const { data: session } = useSession();

  if (session) {
    console.log(addedGames);
    return (
      <>
        <NavBar />
        Signed in as {session.user.email} <br />
        <h1>Welcome to the List Page!</h1>
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
  let userList = await Games.find(
    { userID: currUser.id },
    "gameID status dateAdded dateRemoved"
  ).lean();

  userList.forEach((game) => {
    game["status"] = statusTranslation[game["status"]];
  });

  return { props: { addedGames: JSON.stringify(userList) } };
}

export default listPage;
