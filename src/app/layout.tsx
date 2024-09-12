import type { Metadata } from "next";
import Script from "next/script";
import dayjs from "dayjs";
import "dayjs/locale/ko";

// Supports weights 100-900
import "@fontsource-variable/noto-sans";
import "#/css/tailwind.css";

import { ReactQueryClientProvider } from "#/providers/ReactQueryClientProvider";
import CustomThemeProvider from "#/providers/CustomThemeProvider";
import ToastProvider from "#/providers/ToastProvider";
import { getSharedMetadata } from "#/libs";
import { getAllPosts } from "#/libs/server";

import Header from "#/components/layout/Header";
import ScrollProgressbar from "#/components/layout/ScrollProgressbar";
import GenerateButton from "#/components/layout/GenerateButton";
import LogInDialog from "#/components/molecules/LogInDialog";

dayjs.locale("ko");

export const metadata: Metadata = getSharedMetadata();

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const allPosts = getAllPosts();

  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        {/* 마이크로소프트 클레어리티 */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "nf6gj21osg");
          `}
        </Script>

        {/* 구글 애널리틱스 */}
        <meta
          name="google-site-verification"
          content="ZsUkDIeJbE8ELv4H-4HzPfxOSutkq_1_0dtGv6JqW1k"
        />

        {/* 네이버 웹마스터 */}
        <meta
          name="naver-site-verification"
          content="00720ce5c121eb17183f33f938f4adb71a6ae553"
        />
      </head>
      <body className="scroll-smooth p-4">
        <ReactQueryClientProvider>
          <ScrollProgressbar />

          <CustomThemeProvider>
            <ToastProvider>
              <LogInDialog />
              <Header />
              <main>{children}</main>
              {process.env.NODE_ENV === "development" && (
                <GenerateButton allPosts={allPosts} />
              )}
            </ToastProvider>
          </CustomThemeProvider>

          {/* 토스트 포탈 */}
          <aside
            id="toast-root"
            className="fixed left-1/2 top-0 z-[999] my-4 flex -translate-x-1/2 flex-col gap-4"
          />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
