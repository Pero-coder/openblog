"use client"

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import handleLike from "../ServerActions/handleLike";

export default function LikeButton({ initialLikes, initialLikeState, postId }: { initialLikes: number, initialLikeState: boolean, postId: string }) {
    const [liked, setLiked] = useState(initialLikeState);
    const [likes, setLikes] = useState(initialLikes);

    return (
        <button 
            onClick={async () => {
                    setLiked(!liked)
                    setLikes(liked ? likes - 1 : likes + 1)
                    await handleLike(postId)
                }
            }
        >
            <FontAwesomeIcon icon={ liked ? faHeartSolid : faHeart } style={{ color: "#ff0000" }} size="lg" />
            <span className="mx-2">{likes}</span>
        </button>
    );
}
