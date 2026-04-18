import React from "react";
import { useNavigate } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constansts";

const MovieCard = ({ posterPath, movieId, movieTitle, rating }) => {
  const navigate = useNavigate();
  if (!posterPath) return null;

  return (
    <div
      onClick={() => navigate("/movie/" + movieId)}
      className="flex-shrink-0 cursor-pointer"
      style={{ width: "200px" }}
    >
      <div
        className="card-hover rounded-xl overflow-hidden relative"
        style={{
          width: "200px",
          height: "300px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <img
          className="w-full h-full object-cover"
          src={IMG_CDN_URL + posterPath}
          alt={movieTitle || "movie"}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right,transparent,rgba(168,85,247,0.5),transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-12"
          style={{
            background: "linear-gradient(to top,rgba(7,5,15,0.8),transparent)",
          }}
        />

        {rating && (
          <div
            className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold"
            style={{
              background: "rgba(7,5,15,0.8)",
              border: "1px solid rgba(251,191,36,0.3)",
              color: "#fbbf24",
            }}
          >
            ★ {rating.toFixed(1)}
          </div>
        )}

        {movieTitle && (
          <p
            className="mt-2 text-xs font-semibold truncate"
            style={{ color: "rgba(255,255,255,0.7)", maxWidth: "160px" }}
          >
            {movieTitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
