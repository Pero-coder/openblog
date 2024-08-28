"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { del } from "@vercel/blob";
import { redirect } from "next/navigation";

export default async function deletePost(postId: string) {
    const session = await auth();

    if (!session) {
        return "You need to be logged in to delete a post";
    }

    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });

    if (!post) {
        return "Post not found";
    }

    if (post.authorId !== session.user.id) {
        return "You are not authorized to delete this post";
    }

    await del(post.imageUrl);

    await prisma.post.delete({
        where: {
            id: postId,
        },
    });

    redirect("/");
}
