"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { contentSchema, fileSchema, titleSchema } from "../schemas";
import { redirect } from "next/navigation";
import { del, put } from "@vercel/blob";

export default async function editPost(postId: string, form: FormData) {
    const session = await auth();

    if (!session) {
        return "Not authenticated";
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
        return "Not authorized";
    }

    const image = fileSchema.safeParse(form.get("image")).data;
    
    if (image) {
        const blob = await put(image.name, image, {
            access: "public",
            contentType: image.type
        });

        await del(post.imageUrl);
        
        await prisma.post.update({
            where: {
                id: post.id,
            },
            data: {
                imageUrl: blob.url,
            },
        });
    }

    await prisma.post.update({
        where: {
            id: post.id,
        },
        data: {
            title: titleSchema.safeParse(form.get("title")).data,
            content: contentSchema.safeParse(form.get("content")).data,
        },
    });
    
    redirect(`/p/${post.id}`);
}
