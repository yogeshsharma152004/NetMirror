import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import HeroSkeleton from "./HeroSkeleton";
import { addTrailerVideo } from "../redux/slices/moviesSlice";
import { API_OPTIONS } from "../utils/constansts";

const MainContainer = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const [mainMovie, setMainMovie] = useState(null);
  const [triedMovies, setTriedMovies] = useState([]); 

  //  choose movie and check trailer

  const findMovieWithTrailer = async (moviesList, alreadyTried = []) => {
    if (!moviesList) return;

    // random movies from untried movies
    
    const untried = moviesList.filter((m) => !alreadyTried.includes(m.id));
    if (untried.length === 0) return; 

    const randomIndex = Math.floor(Math.random() * untried.length);
    const movie = untried[randomIndex];

    // Trailer check 

    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
      API_OPTIONS,
    );
    const json = await data.json();

    const trailers = json.results.filter(
      (v) => v.type === "Trailer" && v.site === "YouTube",
    );
    const teasers = json.results.filter(
      (v) => v.type === "Teaser" && v.site === "YouTube",
    );
    const anyVideo = json.results.filter((v) => v.site === "YouTube");

    const trailer = trailers.length
      ? trailers[0]
      : teasers.length
        ? teasers[0]
        : anyVideo.length
          ? anyVideo[0]
          : null;

    if (trailer) {

      // Trailer mila yeh movie dikhao
      setMainMovie(movie);
      dispatch(addTrailerVideo(trailer));
    } else {
      //  Trailer nahi mila  dusri movie try karo
      findMovieWithTrailer(moviesList, [...alreadyTried, movie.id]);
    }
  };

  useEffect(() => {
    if (!movies) return;
    findMovieWithTrailer(movies, []);
  }, [movies]);

  if (!mainMovie) return <HeroSkeleton />;

  const { original_title, overview, id  , backdrop_path} = mainMovie;

  return (
    <div className="w-full h-[60vh] md:h-screen relative ">
      <VideoBackground movieId={id} backdropPath={backdrop_path} />
      {trailerVideo && (
        <VideoTitle title={original_title} overview={overview} />
      )}
    </div>
  );
};

export default MainContainer;
