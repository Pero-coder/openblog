import Link from "next/link"

import { SignOut } from "@/components/sign-out"

export default function NavMenu() {
  return (
    <nav className="flex items-center justify-between p-6 bg-neutral-100">
      <Link href={"/"} className="text-3xl text-blue-500 font-bold">OpenBlog</Link>
      <SignOut/>
    </nav>
  )
}