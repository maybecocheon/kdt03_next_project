import type { Metadata } from "next";
import { myFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "K-Digital 3기",
  description: "K-Digital 3기 Next.js",
};

// nextjs가 전달해 주는 props가 children
export default function RootLayout({ children, }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="ko">
      <body className={myFont.className}>
            {children}
      </body>
    </html>
  );
}
