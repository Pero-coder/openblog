"use client"

import PostThumbnail from "@/components/PostThumbnail";
import getPosts from "@/components/ServerActions/getPosts";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const NUMBER_OF_POSTS_TO_FETCH = 3

export default function PostsList({ initialPosts } : { initialPosts: ({
        author: {
            userName: string | null;
            image: string | null;
            name: string | null;
        };
    } & {
        id: string;
        title: string;
        content: string;
        imageUrl: string;
        authorId: string;
        createdAt: Date;
    })[] }) {

    const [posts, setPosts] = useState(initialPosts);
    const [offset, setOffset] = useState(NUMBER_OF_POSTS_TO_FETCH);
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            const fetchPosts = async () => {
                const newPosts = await getPosts(offset, NUMBER_OF_POSTS_TO_FETCH);
                setPosts([...posts, ...newPosts]);
                setOffset(offset + NUMBER_OF_POSTS_TO_FETCH);
            };
            fetchPosts();
        }
    }, [inView]);

    return (
        <div className="flex flex-col gap-5">
            {posts.map(post => <PostThumbnail post={post} key={post.id}/>)}
            <div ref={ref}>
                Loading...
            </div>
        </div>
    );
}
