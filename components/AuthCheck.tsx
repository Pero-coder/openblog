import { auth } from "@/auth";

import { SessionProvider } from "next-auth/react";

import PageSelector from "./PageSelector";

export default async function AuthCheck({ children }: { children: React.ReactNode }) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <PageSelector>
                {children}
            </PageSelector>
        </SessionProvider>
    );
}