import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-8 py-5">
      <div className="flex items-center gap-3 mb-4 ">
        <h2 className="text-sm font-black tracking-wider text-white whitespace-nowrap">
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
          className="text-xs font-semibold cursor-pointer whitespace-nowrap"
          style={{ color: "#a855f7" }}
        >
          See all →
        </span>
      </div>

      <div className="flex overflow-x-scroll no-scrollbar py-5 px-2  ">
        <div className="flex gap-3 pb-2">
          {movies.map((movie) => (
           
          
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              movieId={movie.id}
              movieTitle={movie.title}
              rating={movie.vote_average}
            />
             
          ))
          }
         
          
        </div>
      </div>
    </div>
  );
};

export default MovieList;
