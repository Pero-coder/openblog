import Image from "next/image";
import Link from "next/link";
import LikeButton from "../Buttons/LikeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { useSession } from "next-auth/react";
import type { PostsType } from "../ServerActions/getPosts";

export default function PostThumbnail({ post }: { post: PostsType[0] }) {
    const user = post.author;
    const { data: session } = useSession();

    return (
        <div className="flex flex-col gap-5 max-w-2xl">
            <div className="flex gap-3 p-3 rounded-md transition-colors duration-200 ease-in-out hover:bg-slate-50">
                <div className="w-12 h-12 flex-shrink-0">
                    <Link href={`/u/${user?.userName}`}>
                        <Image
                            src={user?.image as string}
                            alt=""
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                        />
                    </Link>
                </div>
                <div className="flex flex-col gap-3 flex-grow">
                    <div className="flex items-center justify-between">
                        <Link
                            href={`/u/${user?.userName}`}
                            className="hover:underline"
                        >
                            <p className="font-bold">{user?.name}</p>
                            <p className="text-gray-500 italic">@{user?.userName}</p>
                        </Link>
                    </div>
                    <Link href={`/p/${post.id}`} key={post.id}>
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                        <div>
                            <Image
                                alt=""
                                width={683}
                                height={384}
                                src={post.imageUrl}
                                className="rounded-md bg-white border border-gray-400 w-full h-full max-h-96 object-contain"
                            />
                        </div>
                    </Link>
                    <div className="flex flex-row gap-2 italic justify-end">
                        <p className="text-sm">{`${post.createdAt.toLocaleTimeString(
                            undefined,
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            }
                        )} ${post.createdAt.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}`}</p>
                    </div>
                    <div className="flex flex-row gap-5">
                        <LikeButton
                            initialLikes={post.likes.length}
                            initialLikeState={
                                session
                                    ? post.likes.includes(
                                          session?.user.id as string
                                      )
                                    : false
                            }
                            postId={post.id}
                        />
                        <div>
                            <FontAwesomeIcon
                                icon={faComment}
                                size="lg"
                                color="#111111"
                            />{" "}
                            <span className="mx-2">{post._count.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-400 my-5 max-w-2xl"></div>
        </div>
    );
}
