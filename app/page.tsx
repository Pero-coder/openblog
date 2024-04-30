import NewPostButton from "@/components/NewPostButton";

import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.post.findMany()

  return (
    <>
      <div className="flex flex-col gap-5">
      {posts.map(post => (
          <Link href={`${post.authorId}/${post.id}`} key={post.id} className="flex flex-col gap-5">
              <h1 className="text-xl font-bold">{post.title}</h1>
              <Image alt="" src={post.imageUrl} width={16*20} height={9*20} className="rounded-md"/>
          </Link>
      ))}
      </div>
      <div className="fixed bottom-0 right-0 mb-10 mr-10"><NewPostButton/></div>
    </>
  );
}
