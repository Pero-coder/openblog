"use client";

import createPost from "@/components/ServerActions/createPost";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SubmitButton from "../Buttons/SubmitButton";
import ImageDropzone from "../ImageDropzone";


export default function CreateNewPost({
    openModal,
    closeModal,
}: {
    openModal: boolean;
    closeModal: () => void;
}) {
    const ref = useRef<React.ElementRef<"dialog">>(null);
    
    useEffect(() => {
        if (openModal) {
            ref.current?.showModal();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            ref.current?.close();
        }
    }, [openModal]);

    return (
        <dialog
            className="backdrop:bg-black/10 backdrop:backdrop-blur-sm rounded-lg border-2 border-black p-10 w-auto max-w-7xl h-auto"
            ref={ref}
            onCancel={closeModal}
        >
            <button
                onClick={closeModal}
                className="fixed top-6 right-6 bg-slate-50 rounded-full p-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-black"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <div className="flex flex-col gap-5 h-fit w-full">
                <h1 className="text-xl">Create a New Post</h1>
                <form
                    action={createPost}
                    className="flex flex-col gap-5 w-full h-fit"
                >
                    <p>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title..."
                            className="w-full h-14 text-2xl placeholder-gray-500 focus:outline-none bg-slate-100 p-5 rounded-md"
                            required
                        />
                    </p>

                    <ImageDropzone required />

                    <p>
                        <Link
                            href="https://www.markdownguide.org/basic-syntax/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-gray-400 hover:text-gray-300"
                        >
                            Tip! you can use Markdown syntax
                        </Link>
                        <textarea
                            name="content"
                            placeholder="Content..."
                            className="resize-none w-full h-96 placeholder-gray-500 focus:outline-none bg-slate-100 p-5 rounded-md"
                            required
                        />
                    </p>
                    <SubmitButton pendingMessage="Sending post..." value="Create Post" />
                </form>
            </div>
        </dialog>
    );
}
