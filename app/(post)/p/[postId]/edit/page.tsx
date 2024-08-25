import { auth } from "@/auth";
import SubmitButton from "@/components/Buttons/SubmitButton";
import ImageDropzone from "@/components/ImageDropzone";
import editPost from "@/components/ServerActions/editPost";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EditPostPage({
    params,
}: {
    params: { postId: string };
}) {
    const post = await prisma.post.findUnique({
        where: {
            id: params.postId,
        },
    });

    if (!post) {
        return <div>Post not found</div>;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: post?.authorId,
        },
    });

    const session = await auth();

    if (user?.id !== session?.user.id) {
        return <div>Not authenticated</div>;
    }

    const editPostWithId = editPost.bind(null, post.id);

    return (
        <form
            className="w-full"
            action={editPostWithId}
        >
            <div className="flex flex-col gap-5">
                <h1 className="text-xl">Edit post</h1>
                <p>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title..."
                        defaultValue={post.title}
                        className="w-full h-14 text-2xl placeholder-gray-500 focus:outline-none bg-slate-50 p-5 rounded-md"
                    />
                </p>
                
                <ImageDropzone preview={post.imageUrl} />

                <p>
                    <textarea
                        name="content"
                        placeholder="Content..."
                        defaultValue={post.content}
                        className="resize-none w-full min-h-64 placeholder-gray-500 focus:outline-none bg-slate-50 p-5 rounded-md"
                    />
                </p>
            </div>
            <SubmitButton value="Edit post" pendingMessage="Editing post..." />
        </form>
    );
}
