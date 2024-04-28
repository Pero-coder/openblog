import Link from "next/link"

export default function NewPostButton() {
    return (
        <Link href={"/new-post"} className="flex justify-center text-center w-14 h-14 bg-blue-500 hover:bg-blue-400 text-white rounded-full text-5xl">+</Link>
    )
}