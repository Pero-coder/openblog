import NewPostButton from "@/components/NewPostButton";

export default async function Home() {
  return (
    <>
      <div>
        <p>There are no posts yet...</p>
      </div>
      <div className="fixed bottom-0 right-0 mb-10 mr-10"><NewPostButton/></div>
    </>
  );
}
