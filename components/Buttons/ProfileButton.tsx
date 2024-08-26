import { auth } from "@/auth"
import { Session } from "next-auth"
import Image from "next/image"
import Link from "next/link"

export default async function ProfileButton() {
    const session = await auth() as Session

    return (
        <Link href={`/u/${session.user?.userName}`}>
            <Image src={session.user?.image as string} alt="" width={70} height={70} className="rounded-full w-[50px] h-[50px] object-cover" />
        </Link>
    )
}