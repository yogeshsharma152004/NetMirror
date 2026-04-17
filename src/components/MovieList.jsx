import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title , movies}) => {
    if (!movies) return null;

   
  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold py-3 px-3">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar scroll-smooth  ">
        <div className="flex gap-6 py-4 px-3 relative ">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList