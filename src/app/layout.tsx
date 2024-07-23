import type { Metadata } from "next";
import Script from "next/script";
import dayjs from "dayjs";
import "dayjs/locale/ko";

// Supports weights 100-900
import "@fontsource-variable/noto-sans";
import "#/css/tailwind.css";

import CustomThemeProvider from "#/providers/CustomThemeProvider";
import ToastProvider from "#/providers/ToastProvider";
import Header from "#/components/layout/Header";

dayjs.locale("ko");

export const metadata: Metadata = {};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko" className="scroll-smooth">
      <head />
      <body className="scroll-smooth p-4">
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "nbx9pl1nx9");
          `}
        </Script>
        <CustomThemeProvider>
          <ToastProvider>
            <Header />
            <main>{children}</main>
          </ToastProvider>
        </CustomThemeProvider>

        {/* 토스트 포탈 */}
        <aside
          id="toast-root"
          className="fixed left-1/2 top-0 z-[999] my-4 flex -translate-x-1/2 flex-col gap-4"
        />
      </body>
    </html>
  );
};

export default RootLayout;
