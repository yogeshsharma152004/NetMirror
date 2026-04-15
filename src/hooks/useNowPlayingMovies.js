import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constansts";
import { addNowPlayingMovies } from "../redux/slices/moviesSlice";
import { useEffect } from "react";


const useNowPlayingMovies = () => {
      const dispatch = useDispatch();

      const getNowPlaynigMovies = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?page=1",
          API_OPTIONS,
        );

        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));
        console.log(json.results)
      };

      useEffect(() => {
        getNowPlaynigMovies();
      });
}

export default useNowPlayingMovies;