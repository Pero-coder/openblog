import Link from "next/link"
import { auth } from "@/auth"

import { SignOut } from "@/components/sign-out"
import ProfileButton from "@/components/ProfileButton"
import { SignIn } from "@/components/sign-in"

export default async function NavMenu() {
  const session = await auth()

  return (
    <nav className="flex items-center justify-between p-6 bg-neutral-100">
      <Link href={"/"} className="text-3xl text-blue-500 font-bold">OpenBlog</Link>
      <span className="flex flex-row gap-5 items-center">
        { !session ? <SignIn/> : <><ProfileButton/> <SignOut/></>}
      </span>
    </nav>
  )
}