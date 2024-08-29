"use client";

import PostsList from "./PostsList";
import { useSession, getSession } from "next-auth/react";
import { useState, useTransition } from "react";
import PostThumbnailSkeleton from "../Skeletons/PostThumbnailSkeleton";

export default function Posts() {
    const [isPending, startTransition] = useTransition();
    const { data: session } = useSession();
    const [followIds, setFollowIds] = useState(session?.user.following || []);
    const [followPosts, setFollowPosts] = useState(false);

    return (
        <>
            {session && (
                <div className="flex flex-row gap-5 w-full m-5">
                    <button
                        className={`w-full bg-slate-100 hover:bg-slate-50 transition-colors duration-100 rounded-md px-3 py-1 ${
                            !followPosts && "border-b-4 border-blue-500"
                        }`}
                        onClick={() => setFollowPosts(false)}
                    >
                        All Posts
                    </button>
                    <button
                        className={`w-full hover:bg-slate-50 transition-colors duration-100 bg-slate-100 rounded-md px-3 py-1 ${
                            followPosts && "border-b-4 border-blue-500"
                        }`}
                        onClick={() => {
                            setFollowPosts(true);
                            startTransition(async () => {
                                setFollowIds(
                                    (await getSession())?.user.following || []
                                );
                            });
                        }}
                    >
                        Following Posts
                    </button>
                </div>
            )}
            {followPosts ? (
                isPending ? (
                    <PostThumbnailSkeleton />
                ) : (
                    <PostsList key="follow_posts" authorIds={followIds} />
                )
            ) : (
                <PostsList key="all_posts" />
            )}
        </>
    );
}
