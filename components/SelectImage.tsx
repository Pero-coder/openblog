/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fileSchema } from "./schemas";

export default function SelectImage({ image }: { image: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState(image);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = () => {
        if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
            const file = fileSchema.safeParse(fileInputRef.current.files[0]);

            if (!file.success) {
                alert(file.error.errors[0].message);
                fileInputRef.current.value = "";
                return;
            }

            setPreview(URL.createObjectURL(file.data));
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <div
                className="relative w-[250px] h-[250px] rounded-full cursor-pointer hover:opacity-80"
                onClick={handleImageClick}
            >
                <img
                    src={preview}
                    alt=""
                    className="rounded-full cursor-pointer w-[250px] h-[250px] object-cover"
                />
                <FontAwesomeIcon
                    icon={faPen}
                    className="absolute inset-0 m-auto"
                    color="gray"
                    size="2x"
                />
            </div>
            <input
                type="file"
                accept="image/jpeg, image/png, image/webp"
                name="image"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}
