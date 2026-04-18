
import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieListSkeleton = ({ title }) => {
  return (
    <div className="p-6">
      <div className="w-40 h-6 bg-zinc-800 rounded animate-pulse mb-4"></div>
      <div className="flex gap-6 py-4 px-3">
        {Array(6)
          .fill("")
          .map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
      </div>
    </div>
  );
};

export default MovieListSkeleton;
