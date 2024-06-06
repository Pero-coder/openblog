"use client"

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import WelcomePage from "@/components/WelcomePage";
import CreateUsernamePage from "@/components/CreateUsernamePage";

export default function PageSelector({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session && !(pathname.startsWith("/p") || pathname.startsWith("/u"))) {
    return <WelcomePage />
  }

  if (session && !session?.user.userName) {
    return <CreateUsernamePage />
  }

  return (
    <>
      { children }
    </>
  );
}
