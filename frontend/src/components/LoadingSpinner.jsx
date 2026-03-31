import React from 'react';
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
      {/* Spinning rings */}
      <div className="relative w-24 h-24 mb-10">
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-500 animate-spin" />
        <div
          className="absolute inset-2 rounded-full border-[3px] border-transparent border-t-purple-500 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}
        />
        <div
          className="absolute inset-4 rounded-full border-[3px] border-transparent border-t-indigo-400 animate-spin"
          style={{ animationDuration: '1.8s' }}
        />
        {/* Core glow */}
        <div className="absolute inset-0 rounded-full bg-indigo-500/5 animate-pulse-glow" />
        <div className="absolute inset-[35%] rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 rotate-45 animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
      </div>

      {/* Text */}
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-black text-white tracking-tight text-glow">
          Architecting Blueprint
        </h3>
        <p className="text-sm text-gray-500 font-bold uppercase tracking-[0.2em] max-w-xs mx-auto">
          AI is deep-analyzing your tech stack & domain...
        </p>
      </div>

      {/* Shimmer dots */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
