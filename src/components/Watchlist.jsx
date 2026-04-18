import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useWatchlist from "../hooks/useWatchlist";
import MovieCard from "./MovieCard";

const Watchlist = () => {
  const { loadWatchlist } = useWatchlist();
  const watchlist = useSelector((store) => store.watchlist.movies);
  const navigate = useNavigate();

  useEffect(() => {
    loadWatchlist();
  }, []);

  return (
    <div
      className="min-h-screen text-white relative px-10 pt-10"
      style={{ background: "#07050f" }}
    >
      {/* Orbs */}
      <div
        className="orb"
        style={{
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle,rgba(120,60,255,0.15),transparent 70%)",
          top: "-100px",
          left: "-100px",
        }}
      />
      <div
        className="orb"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle,rgba(255,200,50,0.08),transparent 70%)",
          top: "200px",
          right: "-80px",
        }}
      />

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.7)",
        }}
      >
        ← Back
      </button>

      {/* Title */}
      <div className="flex items-center gap-4 mb-10 relative">
        <div
          className="absolute top-0 left-0 right-0 -top-2 h-px"
          style={{
            background:
              "linear-gradient(to right,rgba(168,85,247,0.4),transparent)",
          }}
        />
        <div
          className="px-3 py-1 rounded-lg text-xs font-black tracking-widest"
          style={{
            background: "rgba(251,191,36,0.1)",
            border: "1px solid rgba(251,191,36,0.3)",
            color: "#fbbf24",
          }}
        >
          ✦ MY LIST
        </div>
        <h1
          className="text-4xl font-black"
          style={{
            background: "linear-gradient(135deg,#fff 40%,#c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Watchlist
        </h1>
        <span
          className="text-sm font-semibold px-3 py-1 rounded-lg"
          style={{
            background: "rgba(168,85,247,0.1)",
            border: "1px solid rgba(168,85,247,0.2)",
            color: "#c084fc",
          }}
        >
          {watchlist.length} movies
        </span>
      </div>

      {/* Empty State */}
      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 gap-6">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-2"
            style={{
              background: "rgba(168,85,247,0.08)",
              border: "1px solid rgba(168,85,247,0.15)",
            }}
          >
            🎬
          </div>
          <p
            className="text-xl font-bold"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            No movies saved yet
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            Add movies to your watchlist and they'll appear here
          </p>
          <button
            onClick={() => navigate("/browse")}
            className="mt-2 px-8 py-3 rounded-xl font-black text-sm text-white cursor-pointer"
            style={{ background: "linear-gradient(135deg,#7c3aed,#9f67ff)" }}
          >
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 pb-16">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              movieId={movie.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
