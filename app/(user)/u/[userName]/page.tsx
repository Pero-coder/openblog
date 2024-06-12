import { prisma } from "@/lib/prisma"
import PostsList from "@/components/PostsList"
import Image from "next/image"
import getPosts from "@/components/ServerActions/getPosts"
import FollowButton from "@/components/FollowButton"

export default async function UserProfile({ params }: { params: { userName: string } }) {
    const user = await prisma.user.findUnique({
        where: {
            userName: params.userName
        }
    })

    if (!user) {
        return <div>User not found</div>
    }

    const posts = await getPosts(0, 3, user.id)

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row gap-5 items-center">
                <Image src={user?.image as string} alt="" width={50} height={50} className="rounded-full"/>
                <p className="text-3xl">{user?.name}</p>
                <FollowButton userId={user?.id as string}/>
            </div>
            <div className="flex flex-col gap-5">
                <PostsList initialPosts={posts} authorId={user.id} />
            </div>
        </div>
    )
}
