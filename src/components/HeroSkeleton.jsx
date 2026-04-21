const HeroSkeleton = () => {
  return (
    <div
      className="w-full h-[60vh] md:h-screen animate-pulse relative"
      style={{ background: "#0d0a1a" }}
    >
      <div className="absolute bottom-16 md:bottom-48 left-5 md:left-20">
        <div className="w-48 md:w-80 h-7 md:h-10 bg-zinc-800 rounded mb-3 md:mb-4"></div>
        <div className="w-64 md:w-96 h-3 md:h-4 bg-zinc-800 rounded mb-2"></div>
        <div className="w-48 md:w-72 h-3 md:h-4 bg-zinc-800 rounded mb-6 md:mb-8"></div>
        <div className="flex gap-3 md:gap-4">
          <div className="w-24 md:w-32 h-9 md:h-12 bg-zinc-800 rounded-lg"></div>
          <div className="w-24 md:w-32 h-9 md:h-12 bg-zinc-800 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
