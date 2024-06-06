"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { z } from "zod"

export default async function createUsername(prevState: any, form: FormData) {
    const session = await auth()
    
    if (!session) {
        return {
            message: "Not authenticated",
            type: "error"
        }
    }

    const username = z
        .string()
        .min(1)
        .max(20)
        .refine((value) => encodeURIComponent(value) === value, {
            message: "Username must be URL safe"
        })
        .safeParse(form.get("userName"))

    if (!username.success) {
        return {
            message: username.error?.errors[0]?.message,
            type: "error"
        }
    }

    const userNameExist = await prisma.user.findUnique({
        where: {
            userName: username.data
        }
    })

    if (userNameExist) {
        return {
            message: "Username already taken",
            type: "warning"
        }
    }
    
    await prisma.user.update({
        where: {
            id: session?.user.id
        },
        data: {
            userName: username.data
        }
    })

    return {
        message: "Username created successfully",
        type: "success"
    }
}
