import { Skeleton } from "../ui/skeleton";

export default function PostThumbnailSkeleton() {
    return (
        <div className="flex gap-3 w-full">
            <Skeleton className="rounded-full w-12 h-12 flex-shrink-0" />
            <div className="flex flex-col gap-3 w-full">
                <Skeleton className="w-[150px] h-4" />
                <Skeleton className="w-[100px] h-4" />
                <Skeleton className="w-[300px] h-6" />
                <Skeleton className="w-full h-96" />
            </div>
        </div>    
    )
}
