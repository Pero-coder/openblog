import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import PostsList from "@/components/PostComponents/PostsList";
import Image from "next/image";
import FollowButton from "@/components/Buttons/FollowButton";
import Link from "next/link";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function UserProfile({
    params,
}: {
    params: { userName: string };
}) {
    const session = await auth();

    const user = await prisma.user.findUnique({
        where: {
            userName: params.userName,
        },
    });

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-5 items-center">
                    <div className="flex gap-3 flex-shrink-0">
                        <Image
                            src={user?.image as string}
                            alt=""
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <p className="text-3xl">{user?.name}</p>
                    </div>
                    {session?.user.id === user.id ? (
                        <div className="w-full flex justify-end">
                            <Link href={`/u/${params.userName}/edit`}>
                                <FontAwesomeIcon icon={faPenToSquare} /> Edit
                                profile
                            </Link>
                        </div>
                    ) : (
                        <FollowButton userId={user?.id as string} />
                    )}
                </div>
                <p>{user?.bio}</p>
            </div>
            <div className="border-t border-gray-400"></div>
            <div className="flex flex-col gap-5">
                <PostsList authorIds={[user.id]} />
            </div>
        </div>
    );
}
