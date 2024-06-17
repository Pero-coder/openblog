"use client"

import { useSession } from "next-auth/react";
import { useState } from "react";
import handleFollow from "@/components/ServerActions/handleFollow";

export default function FollowButton({ userId }: { userId: string }) {
    const { data: session, update } = useSession()
    const [following, setFollowing] = useState(session?.user.following.includes(userId))

    if (!session) {
        return <></>
    }

    return (
        <button className={`px-4 py-2 rounded ${!following ? "bg-blue-500 text-white" : "bg-white text-blue-500 border border-blue-500"}`} onClick={ async () => {
            await handleFollow(userId)
            await update()
            setFollowing(!following)
        } }>
            {following ? "Unfollow" : "Follow"}
        </button>
    );
}
