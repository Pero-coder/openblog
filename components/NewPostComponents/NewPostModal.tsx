/* eslint-disable @next/next/no-img-element */
"use client";

import createPost from "@/components/ServerActions/createPost";

import { useFormStatus } from "react-dom";
import { useDropzone } from "react-dropzone";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`px-4 py-2 text-white rounded max-w-32 ${
                pending ? "bg-slate-500" : "bg-blue-500 hover:bg-blue-400"
            }`}
        >
            {pending ? "Sending post..." : "Create Post"}
        </button>
    );
}

export default function CreateNewPost({
    openModal,
    closeModal,
}: {
    openModal: boolean;
    closeModal: () => void;
}) {
    const [previewSrc, setPreviewSrc] = useState("");
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

    const {
        getInputProps,
        getRootProps,
        isDragAccept,
        isDragActive,
        isDragReject,
        acceptedFiles,
        inputRef,
    } = useDropzone({
        accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
        onDrop: (acceptedFiles) => {
            setPreviewSrc(URL.createObjectURL(acceptedFiles[0]));
        },
        maxSize: 4.5 * 1024 * 1024,
        multiple: false,
    });
    
    // https://github.com/react-dropzone/react-dropzone/issues/131#issuecomment-1423414854
    useEffect(() => {
        if (!inputRef.current) return;

        const dataTransfer = new DataTransfer();
        acceptedFiles.forEach((file) => {
            dataTransfer.items.add(file);
        });

        inputRef.current.files = dataTransfer.files;

        // Help Safari out
        if (inputRef.current.webkitEntries.length) {
            inputRef.current.dataset.file = `${dataTransfer.files[0].name}`;
        }
    }, [acceptedFiles]);

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

                    <section>
                        <div
                            {...getRootProps({
                                className: `cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md transition-colors duration-200 ease-in-out ${
                                    !isDragActive &&
                                    "border-gray-300 hover:bg-gray-100"
                                } ${
                                    isDragAccept &&
                                    "border-green-300 bg-green-100"
                                } ${
                                    isDragReject && "border-red-300 bg-red-100"
                                }`,
                            })}
                        >
                            <input
                                {...getInputProps({
                                    required: true,
                                    name: "image",
                                })}
                                style={{
                                    display: "initial",
                                    opacity: "0",
                                    position: "absolute",
                                    zIndex: -1,
                                }}
                            />
                            {previewSrc ? (
                                <img
                                    src={previewSrc}
                                    alt="preview"
                                    className="max-h-96 w-auto"
                                />
                            ) : (
                                <p className="text-gray-500">
                                    Drag &apos;n&apos; drop image file here, or
                                    click to select
                                </p>
                            )}
                        </div>
                    </section>

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
                    <SubmitButton />
                </form>
            </div>
        </dialog>
    );
}
