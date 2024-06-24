import { Modal } from "@/app/@modal/modal";
import UserProfile from "@/app/(user)/u/[userName]/page";

export default function PostModal({ params }: { params: { userName: string } }) {
    return (
        <Modal>
          <UserProfile params={params} />
        </Modal>
      );
  }
  
