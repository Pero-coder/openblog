"use server"

import { prisma } from "@/lib/prisma"
// import { put } from '@vercel/blob'
import { auth } from "@/auth"
import type { Session } from "next-auth"
import { redirect } from "next/navigation"



export default async function createPost(form: FormData) {
    // const blob = await put(form.get("title") as string, form.get("image") as FormDataEntryValue, {
    //     access: 'public',
    // });
    
    const session = await auth() as Session

    const post = await prisma.post.create({
        data: {
            authorId: session.user?.id as string,
            title: form.get("title") as string,
            imageUrl: form.get("image") as string,
            content: form.get("content") as string,
        }
    })

    redirect(`/p/${post.id}`)
}