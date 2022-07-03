import { getSession, useSession } from "next-auth/react";
import NavBar from "../../components/NavBar";

function listPage() {
  const { data: session } = useSession();

  if (session) {
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

  // TODO: Write code to build request for "read" API. API will need user ID, which is why we pulled it earlier.

  return { props: { games: null } };
}

export default listPage;
