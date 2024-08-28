import { auth } from "@/auth";
import NewPostButton from "@/components/NewPostComponents/NewPostButton";
import Posts from "@/components/PostComponents/Posts";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Posts />
      <div className="fixed bottom-0 right-0 mb-10 mr-10"><NewPostButton session={session}/></div>
    </>
  );
}
