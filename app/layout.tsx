import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import AuthCheck from "@/components/AuthCheck";
import NavMenu from "./NavMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <AuthCheck>
          <NavMenu />
          <main className="flex items-center justify-center min-w-full my-5">{children}</main>
          {modal}
        </AuthCheck>
      </body>
    </html>
  );
}
