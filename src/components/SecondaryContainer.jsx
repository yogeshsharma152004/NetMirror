
import MovieList from "./MovieList";
import MovieListSkeleton from "./MovieListSkeleton";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div
      className="relative z-10 pb-16"
      style={{
        background: "linear-gradient(to bottom,transparent,#07050f 120px)",
        marginTop: "-80px",
      }}
    >
      {movies.trendingMovies ? (
        <MovieList title="Trending in India" movies={movies.trendingMovies} />
      ) : (
        <MovieListSkeleton />
      )}

      {movies.nowPlayingMovies ? (
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
      ) : (
        <MovieListSkeleton />
      )}

      {movies.popularMovies ? (
        <MovieList title="Popular" movies={movies.popularMovies} />
      ) : (
        <MovieListSkeleton />
      )}

      {movies.horrorMovies ? (
        <MovieList title="Horror" movies={movies.horrorMovies} />
      ) : (
        <MovieListSkeleton />
      )}

      {movies.upcomingMovies ? (
        <MovieList title="Upcoming" movies={movies.upcomingMovies} />
      ) : (
        <MovieListSkeleton />
      )}
    </div>
  );
};

export default SecondaryContainer;