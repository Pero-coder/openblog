"use client"

import { useState } from "react"
import CreateNewPost from "@/components/NewPostComponents/NewPostModal"
import type { Session } from "next-auth"

export default function NewPostButton({ session }: { session: Session | null }) {
    const [modal, setModal] = useState(false)

    if (!session) {
        return null
    }

    return (
        <>
            <button
                onClick={() => setModal(true)}
                className="flex justify-center text-center w-14 h-14 bg-blue-500 hover:bg-blue-400 text-white rounded-full text-5xl"
            >
                +
            </button>
            <CreateNewPost openModal={modal} closeModal={() => setModal(false)} />
        </>
    )
}
