import {  useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';


const VideoBackground = ({movieId}) => {

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

   useMovieTrailer(movieId)

 return (
   <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-x-hidden">
     <iframe
       className="absolute top-1/2 left-1/2 w-[130vw] h-[135vh] -translate-x-1/2 -translate-y-1/2"
       src={
         "https://www.youtube.com/embed/" +
         trailerVideo?.key +
         "?autoplay=1&mute=1&controls=0&loop=1&playlist=" +
         trailerVideo?.key
       }
       title="YouTube video player"
       allow="autoplay; encrypted-media"
     ></iframe>
   </div>
 );
}

export default VideoBackground