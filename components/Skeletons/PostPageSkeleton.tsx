import { Skeleton } from "../ui/skeleton";

export default function PostPageSkeleton() {
    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-row gap-5 items-center">
                <Skeleton className="rounded-full w-[50px] h-[50px]"/>
                <div className="flex flex-col gap-3">
                    <Skeleton className="w-[150px] h-[20px]"/>
                    <Skeleton className="w-[100px] h-[20px]"/>
                </div>
            </div>
            <Skeleton className="w-[300px] h-[40px]"/>
            <Skeleton className="w-full h-96"/>
            <Skeleton className="max-w-[500px] w-full h-[25px]"/>
            <Skeleton className="max-w-[520px] w-full h-[25px]"/>
            <Skeleton className="max-w-[580px] w-full h-[25px]"/>
            <Skeleton className="max-w-[500px] w-full h-[25px]"/>
        </div>
    );
}