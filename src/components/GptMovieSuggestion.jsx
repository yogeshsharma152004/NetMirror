import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constansts";

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  const navigate = useNavigate();

  if (!movieNames || !movieResults) return null;

  const allMovies = movieResults
    .flat()
    .filter(Boolean)
    .filter((m, i, arr) => arr.findIndex((x) => x.id === m.id) === i)
    .slice(0, 20);

  if (allMovies.length === 0)
    return (
      <div
        className="mx-4 md:mx-8 mt-8 text-center py-16"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        <p className="text-lg font-bold mb-2">No results found</p>
        <p className="text-sm">Try a different query</p>
      </div>
    );

  return (
    <div className="mx-4 md:mx-8 mt-6 mb-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="px-3 py-1 rounded-lg text-xs font-black tracking-widest"
          style={{
            background: "rgba(251,191,36,0.1)",
            border: "1px solid rgba(251,191,36,0.3)",
            color: "#fbbf24",
          }}
        >
          ✦ AI RESULTS
        </div>
        <p
          className="text-sm font-bold"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {allMovies.length} recommendations
        </p>
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(to right,rgba(168,85,247,0.25),transparent)",
          }}
        />
      </div>

      {/* ✅ Mobile: grid (watchlist jaisa) | Desktop: horizontal scroll */}

      {/* Mobile grid — md se neeche */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:hidden">
        {allMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate("/movie/" + movie.id)}
            className="cursor-pointer group"
          >
            <div
              className="rounded-xl overflow-hidden relative"
              style={{
                aspectRatio: "2/3",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <img
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={IMG_CDN_URL + movie.poster_path}
                alt={movie.title}
              />
              {movie.vote_average > 0 && (
                <div
                  className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-xs font-bold"
                  style={{
                    background: "rgba(7,5,15,0.8)",
                    border: "1px solid rgba(251,191,36,0.3)",
                    color: "#fbbf24",
                  }}
                >
                  ★ {movie.vote_average.toFixed(1)}
                </div>
              )}
              {movie.release_date && (
                <div
                  className="absolute top-2 right-2 px-1.5 py-0.5 rounded"
                  style={{
                    background: "rgba(7,5,15,0.8)",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "10px",
                  }}
                >
                  {movie.release_date.split("-")[0]}
                </div>
              )}
            </div>
            {movie.title && (
              <p className="mt-1.5 text-xs font-semibold truncate text-center text-zinc-300 hover:text-purple-400 transition duration-300">
                {movie.title}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Desktop horizontal scroll — md se upar */}
      <div className="hidden md:flex overflow-x-scroll no-scrollbar py-5 px-2">
        <div className="flex gap-3 pb-2">
          {allMovies.map((movie) => (
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

export default GptMovieSuggestion;
