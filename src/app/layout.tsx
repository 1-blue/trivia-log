import type { Metadata } from "next";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import "#/css/tailwind.css";
import Header from "#/components/layout/Header";
import { ThemeProvider } from "next-themes";

dayjs.locale("ko");

export const metadata: Metadata = {};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider defaultTheme="system">
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
