import { API_OPTIONS } from "../utils/constansts";
import { addTrailerVideo } from "../redux/slices/moviesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
    
      const dispatch = useDispatch()
    
      if (!movieId) return;
    
        const getMovieVideos = async () => {
          if (!movieId) return;

          const data = await fetch(
            "https://api.themoviedb.org/3/movie/" +
              movieId +
              "/videos?language=en-US",
            API_OPTIONS,
          );

          const json = await data.json();

          const filterData = json.results.filter(
            (video) => video.type === "Trailer" && video.site === "YouTube",
          );

          if (filterData.length === 0) {
            dispatch(addTrailerVideo(null)); 
            return;
          }

          const trailer = filterData[0];
          dispatch(addTrailerVideo(trailer));
        };
    
       useEffect(() => {
         if (!movieId) return;
         getMovieVideos();
       }, [movieId]);
}

export default useMovieTrailer