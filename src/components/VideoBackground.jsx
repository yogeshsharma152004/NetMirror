import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useState, useEffect } from "react";

const VideoBackground = ({ movieId, backdropPath }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useMovieTrailer(movieId);

 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!trailerVideo && !backdropPath) return null;

  // phone => image

  if (isMobile) {
    return (
      <div className="w-full h-full absolute inset-0 ">
        <img
          className="w-full h-full object-cover object-center"
          src={`https://image.tmdb.org/t/p/original${backdropPath}`}
          alt="backdrop"
        />
        
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top,#07050f 0%,rgba(7,5,15,0.3) 60%,transparent 100%)",
          }}
        />
      </div>
    );
  }

  //  Desktop => Trailer video

  if (!trailerVideo) return null;

  return (
    <div className="w-full h-screen overflow-hidden relative">
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
      />
    </div>
  );
};

export default VideoBackground;
