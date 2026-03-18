export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
      {/* Spinning rings */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500 animate-spin" />
        <div
          className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent-500 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        />
        <div
          className="absolute inset-4 rounded-full border-2 border-transparent border-t-primary-400 animate-spin"
          style={{ animationDuration: '2s' }}
        />
        <div className="absolute inset-0 rounded-full bg-primary-500/5 animate-pulse-glow" />
      </div>

      {/* Text */}
      <h3 className="text-xl font-semibold text-white mb-2">Generating your ideas...</h3>
      <p className="text-sm text-gray-500">Our AI is crafting personalized project recommendations</p>

      {/* Shimmer dots */}
      <div className="flex gap-1.5 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  );
}
