// import Image from 'next/image';
import Link from 'next/link';

export default function PostThumbnail({ post } : { post: { id: string, title: string, imageUrl: string, authorId: string } }) {
  return (
    <Link href={`${post.authorId}/${post.id}`} key={post.id} className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">{post.title}</h1>
      <img alt="" src={post.imageUrl} className="rounded-md object-contain w-full h-96"/>
    </Link>
  );
}