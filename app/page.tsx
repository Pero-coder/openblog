import NewPostButton from "@/components/NewPostButton";
import getPosts from "@/components/ServerActions/getPosts";
import PostsList from "@/components/PostsList";

const INITIAL_NUMBER_OF_POSTS = 3

export default async function Home() {
  const initialPosts = await getPosts(0, INITIAL_NUMBER_OF_POSTS);

  return (
    <>
      <PostsList initialPosts={initialPosts}/>
      <p>There are no more posts... 😢</p>
      <div className="fixed bottom-0 right-0 mb-10 mr-10"><NewPostButton/></div>
    </>
  );
}
