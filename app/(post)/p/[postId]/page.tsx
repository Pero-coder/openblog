import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

import Image from "next/image"
import Link from "next/link"
import Markdown from "react-markdown"

import LikeButton from "@/components/Buttons/LikeButton"
import FollowButton from "@/components/Buttons/FollowButton"
import Comment from "@/components/CommentComponents/Comment"
import NewComment from "@/components/CommentComponents/NewComment"
import EditButton from "@/components/Buttons/EditButton"


export default async function PostPage({ params }: { params: { postId: string } }) {
    const session = await auth()

    const post = await prisma.post.findUnique({
        where: {
            id: params.postId
        }
    })

    if (!post) {
        return <div>Post not found</div>
    }

    const comments = await prisma.comments.findMany({
        where: {
            postId: params.postId
        },
        include: {
            author: {
                select: {
                    image: true,
                    userName: true,
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const user = await prisma.user.findUnique({
        where: {
            id: post?.authorId
        }
    })


    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-5 items-center">
                <Link href={`/u/${user?.userName}`} className="flex flex-row flex-shrink-0 gap-3 hover:underline">
                    <Image src={user?.image as string} alt="" width={50} height={50} className="rounded-full"/>
                    <div>
                        <p className="font-bold">{user?.name}</p>
                        <p className="text-gray-500 italic">@{user?.userName}</p>
                    </div>
                </Link>
                {(session?.user.id === user?.id) ? <div className="w-full flex justify-end"><EditButton postId={params.postId}/></div> : <FollowButton userId={user?.id as string}/>}
            </div>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p>
                <LikeButton initialLikes={post.likes.length} initialLikeState={session ? post.likes.includes(session.user.id as string) : false} postId={post.id}/>
            </p>
            <div className="max-h-96"><img alt="" src={post.imageUrl} className="w-full h-full max-h-96"/></div>
            <Markdown className="prose lg:prose-xl">{post.content}</Markdown>
            <div className="flex flex-row gap-2 italic justify-end">
                <p>Posted at:</p>
                <p>{post.createdAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                <p>{post.createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="border-t border-gray-400 my-5"></div>
            <h3 className="text-xl font-bold">{comments.length} comments:</h3>
            { session && <NewComment postId={params.postId}/> }
            <div className="flex flex-col gap-5">
                { comments.map(comment => <Comment comment={comment} key={comment.id}/>) }
            </div>
        </div>
    )
}
