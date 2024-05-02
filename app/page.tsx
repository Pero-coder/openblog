import { prisma } from "@/lib/prisma";

import NewPostButton from "@/components/NewPostButton";
import PostThumbnail from "@/components/PostThumbnail";

export default async function Home() {
  const posts = await prisma.post.findMany()

  return (
    <>
      <div className="flex flex-col gap-5">
      {posts.map(post => <PostThumbnail post={post} key={post.id}/>)}
      </div>
      <div className="fixed bottom-0 right-0 mb-10 mr-10"><NewPostButton/></div>
    </>
  );
}
