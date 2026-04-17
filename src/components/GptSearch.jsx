import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import BackgroundImg from "../assets/background.jpg"
const GptSearch = () => {
  return (
    <div className=" relative w-full min-h-screen text-white">
      <img
        src={BackgroundImg}
        alt="bg"
        className="absolute w-full h-full object-cover "
      />

      <div className="absolute w-full h-full bg-black/70"></div>
      <div className="relative z-10">
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </div>
  );
}

export default GptSearch