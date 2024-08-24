"use server"

import { prisma } from "@/lib/prisma"
import { put } from '@vercel/blob'
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { z } from "zod"
import { contentSchema, fileSchema, titleSchema } from "../schemas"

const schema = z.object({
    title: titleSchema,
    image: fileSchema,
    content: contentSchema,
});

export default async function createPost(form: FormData) {
    const session = await auth()
    
    if (!session) {
        return "Unauthorized"
    }

    const formData = {
        title: form.get("title"),
        image: form.get("image"),
        content: form.get("content"),
    };

    const validated = schema.safeParse(formData);

    if (!validated.success) {
        return "Invalid form: " + JSON.stringify(validated.error.errors);
    }

    const imageFile = validated.data.image;

    const blob = await put(imageFile.name, imageFile, {
        access: 'public',
        contentType: imageFile.type,
    });

    const post = await prisma.post.create({
        data: {
            authorId: session.user?.id as string,
            title: validated.data.title,
            imageUrl: blob.url,
            content: validated.data.content
        }
    });

    return redirect(`/p/${post.id}`);
}
