import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-3 w-full">
            <h1 className="text-xl">Edit profile</h1>
            <div className="flex flex-col gap-5">
                <p>Image:</p>
                <Skeleton className="w-[250px] h-[250px] rounded-full"/>
            </div>
            <div className="flex flex-col gap-5">
                <p>Name:</p>
                <Skeleton className="w-full h-14"/>
            </div>
            <div className="flex flex-col gap-5">
                <p>Bio:</p>
                <Skeleton className="w-full h-64"/>
            </div>
        </div>
    )
}
