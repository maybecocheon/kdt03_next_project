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
            {children} {/* 내가 app 폴더 내에 만든 컴포넌트가 children */}
      </body>
    </html>
  );
}
