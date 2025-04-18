import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

import AuthCheck from "@/components/AuthCheck";
import NavMenu from "../components/NavMenu";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenBlog",
  description: "Welcome to the free and opensource blogging social network!",
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader shadow="false" color="#3b82f6" />
        <AuthCheck>
          <NavMenu />
          <main className="flex flex-col items-center justify-center mx-auto max-w-3xl p-5 mt-16">{children}</main>
          {modal}
          <div id="modal-root" />
        </AuthCheck>
      </body>
    </html>
  );
}
