import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearGptMovieResult } from "../redux/slices/gptSlice";

const GptSearch = () => {
   const dispatch = useDispatch();

   useEffect(() => {
     dispatch(clearGptMovieResult())
   }, []);
  return (
    <div
      className="relative w-full min-h-screen text-white pt-4"
      style={{ background: "#07050f" }}
    >
      
      <div
        className="orb"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle,rgba(120,60,255,0.2),transparent 70%)",
          top: "0px",
          left: "20%",
        }}
      />
      <div
        className="orb"
        style={{
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle,rgba(255,200,50,0.1),transparent 70%)",
          top: "100px",
          right: "10%",
        }}
      />
      <div className="relative z-10">
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </div>
  );
};

export default GptSearch;