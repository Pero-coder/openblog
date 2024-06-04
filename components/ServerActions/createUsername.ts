"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

export default async function createUsername(prevState: any, form: FormData) {
    const userNameExist = await prisma.user.findUnique({
        where: {
            userName: form.get("userName") as string
        }
    })

    if (userNameExist) {
        return {
            message: "Username already taken"
        }
    }
    
    const session = await auth()

    await prisma.user.update({
        where: {
            id: session?.user.id
        },
        data: {
            userName: form.get("userName") as string
        }
    })

    redirect("/")
    
    return {
        message: "Username created successfully"
    }
}
