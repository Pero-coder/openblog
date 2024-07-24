import { Modal } from "@/app/@modal/modal";
import EditPostPage from "@/app/(post)/p/[postId]/edit/page";

export default function EditPostModal({ params }: { params: { postId: string } }) {
    return (
        <Modal>
            <EditPostPage params={params} />
        </Modal>
    );
}
