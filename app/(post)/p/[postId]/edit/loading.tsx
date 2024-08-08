import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-5 w-full">
            <h1 className="text-xl">Edit post</h1>
            <Skeleton className="w-full h-[50px]"/>
            <Skeleton className="w-full h-96"/>
            <Skeleton className="w-full h-64"/>
        </div>
    );
}
