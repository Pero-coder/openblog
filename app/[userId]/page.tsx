import { prisma } from "@/lib/prisma"

import Image from "next/image"
import Link from "next/link"

export default async function UserProfile({ params }: { params: { userId: string } }) {
    const user = await prisma.user.findUnique({
        where: {
            id: params.userId
        }
    })

    const posts = await prisma.post.findMany({
        where: {
            authorId: params.userId
        }
    })

    if (!user) {
        return <div>User not found</div>
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row gap-5 items-center">
                <Link href={`/${user?.id}`}>
                    <Image src={user?.image as string} alt="" width={50} height={50} className="rounded-full"/>
                </Link>
                <p className="text-3xl">{user?.name}</p>
            </div>
            <div className="flex flex-col gap-5">
                {posts.map(post => (
                    <Link href={`${user.id}/${post.id}`} key={post.id} className="flex flex-col gap-5">
                        <h1 className="text-xl font-bold">{post.title}</h1>
                        <Image alt="" src={post.imageUrl} width={16*20} height={9*20} className="rounded-md"/>
                    </Link>
                ))}
            </div>
        </div>
    )
}