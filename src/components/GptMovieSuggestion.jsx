import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames) return null;

  return (
    <div
      className="mx-8 mt-8 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(168,85,247,0.04)",
        border: "1px solid rgba(168,85,247,0.12)",
      }}
    >
      {movieNames.map((movieName, idx) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={movieResults[idx]}
        />
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
