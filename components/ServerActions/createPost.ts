"use server"

import { prisma } from "@/lib/prisma"
import { put } from '@vercel/blob'
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { z } from "zod"

const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5 MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const fileSchema = z.instanceof(File).refine(file => file.size <= MAX_FILE_SIZE, {
    message: "File size should be less than 4.5 MB",
}).refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Invalid file type. Only JPEG, PNG, and WEBP are allowed",
});

const schema = z.object({
    title: z.string().min(1),
    image: fileSchema,
    content: z.string().min(1),
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

    const imageFile = validated.data.image as File;

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
