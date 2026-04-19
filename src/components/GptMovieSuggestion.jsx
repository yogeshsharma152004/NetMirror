import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div
      className="relative z-10 mt-6 mx-4 md:mx-8 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(168,85,247,0.04)",
        border: "1px solid rgba(168,85,247,0.12)",
      }}
    >
      {/* Header */}
      <div className="px-6 pt-5 pb-2 flex items-center gap-3">
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
          {movieNames.length} recommendations
        </p>
      </div>

      {/* ✅ Section title hatao — sirf cards dikhao */}
      {movieNames.map((movieName, idx) => (
        <div key={movieName} className="px-4 md:px-6 py-3">
          <div
            className="overflow-x-scroll no-scrollbar"
            style={{
              paddingBottom: "8px",
              paddingTop: "8px",
              overflowY: "visible",
            }}
          >
            <div
              className="flex gap-3"
              style={{ paddingLeft: "2px", paddingRight: "16px" }}
            >
              {movieResults[idx]?.slice(0, 8).map((movie) => (
                <MovieCard
                  key={movie.id}
                  posterPath={movie.poster_path}
                  movieId={movie.id}
                  movieTitle={movie.title}
                  rating={movie.vote_average}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
