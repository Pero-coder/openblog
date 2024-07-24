import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function EditButton({ postId }: { postId: string }) {
    return (
        <Link href={`/p/${postId}/edit`}>
            <FontAwesomeIcon icon={faPenToSquare} /> Edit post
        </Link>
    );
}
