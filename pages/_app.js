import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { GameListProvider } from "../context/gameList";
import Layout from "../layout/layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <GameListProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GameListProvider>
    </SessionProvider>
  );
}
