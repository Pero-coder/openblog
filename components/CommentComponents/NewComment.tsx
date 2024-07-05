import createComment from "../ServerActions/createComment"

export default async function NewComment({ postId }: { postId: string }) {
    const createCommentWithId = createComment.bind(null, postId)

    return (
        <form action={createCommentWithId}>
            <div className="flex gap-3">
                <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="comment" placeholder="Add a comment" required></textarea>
                <button className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center max-h-10" type="submit">Comment</button>
            </div>
        </form>
    )
}