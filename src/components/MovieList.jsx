import React from "react";
import MovieCard from "./MovieCard";
import { FaArrowRight } from "react-icons/fa6";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-4 sm:px-8 py-4 sm:py-5">
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <h2 className="text-xs sm:text-sm font-black tracking-wider text-white whitespace-nowrap">
          {title}
        </h2>
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(to right,rgba(168,85,247,0.25),transparent)",
          }}
        />
        <span
          className="flex items-center gap-1 sm:gap-2 text-sm sm:text-lg font-semibold cursor-pointer whitespace-nowrap"
          style={{ color: "#a855f7" }}
        >
          See all <FaArrowRight />
        </span>
      </div>

      <div className="flex overflow-x-scroll no-scrollbar py-3 sm:py-5 px-1 sm:px-2">
        <div className="flex gap-2 sm:gap-3 pb-2">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              movieId={movie.id}
              movieTitle={movie.title}
              rating={movie.vote_average}
              releaseDate={movie.release_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
