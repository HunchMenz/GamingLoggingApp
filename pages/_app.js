import "../styles/globals.css";
import { SessionProvider, useSession, signIn } from "next-auth/react";
import { GameListProvider } from "../context/gameList";
import Layout from "../layout/layout";
import { useEffect } from "react";

const Auth = ({ children }) => {
  // const [session, loading] = useSession();
  const { data: session, loading } = useSession();

  const isUser = !!session?.user;
  useEffect(() => {
    console.log(loading);
    if (loading) return; // Do nothing while loading
    if (!isUser) signIn(); // If not authenticated, force log in
  }, [isUser, loading]);

  if (isUser) {
    return <>{children}</>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
};

// Path's that require authentication
const RESTRICTED_PATHS = ["/restricted", "/user/list"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router: { route },
}) {
  // current route requires user to be logged in
  const requireAuth = RESTRICTED_PATHS.some((path) => route.startsWith(path));

  return (
    <SessionProvider session={session}>
      {requireAuth ? (
        <Auth>
          <GameListProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </GameListProvider>
        </Auth>
      ) : (
        <GameListProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GameListProvider>
      )}
    </SessionProvider>
  );
}
