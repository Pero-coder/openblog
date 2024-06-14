import NewPostButton from "@/components/NewPostButton";
import Posts from "@/components/Posts";

export default async function Home() {
  return (
    <>
      <Posts />
      <div className="fixed bottom-0 right-0 mb-10 mr-10"><NewPostButton/></div>
    </>
  );
}
