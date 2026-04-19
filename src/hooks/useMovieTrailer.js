

import { API_OPTIONS } from "../utils/constansts";
import { addTrailerVideo } from "../redux/slices/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useEffect(() => {
    if (!movieId) return;
    if (trailerVideo) return; // ✅ Already hai toh skip

    const getMovieVideos = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS,
      );
      const json = await data.json();

      // ✅ Priority: Trailer > Teaser > Any YouTube video
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

      dispatch(addTrailerVideo(trailer));
    };

    getMovieVideos();
  }, [movieId]);
};

export default useMovieTrailer;

