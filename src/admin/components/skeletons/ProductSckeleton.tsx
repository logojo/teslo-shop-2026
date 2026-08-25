import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center px-10 flex-wrap gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>

        <div className="flex justify-end gap-4">
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">

            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <Skeleton className="h-7 w-64 mb-6" />

              <div className="space-y-6">

                {/* Title */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>

                {/* Price / Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </div>

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </div>
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <Skeleton className="h-7 w-52 mb-6" />

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-7 w-14 rounded-full"
                    />
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2 items-center">
                    <Skeleton className="h-4 w-28 mr-2" />

                    {Array.from({ length: 6 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-7 w-12 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <Skeleton className="h-7 w-32 mb-6" />

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-7 w-24 rounded-full"
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <Skeleton className="h-10 flex-1 rounded-lg" />
                  <Skeleton className="h-10 w-10 rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Product Images */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <Skeleton className="h-7 w-56 mb-6" />

              {/* Upload zone */}
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-6">
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />

                  <div className="flex flex-col items-center gap-2">
                    <Skeleton className="h-5 w-56" />
                    <Skeleton className="h-4 w-32" />
                  </div>

                  <Skeleton className="h-3 w-48" />
                </div>
              </div>

              {/* Current images */}
              <div className="mt-6 space-y-3">
                <Skeleton className="h-4 w-36" />

                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="aspect-square w-full rounded-lg" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Status */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <Skeleton className="h-7 w-48 mb-6" />

              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
