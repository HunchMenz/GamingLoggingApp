// TODO: Make this page a sort of public "dashboard" page. The user can decide how they are seen by the public.

import { useSession, signIn, signOut } from "next-auth/react";

function UserDashboard() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default UserDashboard;
