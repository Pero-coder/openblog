import { Modal } from "@/app/@modal/modal";
import PostPage from "@/app/(post)/p/[postId]/page";
import { Suspense } from "react";
import PostPageSkeleton from "@/components/Skeletons/PostPageSkeleton";

export default function PostModal({ params }: { params: { postId: string } }) {
  return (
      <Modal>
        <Suspense fallback={<PostPageSkeleton/>}>
          <PostPage params={params} />
        </Suspense>
      </Modal>
    );
}
