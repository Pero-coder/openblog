"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

export default async function createUsername(form: FormData) {
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
}
