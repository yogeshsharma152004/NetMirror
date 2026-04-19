import React from "react";
import { useNavigate } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constansts";

export const MovieCard = ({ posterPath, movieId, movieTitle, rating }) => {
  const navigate = useNavigate();
  if (!posterPath) return null;

  return (
    <div
      onClick={() => navigate("/movie/" + movieId)}
      className="flex-shrink-0 cursor-pointer"
      style={{ width: "clamp(130px, 18vw, 200px)" }}
    >
      <div
        className="card-hover rounded-xl overflow-hidden relative"
        style={{
          width: "clamp(130px, 18vw, 200px)",
          height: "clamp(195px, 27vw, 300px)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <img
          className="w-full h-full object-cover"
          src={IMG_CDN_URL + posterPath}
          alt={movieTitle || "movie"}
        />
        {rating && (
          <div
            className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-xs font-bold"
            style={{
              background: "rgba(7,5,15,0.8)",
              border: "1px solid rgba(251,191,36,0.3)",
              color: "#fbbf24",
            }}
          >
            ★ {rating.toFixed(1)}
          </div>
        )}
      </div>
      {movieTitle && (
        <p
          className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold truncate text-center text-zinc-300 hover:text-purple-400 transition duration-300"
          style={{ maxWidth: "clamp(130px, 18vw, 160px)" }}
        >
          {movieTitle}
        </p>
      )}
    </div>
  );
};

export default MovieCard;
