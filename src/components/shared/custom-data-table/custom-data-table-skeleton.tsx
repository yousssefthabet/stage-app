import { Skeleton } from "../../ui/skeleton";

function CustomDataTableSkeleton() {
  return (
    <div className="space-y-6">
      {/* Dashboard title skeleton */}
      <Skeleton className="bg-primary/60 h-8 w-48" />

      {/* Filter tabs skeleton */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="bg-primary/60 h-10 w-28 rounded-md" />
        <Skeleton className="bg-primary/60 h-10 w-36 rounded-md" />
        <Skeleton className="bg-primary/60 h-10 w-40 rounded-md" />
        <Skeleton className="bg-primary/60 h-10 w-32 rounded-md" />
        <Skeleton className="bg-primary/60 h-10 w-28 rounded-md" />
        <Skeleton className="bg-primary/60 h-10 w-28 rounded-md" />
        <Skeleton className="bg-primary/60 h-10 w-28 rounded-md" />
        <Skeleton className="bg-primary/60 h-10 w-32 rounded-md" />
      </div>

      {/* Task list section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {/* Section title skeleton */}
          <Skeleton className="bg-primary/60 h-7 w-36" />

          <div className="flex gap-2">
            {/* Search bar skeleton */}
            <Skeleton className="bg-primary/60 h-10 w-80 rounded-md" />
            {/* Filter buttons skeleton */}
            <Skeleton className="bg-primary/60 h-10 w-28 rounded-md" />
            <Skeleton className="bg-primary/60 h-10 w-36 rounded-md" />
          </div>
        </div>

        {/* Table skeleton */}
        <div className="overflow-hidden rounded-md border">
          {/* Table header */}
          <div className="grid grid-cols-9">
            {Array.from({ length: 9 }, (_, i) => (
              <Skeleton
                key={i}
                className="bg-primary/60 h-10 w-full rounded-none"
              />
            ))}
          </div>

          {/* Table rows */}
          {Array.from({ length: 3 }, (_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-9 border-b">
              {Array.from({ length: 8 }, (_, colIndex) => (
                <div key={colIndex} className="p-3">
                  <Skeleton className="bg-primary/40 h-5 w-full" />
                </div>
              ))}
              <div className="flex justify-center p-3">
                <Skeleton className="bg-primary/40 h-6 w-6 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomDataTableSkeleton;
