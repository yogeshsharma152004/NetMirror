import React from 'react'
import { FaPlay } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
const VideoTitle = ({title, overview}) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end pb-40 px-6 md:px-24 text-white bg-gradient-to-r from-black ">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 w-1/2">{overview}</p>

      <div className="flex gap-5">
        <button className="bg-white text-black flex items-center cursor-pointer gap-3 py-3 px-8 text-xl font-bold rounded-lg ">
          <FaPlay /> Play
        </button>
        <button className="bg-[#676666a1] text-white flex cursor-pointer items-center gap-3 py-3 px-8 text-xl font-bold rounded-lg">
          <FaInfo /> More Info
        </button>
      </div>
    </div>
  );
}

export default VideoTitle