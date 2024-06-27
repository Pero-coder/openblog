"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export default async function handleLike(postId: string) {
    const session = await auth()

    if (!session) {
        return "Not authenticated"
    }

    const isCuid = /^c[a-z0-9]{24}$/.test(postId)

    if (!isCuid) {
        return "Invalid ID format"
    }
    
    const post = await prisma.post.findUnique({ where: { id: postId } })

    if (!post) {
        return "Post not found"
    }

    if (post?.likes.includes(session.user.id as string)) {
        await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likes: {
                    set: post.likes.filter((i) => i !== session.user.id)
                }
            }
        })
    } else {
        await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likes: {
                    push: session.user.id
                }
            }
        })
    }
}
