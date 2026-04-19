import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useWatchlist from "../hooks/useWatchlist";
import { IMG_CDN_URL } from "../utils/constansts";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

const Watchlist = () => {
  const { loadWatchlist, removeMovie } = useWatchlist();
  const watchlist = useSelector((store) => store.watchlist.movies);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Firebase auth ready hone ka wait karo
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);
        await loadWatchlist();
        setLoading(false);
      } else {
        // User nahi hai toh login pe bhejo
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#07050f" }}
      >
        <div
          className="w-12 h-12 rounded-full animate-spin"
          style={{
            border: "3px solid rgba(168,85,247,0.2)",
            borderTop: "3px solid #a855f7",
          }}
        />
      </div>
    );

  return (
    <div
      className="min-h-screen text-white relative px-4 md:px-10 pt-8 md:pt-10"
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

      <div className="flex items-center gap-5 mb-8">
        <button
          onClick={() => navigate(-1)}
          className=" px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          ← Back
        </button>
        <h1
          className="text-2xl md:text-4xl font-black"
          style={{
            background: "linear-gradient(135deg,#fff 40%,#c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Watchlist
        </h1>
      </div>

      {/* Title */}
      <div className="flex items-center gap-4 mb-10 relative">
        <div
          className="absolute -top-2 left-0 right-0 h-px"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-16">
          {watchlist.map((movie) => (
            <div key={movie.id} className="relative group">
              <div
                onClick={() => navigate("/movie/" + movie.id)}
                className="cursor-pointer"
              >
                <div
                  className="card-hover rounded-xl overflow-hidden relative"
                  style={{
                    width: "100%",
                    aspectRatio: "2/3",
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
                    className="absolute bottom-0 left-0 right-0 h-16"
                    style={{
                      background:
                        "linear-gradient(to top,rgba(7,5,15,0.9),transparent)",
                    }}
                  />
                  {movie.vote_average && (
                    <div
                      className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold"
                      style={{
                        background: "rgba(7,5,15,0.8)",
                        border: "1px solid rgba(251,191,36,0.3)",
                        color: "#fbbf24",
                      }}
                    >
                      ★ {movie.vote_average.toFixed(1)}
                    </div>
                  )}
                  {/* Remove button */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMovie(movie.id);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200"
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
                    className="mt-2 text-xs font-semibold truncate"
                    style={{ color: "rgba(255,255,255,0.7)" }}
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
