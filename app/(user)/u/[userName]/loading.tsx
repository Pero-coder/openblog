import PostThumbnailSkeleton from "@/components/Skeletons/PostThumbnailSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-10 w-full">
            <div className="flex gap-5">
                <Skeleton className="rounded-full w-[150px] h-[150px]" />
                <div className="flex gap-3 flex-col">
                    <Skeleton className="w-40 h-8" />
                    <Skeleton className="w-20 h-5" />
                    <Skeleton className="w-40 h-20" />
                </div>
            </div>
            <div className="border-t border-gray-400"></div>
            <PostThumbnailSkeleton />
        </div>
    )
}
