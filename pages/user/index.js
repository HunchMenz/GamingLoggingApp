import { useSession, signIn, signOut } from "next-auth/react";
import NavBar from "../../components/NavBar";

function UserDashboard() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        <NavBar />
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <NavBar />
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default UserDashboard;
