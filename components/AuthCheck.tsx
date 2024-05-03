import { auth } from "@/auth";

import { SessionProvider } from "next-auth/react";

import WelcomePage from "@/app/WelcomePage";

export default async function AuthCheck({ children }: { children: React.ReactNode }) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <WelcomePage>
                {children}
            </WelcomePage>
        </SessionProvider>
    );
}