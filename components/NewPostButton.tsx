"use client"

import { useState } from "react"
import CreateNewPost from "@/components/NewPostModal"

export default function NewPostButton() {
    const [modal, setModal] = useState(false)

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
