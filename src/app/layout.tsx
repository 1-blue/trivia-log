import type { Metadata } from "next";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import "#/css/tailwind.css";

import CustomThemeProvider from "#/providers/CustomThemeProvider";
import ToastProvider from "#/providers/ToastProvider";
import Header from "#/components/layout/Header";

dayjs.locale("ko");

export const metadata: Metadata = {};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="scroll-smooth p-4">
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
