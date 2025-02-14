import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonProfile() {
  return (
    <>
      <div className="h-48 bg-custom-3 relative">
        <div className="absolute -bottom-16 left-4">
          <Skeleton className="w-32 h-32 border-4 border-custom-4 rounded-full" />
        </div>
      </div>

      <div className="pt-20 px-4">
        <div className="flex justify-between items-center">
          <Skeleton className="w-32 h-12 bg-custom-4 rounded-lg" />
          <Skeleton className="w-36 h-12 bg-custom-4 rounded-lg" />
        </div>
        <div className="flex mt-5 gap-5 items-center ">
          <Skeleton className="w-16 h-6 bg-custom-4 rounded-lg" />
          <Skeleton className="w-16 h-6 bg-custom-4 rounded-lg" />
          <Skeleton className="w-16 h-6 bg-custom-4 rounded-lg" />
        </div>
      </div>
    </>
  );
}
