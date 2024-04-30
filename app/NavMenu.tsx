import Link from "next/link"

import { SignOut } from "@/components/sign-out"
import ProfileButton from "@/components/ProfileButton"

export default function NavMenu() {
  return (
    <nav className="flex items-center justify-between p-6 bg-neutral-100">
      <Link href={"/"} className="text-3xl text-blue-500 font-bold">OpenBlog</Link>
      <span className="flex flex-row gap-5 items-center">
        <SignOut/>
        <ProfileButton/>
      </span>
    </nav>
  )
}