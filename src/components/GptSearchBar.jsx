import React, { useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";


import Groq from "groq-sdk";
import { API_OPTIONS } from "../utils/constansts";
import {
  addGptMovieResult,
  clearGptMovieResult,
} from "../redux/slices/gptSlice";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});


const GENRE_MAP = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  "science fiction": 878,
  "sci-fi": 878,
  scifi: 878,
  thriller: 53,
  war: 10752,
  western: 37,
  superhero: 28,
  psychological: 9648,
};


const LATEST_KEYWORDS = [
  "latest",
  "new",
  "recent",
  "newest",
  "just released",
  "now playing",
  "current",
  "this year",
  "this week",
  "today",
  "2024",
  "2025",
  "2026",
  "Hindi",
  "nayi",
  "naye",
  "abhi",
  "aaj",
  "iss saal",
  "is saal",
  "naya",
];


const INDIAN_KEYWORDS = [
  "bollywood",
  "hindi",
  "indian",
  "desi",
  "hindi movie",
  "tollywood",
  "south indian",
  "tamil",
  "telugu",
  "malayalam",
];

const GptSearchBar = () => {
  const dispatch = useDispatch();
 
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);

  
  const fetchTMDB = async (url, limit = 20) => {
    const results = [];
    try {
      const r1 = await fetch(`${url}&page=1`, API_OPTIONS);
      const j1 = await r1.json();
      results.push(...(j1.results || []));

      if (results.length < limit && (j1.total_pages || 1) > 1) {
        const r2 = await fetch(`${url}&page=2`, API_OPTIONS);
        const j2 = await r2.json();
        results.push(...(j2.results || []));
      }
    } catch (e) {
      console.error("TMDB fetch error:", e);
    }

    return results
      .filter((m) => m.poster_path && m.vote_count > 5)
      .slice(0, limit);
  };

  
  const searchOneTMDB = async (title) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title.trim())}&include_adult=false&language=en-IN&page=1`,
        API_OPTIONS,
      );
      const json = await res.json();
      
      return (json.results || []).find((m) => m.poster_path) || null;
    } catch {
      return null;
    }
  };

 
const handleSearch = useCallback(async () => {
  const queryText = searchText.current?.value?.trim();
  if (!queryText || loading) return;

  setLoading(true);
  dispatch(clearGptMovieResult());

  const q = queryText.toLowerCase();

  const isLatest = LATEST_KEYWORDS.some((k) => q.includes(k));
  const isIndian = INDIAN_KEYWORDS.some((k) => q.includes(k)); 
  const genreEntry = Object.entries(GENRE_MAP).find(([g]) => q.includes(g));
  const genreId = genreEntry?.[1];

  try {
    let tmdbMovies = [];
    let finalMovies = [];

    //  LATEST SEARCH

    if (isLatest) {
      let urls = [];

      if (isIndian) {
        urls = [
          `https://api.themoviedb.org/3/discover/movie?language=en-IN&sort_by=release_date.desc&with_original_language=hi&vote_count.gte=20`,
          `https://api.themoviedb.org/3/discover/movie?language=en-IN&sort_by=release_date.desc&with_original_language=ta&vote_count.gte=20`,
        ];
      } else {
        urls = [
          `https://api.themoviedb.org/3/movie/now_playing?language=en-IN`,
          `https://api.themoviedb.org/3/movie/popular?language=en-IN`,
        ];
      }

      const allData = await Promise.all(urls.map((url) => fetchTMDB(url, 10)));

      tmdbMovies = allData
        .flat()
        .filter(Boolean)
        .filter((m, i, arr) => arr.findIndex((x) => x.id === m.id) === i)
        .sort(() => 0.5 - Math.random())
        .slice(0, 15);
    }

    // GENRE SEARCH

    else if (genreId) {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`,
        API_OPTIONS,
      );
      const json = await data.json();
      tmdbMovies = json.results.slice(0, 15);
    }

    // AI SEARCH 
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Suggest 20 best movies for "${queryText}". Mix latest + classic. Only comma separated names.`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const rawText = completion.choices?.[0]?.message?.content || "";

    const aiTitles = rawText
      .split(",")
      .map((t) => t.replace(/[0-9.\n\r]/g, "").trim())
      .filter((t) => t.length > 1)
      .slice(0, 20);

    const aiFetched = await Promise.all(
      aiTitles.map(async (title) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}`,
          API_OPTIONS,
        );
        const json = await res.json();
        return json.results?.[0];
      }),
    );

    finalMovies = [...tmdbMovies, ...aiFetched]
      .filter(Boolean)
      .filter((m, i, arr) => arr.findIndex((x) => x.id === m.id) === i)
      .slice(0, 20);

    dispatch(
      addGptMovieResult({
        movieNames: ["Results " + Date.now()],
        movieResults: [finalMovies.map((m) => ({ ...m }))],
      }),
    );
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}, [loading, dispatch]);

  return (
    <div className="flex justify-center pt-24 md:pt-36 px-4 md:px-8">
      <div className="w-full max-w-2xl relative">
        <div
          className="absolute -top-px left-8 right-8 h-px"
          style={{
            background:
              "linear-gradient(to right,transparent,rgba(168,85,247,0.5),transparent)",
          }}
        />

        <div
          className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-2xl"
          style={{
            background: "rgba(168,85,247,0.06)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(168,85,247,0.15)",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
            ✦
          </span>
          <input
            ref={searchText}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-xs md:text-sm min-w-0"
            type="text"
            placeholder="What would you like to watch today?"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex-shrink-0 px-4 md:px-6 py-2 rounded-xl text-xs font-black tracking-wider text-white cursor-pointer disabled:opacity-50 whitespace-nowrap transition-opacity duration-200"
            style={{ background: "linear-gradient(135deg,#7c3aed,#fbbf24)" }}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GptSearchBar;
