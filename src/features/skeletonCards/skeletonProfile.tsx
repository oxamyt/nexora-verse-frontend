import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonProfile() {
  return (
    <>
      <div className="h-48 bg-custom-4 relative">
        <div className="absolute -bottom-16 left-4">
          <Skeleton className="w-32 h-32 border-4 border-custom-9 rounded-full" />
        </div>
      </div>

      <div className="pt-20 px-4">
        <div className="flex justify-between items-center">
          <Skeleton className="w-40 h-6" />
          <Skeleton className="w-20 h-6" />
        </div>
      </div>
    </>
  );
}
