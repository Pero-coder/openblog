"use server"

import { prisma } from "@/lib/prisma"

export default async function getPosts(offset: number, limit: number) {
    const posts = await prisma.post.findMany({ 
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
