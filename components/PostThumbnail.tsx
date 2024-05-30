import { prisma } from '@/lib/prisma';

import Image from 'next/image';
import Link from 'next/link';

export default async function PostThumbnail({ post } : { post: { id: string, title: string, imageUrl: string, authorId: string, createdAt: Date } }) {
  const user = await prisma.user.findUnique({
    where: {
      id: post.authorId
    }
  });

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex gap-3 p-3 rounded-md transition-colors duration-500 ease-in-out hover:bg-slate-50'>
        <div className="w-12 h-12 flex-shrink-0">
          <Link href={`/u/${user?.userName}`}>
            <Image src={user?.image as string} alt="" width={48} height={48} className="rounded-full"/>
          </Link>
        </div>
        <div className="flex flex-col gap-3 flex-grow">
          <div className='flex items-center justify-between'>
            <Link href={`/u/${user?.userName}`} className='font-bold hover:underline'>{user?.name}</Link>
            <p className='text-sm'>{`${post.createdAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })} ${post.createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`}</p>
          </div>
          <Link href={`/p/${post.id}`} key={post.id}>
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <img alt="" src={post.imageUrl} className="rounded-md bg-white object-contain border border-gray-400 w-full h-full max-h-96 object-cover"/>
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-400 my-5"></div>
    </div>
  );
}