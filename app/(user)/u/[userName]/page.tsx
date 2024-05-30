import { prisma } from "@/lib/prisma"

import Image from "next/image"
import Link from "next/link"
import PostThumbnail from "@/components/PostThumbnail"

export default async function UserProfile({ params }: { params: { userName: string } }) {
    const user = await prisma.user.findUnique({
        where: {
            userName: params.userName
        }
    })

    if (!user) {
        return <div>User not found</div>
    }

    const posts = await prisma.post.findMany({
        where: {
            authorId: user.id
        }
    })

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row gap-5 items-center">
                <Link href={`/${user?.id}`}>
                    <Image src={user?.image as string} alt="" width={50} height={50} className="rounded-full"/>
                </Link>
                <p className="text-3xl">{user?.name}</p>
            </div>
            <div className="flex flex-col gap-5">
                {posts.map(post => <PostThumbnail post={post} key={post.id}/>)}
                <p>There are no more posts 😢</p>
            </div>
        </div>
    )
}