import Link from "next/link"
import { auth } from "@/auth"

import { SignOut } from "@/components/SignButtons/sign-out"
import ProfileButton from "@/components/Buttons/ProfileButton"
import { SignIn } from "@/components/SignButtons/sign-in"

export default async function NavMenu() {
  const session = await auth()

  return (
    <nav className="flex items-center justify-between p-3 bg-neutral-100 w-full fixed top-0 left-0 z-10">
      <Link href={"/"} className="text-3xl text-blue-500 font-bold">OpenBlog</Link>
      <span className="flex flex-row gap-5 items-center">
        { !session ? <SignIn/> : <><ProfileButton/> <SignOut/></>}
      </span>
    </nav>
  )
}