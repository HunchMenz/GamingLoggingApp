import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { GameListProvider } from "../context/gameList";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <GameListProvider>
        <Component {...pageProps} />
      </GameListProvider>
    </SessionProvider>
  );
}
