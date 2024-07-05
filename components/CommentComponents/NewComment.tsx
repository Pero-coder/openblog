"use client"

import createComment from "../ServerActions/createComment"
import { useRef } from "react"
import { useFormStatus } from "react-dom"

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" disabled={pending} className={`px-4 py-2 text-white rounded max-h-10 ${pending ? "bg-slate-500" : "bg-blue-500 hover:bg-blue-400"}`}>{pending ? "Sending..." : "Comment"}</button>
    )
}

export default function NewComment({ postId }: { postId: string }) {
    const createCommentWithId = createComment.bind(null, postId)
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <form 
            action={ async (FormData) => {
                await createCommentWithId(FormData)
                formRef.current?.reset()
            } }
            ref={formRef}
        >
            <div className="flex gap-3">
                <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="comment" placeholder="Add a comment" required></textarea>
                <SubmitButton />
            </div>
        </form>
    )
}