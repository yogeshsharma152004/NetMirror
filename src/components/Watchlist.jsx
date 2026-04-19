import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useWatchlist from "../hooks/useWatchlist";
import { IMG_CDN_URL } from "../utils/constansts";

const Watchlist = () => {
  const { loadWatchlist, removeMovie } = useWatchlist();
  const watchlist = useSelector((store) => store.watchlist.movies);
  const navigate = useNavigate();

  useEffect(() => {
    loadWatchlist();
  }, []);

  return (
    <div
      className="min-h-screen text-white relative px-4 sm:px-10 pt-5 sm:pt-10 "
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

      {/* Header Row */}
      <div className="flex gap-4 sm:gap-10 items-center mb-6 sm:mb-10 pt-4 sm:pt-0">
        <button
          onClick={() => navigate(-1)}
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer flex-shrink-0"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          ← Back
        </button>

        <h1
          className="text-2xl sm:text-4xl font-black"
          style={{
            background: "linear-gradient(135deg,#fff 40%,#c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Watchlist
        </h1>
      </div>

      {/* Sub-header */}
      <div className="flex items-center gap-3 sm:gap-5 mb-8 sm:mb-10 relative">
        <div
          className="absolute left-0 right-0 -top-3 sm:-top-4 h-px"
          style={{
            background:
              "linear-gradient(to right,rgba(168,85,247,0.4),transparent)",
          }}
        />
        <div
          className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-black tracking-widest"
          style={{
            background: "rgba(251,191,36,0.1)",
            border: "1px solid rgba(251,191,36,0.3)",
            color: "#fbbf24",
          }}
        >
          ✦ MY LIST
        </div>
        <span
          className="text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg"
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
        <div className="flex flex-col items-center justify-center mt-20 sm:mt-32 gap-4 sm:gap-6 text-center px-4">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-2"
            style={{
              background: "rgba(168,85,247,0.08)",
              border: "1px solid rgba(168,85,247,0.15)",
            }}
          >
            🎬
          </div>
          <p
            className="text-lg sm:text-xl font-bold"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            No movies saved yet
          </p>
          <p
            className="text-xs sm:text-sm"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Add movies to your watchlist and they'll appear here
          </p>
          <button
            onClick={() => navigate("/browse")}
            className="mt-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm text-white cursor-pointer"
            style={{ background: "linear-gradient(135deg,#7c3aed,#9f67ff)" }}
          >
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 sm:gap-6 pb-16 justify-start">
          {watchlist.map((movie) => (
            <div key={movie.id} className="relative group">
              <div
                onClick={() => navigate("/movie/" + movie.id)}
                className="flex-shrink-0 cursor-pointer"
                style={{ width: "clamp(130px, 20vw, 160px)" }}
              >
                <div
                  className="card-hover rounded-xl overflow-hidden relative"
                  style={{
                    width: "clamp(130px, 20vw, 200px)",
                    height: "clamp(195px, 30vw, 300px)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={IMG_CDN_URL + movie.poster_path}
                    alt={movie.title}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background:
                        "linear-gradient(to right,transparent,rgba(168,85,247,0.5),transparent)",
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-12 sm:h-16"
                    style={{
                      background:
                        "linear-gradient(to top,rgba(7,5,15,0.9),transparent)",
                    }}
                  />
                  {movie.vote_average && (
                    <div
                      className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-xs font-bold"
                      style={{
                        background: "rgba(7,5,15,0.8)",
                        border: "1px solid rgba(251,191,36,0.3)",
                        color: "#fbbf24",
                      }}
                    >
                      ★ {movie.vote_average.toFixed(1)}
                    </div>
                  )}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMovie(movie.id);
                    }}
                    className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200"
                    style={{
                      background: "rgba(239,68,68,0.9)",
                      border: "1px solid rgba(239,68,68,0.5)",
                    }}
                  >
                    <span className="text-white text-xs font-black">✕</span>
                  </div>
                </div>
                {movie.title && (
                  <p
                    className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold truncate text-center text-zinc-300 hover:text-purple-400 transition duration-300"
                    style={{ maxWidth: "clamp(130px, 20vw, 160px)" }}
                  >
                    {movie.title}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
