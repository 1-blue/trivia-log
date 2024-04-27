import type { Metadata } from "next";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import "#/css/tailwind.css";

import Header from "#/components/layout/Header";
import CustomThemeProvider from "#/providers/CustomThemeProvider";

dayjs.locale("ko");

export const metadata: Metadata = {};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="scroll-smooth p-4">
        <CustomThemeProvider>
          <Header />
          <main>{children}</main>
        </CustomThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
