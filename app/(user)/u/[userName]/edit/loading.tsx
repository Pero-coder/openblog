import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <h1 className="text-xl">Edit profile</h1>
            <div className="flex flex-col gap-5">
                <p>Image:</p>
                <Skeleton className="w-40 h-40 rounded-full"/>
            </div>
            <div className="flex flex-col gap-5">
                <p>Name:</p>
                <Skeleton className="w-40 h-6"/>
            </div>
            <div className="flex flex-col gap-5">
                <p>Bio:</p>
                <Skeleton className="w-40 h-6"/>
            </div>
        </div>
    )
}
