"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export default async function handleFollow(id: string) {
    const session = await auth()

    if (!session) {
        return "Not authenticated"
    }

    const isCuid = /^c[a-z0-9]{24}$/.test(id)

    if (!isCuid) {
        return "Invalid ID format"
    }

    if (!(await prisma.user.findUnique({ where: { id: id } }))) {
        return "User not found"
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } })

    if (user?.following.includes(id)) {
        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                following: {
                    set: user.following.filter((i) => i !== id)
                }
            }
        })
    } else {
        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                following: {
                    push: id
                }
            }
        })
    }
}
