const HeroSkeleton = () => {
  return (
    <div className="w-full h-screen bg-zinc-900 animate-pulse relative">
      <div className="absolute bottom-48 left-20">
        <div className="w-80 h-10 bg-zinc-800 rounded mb-4"></div>
        <div className="w-96 h-4 bg-zinc-800 rounded mb-2"></div>
        <div className="w-72 h-4 bg-zinc-800 rounded mb-8"></div>
        <div className="flex gap-4">
          <div className="w-32 h-12 bg-zinc-800 rounded-lg"></div>
          <div className="w-32 h-12 bg-zinc-800 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
