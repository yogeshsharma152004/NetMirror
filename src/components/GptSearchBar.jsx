import React from 'react'

const GptSearchBar = () => {
  return (
    <div className="flex justify-center pt-36">
      <form className="flex items-center bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-gray-500 shadow-lg">
        <input
          className="bg-transparent w-[300px]  px-4 text-white placeholder-gray-300 focus:outline-none "
          type="text"
          placeholder="What would you like to watch today?"
        />

        <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full text-white font-semibold cursor-pointer">
          Search
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar