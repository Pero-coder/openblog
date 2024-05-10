"use client"

import createPost from "../createPost"

import { useFormStatus } from "react-dom"
import Dropzone from "react-dropzone"
import { useState } from "react"

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" disabled={pending} className={`px-4 py-2 text-white rounded max-w-32 ${pending ? "bg-slate-500" : "bg-blue-500 hover:bg-blue-400"}`}>{pending ? "Sending post..." : "Create Post"}</button>
    )
}

export default function CreateNewPost() {
    const [previewSrc, setPreviewSrc] = useState('');

    const onDrop = (acceptedFiles: File[]) => {
        const file: File = acceptedFiles[0];
        const reader: FileReader = new FileReader();
        
        reader.onloadend = () => {
            setPreviewSrc(reader.result as string);
        };
        
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex flex-col gap-5 h-fit w-full">
            <h1 className="text-xl">Create a New Post</h1>
            <form
                action={createPost}
                className="flex flex-col gap-5 w-full h-fit"
            >
                <p>
                    <input type="text" name="title" placeholder="Title..." className="w-full h-14 text-2xl placeholder-gray-500 focus:outline-none bg-slate-100 p-5 rounded-md" required />
                </p>

                <p>
                    <input type="text" name="image" placeholder="Image link" className="w-full h-7 placeholder-gray-500 focus:outline-none bg-slate-100 p-5 rounded-md" required/>
                </p>

                <p className="border-2 border-yellow-500 text-black px-4 py-2 rounded-md mb-4 bg-yellow-500 bg-opacity-50">Due to reaching the rate limit for the blob store, only image links currently work</p>
                
                <Dropzone onDrop={onDrop} maxFiles={1} accept={{'image/*': []}}>
                    {({getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject}) => (
                        <section >
                            <div {...getRootProps({className: `cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md transition-colors duration-200 ease-in-out ${!isDragActive && "border-gray-300 hover:bg-gray-100"} ${isDragAccept && "border-green-300 bg-green-100"} ${isDragReject && "border-red-300 bg-red-100"}`})}>
                                <input {...getInputProps({type: "file", accept: "image/*"})} />
                                {previewSrc ? <img src={previewSrc} alt="preview" className="max-w-2xl h-auto" /> : <p className="text-gray-500">Drag &apos;n&apos; drop image file here, or click to select</p>}
                            </div>
                        </section>
                    )}
                </Dropzone>

                <p>
                    <textarea name="content" placeholder="Content..." className="resize-none w-full h-96 placeholder-gray-500 focus:outline-none bg-slate-100 p-5 rounded-md" required />
                </p>

                <SubmitButton />
            </form>
        </div>
    )
}
