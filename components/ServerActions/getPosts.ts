"use server"

import { prisma } from "@/lib/prisma"

export default async function getPosts(offset: number, limit: number, authorIds?: string[]) {
    const posts = await prisma.post.findMany({ 
        where: authorIds ? { authorId: { in: authorIds } } : undefined,
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
            },
            _count: {
                select: {
                    comments: true
                }
            }
        }
    });

    return posts
}

export type PostsType = Awaited<ReturnType<typeof getPosts>>;
