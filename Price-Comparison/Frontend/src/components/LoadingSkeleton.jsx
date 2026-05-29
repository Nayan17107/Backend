const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
        <div className="shimmer aspect-square rounded-xl bg-white/5" />
        <div className="space-y-3 pt-4">
          <div className="shimmer h-4 w-5/6 rounded bg-white/5" />
          <div className="shimmer h-4 w-3/5 rounded bg-white/5" />
          <div className="shimmer h-8 w-1/2 rounded bg-white/5" />
          <div className="grid grid-cols-[1fr_48px] gap-2">
            <div className="shimmer h-12 rounded-xl bg-white/5" />
            <div className="shimmer h-12 rounded-xl bg-white/5" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
