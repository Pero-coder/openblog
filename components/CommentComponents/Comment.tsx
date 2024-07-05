import Link from "next/link";
import Image from "next/image";

export default function Comment(
    { comment }: { 
        comment: {
            author: {
                userName: string | null;
                image: string | null;
                name: string | null;
            };
        } & {
            id: string;
            content: string;
            authorId: string;
            postId: string;
            createdAt: Date;
        }
    }
) {
    return (
        <div key={comment.id} className="flex gap-3 p-4 bg-slate-50 rounded-sm">
            <Link href={`/u/${comment.author.userName}`}>
                <Image src={comment.author.image as string} alt="" width={50} height={50} className="rounded-full"/>
            </Link>
            <div className="flex flex-col gap-2 w-full">
                <Link href={`/u/${comment.author.userName}`}>
                    <p className="font-bold hover:underline">{comment.author.name}</p>
                </Link>
                <p>{comment.content}</p>
                <div className="flex flex-row gap-2 italic text-sm justify-end">
                    <p>Commented at:</p>
                    <p>{comment.createdAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                    <p>{comment.createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
        </div>
    )
}
