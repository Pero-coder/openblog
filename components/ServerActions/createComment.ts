"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export default async function createComment(postId: string, form: FormData) {
    if (!form.get("comment")) {
        return  "Comment is empty"
    }

    const isCuid = /^c[a-z0-9]{24}$/.test(postId)

    if (!isCuid) {
        return "Invalid ID format"
    }

    const session = await auth()

    if (!session) {
        return "You must be logged in to comment"
    }

    await prisma.comments.create({
        data: {
            authorId: session.user.id as string,
            postId: postId,
            content: form.get("comment") as string
        }
    })

    revalidatePath(`/p/${postId}`)
}
