import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../lib/context/UserContext";
import { ContentProvider } from "../lib/context/ContentContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ContentProvider>
        <Component {...pageProps} />
      </ContentProvider>
    </UserProvider>
  );
}
