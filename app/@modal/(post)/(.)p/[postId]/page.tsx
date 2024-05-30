import { Modal } from "@/app/@modal/modal";
import PostPage from "@/app/(post)/p/[postId]/page";

export default function PostModal({ params }: { params: { postId: string } }) {
  return (
      <Modal>
        <PostPage params={params} />
      </Modal>
    );
}
