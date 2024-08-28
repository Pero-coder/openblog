"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import WelcomePage from "@/components/WelcomePage";
import CreateUsernamePage from "@/components/CreateUsernamePage";
import { useState } from "react";

export default function PageSelector({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [guest, setGuest] = useState(false);

    if (
        !session &&
        !(pathname.startsWith("/p") || pathname.startsWith("/u")) &&
        !guest
    ) {
        return <WelcomePage setGuest={setGuest} />;
    }

    if (session && !session?.user.userName) {
        return <CreateUsernamePage />;
    }

    return <>{children}</>;
}
