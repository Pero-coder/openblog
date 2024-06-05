"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { z } from "zod"

export default async function createUsername(prevState: any, form: FormData) {
    const session = await auth()
    
    if (!session) {
        return {
            message: "Not authenticated"
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
    
    // return { message: "(test submit)" }

    if (!username.success) {
        return {
            message: username.error?.message
        }
    }

    const userNameExist = await prisma.user.findUnique({
        where: {
            userName: username.data
        }
    })

    if (userNameExist) {
        return {
            message: "Username already taken"
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

    redirect("/")
    
    return {
        message: "Username created successfully"
    }
}
