"use client"

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { SignIn } from "@/components/sign-in";

export default function WelcomePage({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  if (!session && pathname == "/"){
    return (
      <div className="flex flex-col min-h-screen justify-center text-center space-y-10">
        <h1 className="text-9xl font-bold text-blue-500">OpenBlog</h1>
        <p className="text-base">
          Welcome to the free and opensource blogging social network!
        </p>
        <SignIn />
      </div>
    );
  }

  return (
    <>
      { children }
    </>
  );
}
