// hooks/useUpcomingMovies.js
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constansts";
import { addUpcomingMovies } from "../redux/slices/moviesSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUpcomingMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-IN&page=1&region=IN",
        API_OPTIONS,
      );
      const json = await data.json();
      dispatch(addUpcomingMovies(json.results));
    };
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
