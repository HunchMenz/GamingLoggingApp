import "../styles/globals.css";
import { useEffect } from "react";
import { themeChange } from "theme-change";
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
