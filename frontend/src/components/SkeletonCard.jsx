import React from 'react';

function Shimmer({ className }) {
  return (
    <div
      className={`bg-white/[0.05] rounded-xl animate-pulse ${className}`}
    />
  );
}

function SkeletonCard({ index }) {
  return (
    <div
      className="glass-card p-8 sm:p-10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Badge + Title */}
      <div className="mb-8 space-y-4">
        <Shimmer className="h-5 w-24 rounded-full" />
        <Shimmer className="h-8 w-3/4" />
        <Shimmer className="h-8 w-1/2" />
      </div>

      {/* Problem statement */}
      <div className="mb-8 space-y-2">
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-2/3" />
      </div>

      {/* Tech stack */}
      <div className="mb-8">
        <Shimmer className="h-3 w-28 mb-4" />
        <div className="flex flex-wrap gap-2.5">
          {[80, 96, 64, 112, 72].map((w, i) => (
            <Shimmer key={i} className="h-7 rounded-xl" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>

      {/* Score bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <Shimmer className="h-9 w-9 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <Shimmer className="h-3 w-28" />
              <Shimmer className="h-2 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Expand button */}
      <Shimmer className="h-12 w-full rounded-2xl" />
    </div>
  );
}

export default function SkeletonLoader() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header skeleton */}
      <div className="text-center mb-12 space-y-4">
        <Shimmer className="h-12 w-96 mx-auto rounded-2xl" />
        <Shimmer className="h-5 w-80 mx-auto rounded-xl" />
      </div>

      {/* Input summary skeleton */}
      <div className="glass-card p-6 mb-12 flex flex-wrap items-center gap-4 justify-center">
        {[140, 100, 120, 110].map((w, i) => (
          <Shimmer key={i} className="h-10 rounded-2xl" style={{ width: `${w}px` }} />
        ))}
      </div>

      {/* 3 skeleton cards */}
      <div className="grid gap-8 mb-16">
        {[0, 1, 2].map((i) => (
          <SkeletonCard key={i} index={i} />
        ))}
      </div>
    </div>
  );
}
