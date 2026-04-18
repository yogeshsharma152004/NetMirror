import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import HeroSkeleton from "./HeroSkeleton";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const [mainMovie, setMainMovie] = useState(null);

  useEffect(() => {
    if (!movies) return;
    const randomIndex = Math.floor(Math.random() * movies.length);
    setMainMovie(movies[randomIndex]);
  }, [movies]);

  if (!mainMovie) return <HeroSkeleton />;

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="w-full h-screen relative">
      <VideoBackground movieId={id} />
      {trailerVideo && (
        <VideoTitle title={original_title} overview={overview} />
      )}
    </div>
  );
};

export default MainContainer;
