/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageDropzone({ required = false, preview = "" }: { required?: boolean, preview?: string }) {
    const [previewSrc, setPreviewSrc] = useState(preview);

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
            if (acceptedFiles.length === 0) return;
            setPreviewSrc(URL.createObjectURL(acceptedFiles[0]));
        },
        maxSize: 4.5 * 1024 * 1024,
        multiple: false,
        onDropRejected(fileRejections) {
            if (fileRejections[0].errors[0].code === "file-too-large") {
                alert("File is too large, max size is 4.5MB");
            }
            if (fileRejections[0].errors[0].code === "file-invalid-type") {
                alert("Invalid file type, only JPEG, PNG, and WEBP are allowed");
            }
        },
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
                        required: required,
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
    )
}
