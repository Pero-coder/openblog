import Image from 'next/image';
import Link from 'next/link';

export default function PostThumbnail({ post } : { post: { id: string, title: string, imageUrl: string, authorId: string } }) {
  return (
    <Link href={`${post.authorId}/${post.id}`} key={post.id} className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">{post.title}</h1>
      <Image alt="" src={post.imageUrl} width={16*35} height={9*35} className="rounded-md object-contain w-full h-96"/>
    </Link>
  );
}