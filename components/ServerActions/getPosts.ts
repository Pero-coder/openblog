"use server"

import { prisma } from "@/lib/prisma"

export default async function getPosts(offset: number, limit: number, authorId?: string) {
    const posts = await prisma.post.findMany({ 
        where: authorId ? { authorId: authorId } : undefined,
        take: limit, 
        skip: offset,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            author: {
                select: {
                    userName: true,
                    image: true,
                    name: true
                }
            }
        }
    });

    return posts
}
