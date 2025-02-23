import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonPostCard() {
  return (
    <div className="bg-custom-1 border-b border-custom-11 p-4">
      <div className="flex gap-3">
        <Skeleton className="w-10 h-10 rounded-full bg-custom-4 flex-shrink-0" />

        <div className="w-full">
          <div className="flex items-center gap-2">
            <Skeleton className="w-24 h-4 bg-custom-4 rounded-lg" />
            <Skeleton className="w-16 h-4 bg-custom-4 rounded-lg" />
          </div>

          <div className="mt-2 space-y-2">
            <Skeleton className="w-full h-6 bg-custom-4 rounded-lg" />
            <Skeleton className="w-5/6 h-4 bg-custom-4 rounded-lg" />
            <Skeleton className="w-4/5 h-4 bg-custom-4 rounded-lg" />
          </div>

          <Skeleton className="w-32 h-3 bg-custom-4 rounded-lg mt-3" />
        </div>
      </div>
    </div>
  );
}
