import React from 'react'
import { IMG_CDN_URL } from '../utils/constansts'

const MovieCard = ({posterPath}) => {
  return (
    <div className="w-56 rounded-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:z-20 hover:shadow-2xl">
      <img className="rounded-xl" src={IMG_CDN_URL + posterPath} alt="Image" />
    </div>
  );
}

export default MovieCard