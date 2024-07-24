import { auth } from "@/auth"
import EditPostSubmitButton from "@/components/PostComponents/EditPostSubmitButton"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function EditPostPage({ params }: { params: { postId: string } }) {
    
    const post = await prisma.post.findUnique({
        where: {
            id: params.postId
        }
    })
    
    if (!post) {
        return <div>Post not found</div>
    }
    
    const user = await prisma.user.findUnique({
        where: {
            id: post?.authorId
        }
    })
    
    const session = await auth()

    if (user?.id !== session?.user.id) {
        return <div>Not authenticated</div>
    }

    return (
        <form action={async (form) => {
            "use server"
            await prisma.post.update({
                where: {
                    id: post.id
                },
                data: {
                    title: form.get('title') as string || undefined,
                    content: form.get('content') as string || undefined
                }
            })
            redirect(`/p/${post.id}`)
        }}>
            <div className="flex flex-col gap-5">
                <h1 className="text-xl">Edit post</h1>
                <p>
                    <input type="text" name="title" placeholder="Title..." defaultValue={post.title}  className="w-full h-14 text-2xl placeholder-gray-500 focus:outline-none bg-slate-50 p-5 rounded-md" />
                </p>
                <div className="max-h-96"><img alt="" src={post.imageUrl} className="w-full h-full max-h-96"/></div>
                <p>
                    <textarea
                        name="content" 
                        placeholder="Content..." 
                        className="resize-none w-full min-h-64 placeholder-gray-500 focus:outline-none bg-slate-50 p-5 rounded-md"
                    >
                        {post.content}
                    </textarea>
                </p>
            </div>
            <EditPostSubmitButton />
        </form>
    )
}
