import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import language from "../utils/languageConstansts";
import Groq from "groq-sdk";
import { API_OPTIONS } from "../utils/constansts";
import { addGptMovieResult } from "../redux/slices/gptSlice";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const languageKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-IN&page=1&region=IN",
      API_OPTIONS,
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchs = async () => {
    if (!searchText.current.value.trim()) return;
    setLoading(true);
    try {
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query: " +
        searchText.current.value +
        ". Only give me names of 5 movies, comma separated. Example: Dhurandhar, Project Hail Mary, Toxic";

      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "llama-3.3-70b-versatile",
      });

      const aiMovies = chatCompletion.choices?.[0].message?.content
        .split(",")
        .map((m) => m.trim());

      const promiseArray = aiMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ movieNames: aiMovies, movieResults: tmdbResults }),
      );
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center pt-24 sm:pt-36 px-4 sm:px-8">
      <div className="w-full max-w-2xl relative">
        <div
          className="absolute top-0 left-4 sm:left-8 right-4 sm:right-8 h-px"
          style={{
            background:
              "linear-gradient(to right,transparent,rgba(168,85,247,0.5),transparent)",
          }}
        />
        <div
          className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl"
          style={{
            background: "rgba(168,85,247,0.06)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(168,85,247,0.15)",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "16px" }}>
            ✦
          </span>
          <input
            ref={searchText}
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-xs sm:text-sm min-w-0"
            type="text"
            placeholder={language[languageKey].gptPlaceHolder}
          />
          <button
            onClick={handleGptSearchs}
            disabled={loading}
            className="flex-shrink-0 px-4 sm:px-6 py-2 rounded-xl text-xs font-black tracking-wider text-white cursor-pointer disabled:opacity-50"
            style={{ background: "linear-gradient(135deg,#7c3aed,#fbbf24)" }}
          >
            {loading ? "..." : language[languageKey].search}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GptSearchBar;
