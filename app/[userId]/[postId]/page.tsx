import { prisma } from "@/lib/prisma"

import Image from "next/image"
import Link from "next/link"
import Markdown from "react-markdown"

export default async function PostPage({ params }: { params: { postId: string } }) {
    const post = await prisma.post.findUnique({
        where: {
            id: params.postId
        }
    })

    const user = await prisma.user.findUnique({
        where: {
            id: post?.authorId
        }
    })

    if (!post) {
        return <div>User not found</div>
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5 items-center">
                <Link href={`/${user?.id}`}>
                    <Image src={user?.image as string} alt="" width={50} height={50} className="rounded-full"/>
                </Link>
                <p>{user?.name}</p>
                <p>{`${post.createdAt.getHours()}:${post.createdAt.getMinutes()} ${post.createdAt.getDate()}.${post.createdAt.getMonth()}. ${post.createdAt.getFullYear()}`}</p>
            </div>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <Image alt="" src={post.imageUrl} width={16*50} height={9*50}/>
            <Markdown className="prose lg:prose-xl">{post.content}</Markdown>
        </div>
    )
}