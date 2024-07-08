"use client"

import PostThumbnail from "@/components/PostComponents/PostThumbnail";
import getPosts from "@/components/ServerActions/getPosts";
import type { PostsType } from "@/components/ServerActions/getPosts";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const NUMBER_OF_POSTS_TO_FETCH = 3

export default function PostsList({ authorIds } : { authorIds?: string[] }) {

    const [posts, setPosts] = useState<PostsType>([]);
    const [offset, setOffset] = useState(0);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            const fetchPosts = async () => {
                const newPosts = await getPosts(offset, NUMBER_OF_POSTS_TO_FETCH, authorIds);
                if (newPosts.length === 0) return setHasMorePosts(false);
                setPosts([...posts, ...newPosts]);
                setOffset(offset + NUMBER_OF_POSTS_TO_FETCH);
            };
            fetchPosts();
        }
    }, [inView]);

    return (
        <div className="flex flex-col gap-5">
            {posts?.map(post => <PostThumbnail post={post} key={post.id}/>)}
            <div ref={ref} className="text-center">
                {hasMorePosts ? "Loading..." : "There are no more posts... 😢"}
            </div>
        </div>
    );
}
