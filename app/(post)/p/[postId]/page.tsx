import { prisma } from "@/lib/prisma"
import FollowButton from "@/components/Buttons/FollowButton"
import Image from "next/image"
import Link from "next/link"
import Markdown from "react-markdown"
import LikeButton from "@/components/Buttons/LikeButton"
import { auth } from "@/auth"
import createComment from "@/components/ServerActions/createComment"


export default async function PostPage({ params }: { params: { postId: string } }) {
    const session = await auth()

    const post = await prisma.post.findUnique({
        where: {
            id: params.postId
        }
    })

    const createCommentWithId = createComment.bind(null, params.postId)

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
                <Link href={`/u/${user?.userName}`}>
                    <Image src={user?.image as string} alt="" width={50} height={50} className="rounded-full"/>
                </Link>
                <p>{user?.name}</p>
                <FollowButton userId={user?.id as string}/>
            </div>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            {session && <p>
                <LikeButton initialLikes={post.likes.length} initialLikeState={post.likes.includes(session.user.id as string)} postId={post.id}/>
            </p>}
            <div className="max-h-96"><img alt="" src={post.imageUrl} className="w-full h-full max-h-96"/></div>
            <Markdown className="prose lg:prose-xl">{post.content}</Markdown>
            <div className="flex flex-row gap-2 italic justify-end">
                <p>Posted at:</p>
                <p>{post.createdAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                <p>{post.createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="border-t border-gray-400 my-5"></div>
            <h3 className="text-xl font-bold">{comments.length} comments:</h3>
            <form action={createCommentWithId}>
                <div className="flex gap-3">
                    <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="comment" placeholder="Add a comment" required></textarea>
                    <button className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center max-h-10" type="submit">Comment</button>
                </div>
            </form>
            <div className="flex flex-col gap-5">
                {comments.map(comment => (
                    <div key={comment.id} className="flex gap-3 p-4 bg-slate-50 rounded-sm">
                        <Link href={`/u/${comment.author.userName}`}>
                            <Image src={comment.author.image as string} alt="" width={50} height={50} className="rounded-full"/>
                        </Link>
                        <div className="flex flex-col gap-2 w-full">
                            <Link href={`/u/${comment.author.userName}`}>
                                <p className="font-bold hover:underline">{comment.author.name}</p>
                            </Link>
                            <p>{comment.content}</p>
                            <div className="flex flex-row gap-2 italic text-sm justify-end">
                                <p>Commented at:</p>
                                <p>{comment.createdAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                                <p>{comment.createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
