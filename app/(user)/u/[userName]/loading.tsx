import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex gap-5 w-full">
            <Skeleton className="rounded-full w-[150px] h-[150px]" />
            <div className="flex gap-3 flex-col">
                <Skeleton className="w-40 h-8" />
                <Skeleton className="w-20 h-5" />
                <Skeleton className="w-40 h-20" />
            </div>
        </div>
    )
}
