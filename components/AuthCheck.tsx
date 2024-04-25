import { auth } from "@/auth";

import WelcomePage from "@/app/WelcomePage";

export default async function AuthCheck({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session) {
        return <WelcomePage/>;
    }

    return (
        <>
            { children }
        </>
    );
}