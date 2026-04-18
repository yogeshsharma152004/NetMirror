const MovieCardSkeleton = () => {
  return (
    <div className="w-56 rounded-xl overflow-hidden flex-shrink-0 animate-pulse">
      <div className="w-full h-72 bg-zinc-800 rounded-xl"></div>
    </div>
  );
};

export default MovieCardSkeleton;
