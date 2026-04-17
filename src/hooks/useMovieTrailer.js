import { API_OPTIONS } from "../utils/constansts";
import { addTrailerVideo } from "../redux/slices/moviesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return;

    let isCurrent = true; 

    const getMovieVideos = async () => {
      dispatch(addTrailerVideo(null)); 

      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS,
      );

      const json = await data.json();

      if (!isCurrent) return; 

      const filterData = json.results.filter(
        (video) => video.type === "Trailer" && video.site === "YouTube",
      );

      const trailer = filterData.length ? filterData[0] : null;

      dispatch(addTrailerVideo(trailer));
    };

    getMovieVideos();

    return () => {
      isCurrent = false;
    };
  }, [movieId, dispatch]);
};

export default useMovieTrailer