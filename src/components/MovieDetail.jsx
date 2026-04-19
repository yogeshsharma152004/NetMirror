import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useMovieDetails from "../hooks/useMovieDetails";
import useWatchlist from "../hooks/useWatchlist";
import { IMG_CDN_URL } from "../utils/constansts";
import MovieCard from "./MovieCard";

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { movie, cast, similar, loading } = useMovieDetails(movieId);
  const { addMovie, removeMovie, isInWatchlist, loadWatchlist } =
    useWatchlist();

  useEffect(() => {
    loadWatchlist();
    window.scrollTo(0, 0);
  }, [movieId]);

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

  if (!movie) return null;

  const {
    title,
    overview,
    backdrop_path,
    poster_path,
    release_date,
    runtime,
    vote_average,
    genres,
  } = movie;

  const handleWatchlist = () => {
    if (isInWatchlist(movie.id)) removeMovie(movie.id);
    else addMovie(movie);
  };

  return (
    <div
      className="min-h-screen text-white relative"
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

      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] sm:h-[55vh]">
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt={title}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top,#07050f 0%,rgba(7,5,15,0.4) 60%,transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right,rgba(7,5,15,0.8) 30%,transparent 70%)",
          }}
        />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
          }}
        >
          ← Back
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-10 -mt-28 sm:-mt-40">
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-start sm:items-end">
          {/* Poster */}
          <div className="hidden sm:block flex-shrink-0">
            <img
              className="w-32 sm:w-44 rounded-2xl object-cover"
              style={{
                border: "1px solid rgba(168,85,247,0.3)",
                boxShadow: "0 0 40px rgba(120,60,255,0.3)",
              }}
              src={IMG_CDN_URL + poster_path}
              alt={title}
            />
          </div>

          {/* Info */}
          <div className="flex-1 pb-4 w-full">
            <div
              className="inline-flex items-center gap-2 mb-2 sm:mb-3 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-black tracking-widest"
              style={{
                background: "rgba(251,191,36,0.1)",
                border: "1px solid rgba(251,191,36,0.3)",
                color: "#fbbf24",
              }}
            >
              ✦ MOVIE
            </div>

            <h1
              className="text-2xl sm:text-4xl lg:text-5xl font-black mb-2 sm:mb-3 leading-tight tracking-tight"
              style={{
                background: "linear-gradient(135deg,#fff 40%,#c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </h1>

            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
              <span
                className="font-bold text-xs sm:text-sm"
                style={{ color: "#fbbf24" }}
              >
                ★ {vote_average?.toFixed(1)}
              </span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
              <span
                className="text-xs sm:text-sm"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {release_date?.split("-")[0]}
              </span>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
              <span
                className="text-xs sm:text-sm"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {Math.floor(runtime / 60)}h {runtime % 60}m
              </span>
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-5 flex-wrap">
              {genres?.map((g) => (
                <span
                  key={g.id}
                  className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs font-bold tracking-wide"
                  style={{
                    background: "rgba(168,85,247,0.1)",
                    border: "1px solid rgba(168,85,247,0.2)",
                    color: "#c084fc",
                  }}
                >
                  {g.name}
                </span>
              ))}
            </div>

            <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-5">
              <button
                className="px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm text-white cursor-pointer"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#9f67ff)",
                }}
              >
                ▶ Play Now
              </button>
              <button
                onClick={handleWatchlist}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all"
                style={
                  isInWatchlist(movie?.id)
                    ? {
                        background: "rgba(168,85,247,0.2)",
                        border: "1px solid rgba(168,85,247,0.5)",
                        color: "#c084fc",
                      }
                    : {
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "#fff",
                      }
                }
              >
                {isInWatchlist(movie?.id) ? "✓ In Watchlist" : "+ Watchlist"}
              </button>
            </div>

            <p
              className="text-xs sm:text-sm leading-relaxed max-w-2xl"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {overview}
            </p>
          </div>
        </div>

        <div
          className="my-6 sm:my-10 h-px"
          style={{
            background:
              "linear-gradient(to right,rgba(168,85,247,0.3),transparent)",
          }}
        />

        {/* Cast */}
        {cast.length > 0 && (
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <h2 className="text-sm sm:text-base font-black tracking-wider">
                Cast
              </h2>
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(to right,rgba(168,85,247,0.25),transparent)",
                }}
              />
            </div>
            <div className="flex gap-3 sm:gap-4 overflow-x-scroll no-scrollbar pb-2">
              {cast.map((person) => (
                <div
                  key={person.id}
                  className="flex-shrink-0 text-center w-14 sm:w-20"
                >
                  <img
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mx-auto mb-1.5 sm:mb-2"
                    style={{ border: "2px solid rgba(168,85,247,0.3)" }}
                    src={
                      person.profile_path
                        ? IMG_CDN_URL + person.profile_path
                        : "https://via.placeholder.com/64x64?text=?"
                    }
                    alt={person.name}
                  />
                  <p
                    className="text-xs truncate"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {person.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <h2 className="text-sm sm:text-base font-black tracking-wider">
                Similar Movies
              </h2>
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(to right,rgba(168,85,247,0.25),transparent)",
                }}
              />
            </div>
            <div className="flex gap-2 sm:gap-3 overflow-x-scroll no-scrollbar py-3 sm:py-4">
              {similar.map((m) => (
                <MovieCard
                  key={m.id}
                  posterPath={m.poster_path}
                  movieId={m.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
