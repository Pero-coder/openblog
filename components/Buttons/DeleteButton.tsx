"use client";

import { useState } from "react";
import deletePost from "../ServerActions/deletePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeleteButton({ postId }: { postId: string }) {
    const [loading, setLoading] = useState(false);

    return (
        <button
            onClick={async () => {
                if (confirm("Are you sure you want to delete this post?")) {
                    setLoading(true);
                    await deletePost(postId);
                }
            }}
            disabled={loading}
            className="text-red-500"
        >
            {loading ? (
                "Deleting..."
            ) : (
                <span>
                    <FontAwesomeIcon icon={faTrash} color="red" /> Delete
                </span>
            )}
        </button>
    );
}
