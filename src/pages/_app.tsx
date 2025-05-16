import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../lib/context/UserContext";
import { ContentProvider } from "../lib/context/ContentContext";
import { useEffect } from "react";
import { initPosts } from "../data/posts";

export default function App({ Component, pageProps }: AppProps) {
  // 应用启动时初始化帖子数据
  useEffect(() => {
    // 在客户端渲染时初始化帖子数据
    if (typeof window !== 'undefined') {
      initPosts();
    }
  }, []);

  return (
    <UserProvider>
      <ContentProvider>
        <Component {...pageProps} />
      </ContentProvider>
    </UserProvider>
  );
}
