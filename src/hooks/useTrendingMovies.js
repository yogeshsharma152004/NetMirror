import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constansts";
import { addTrendingMovies } from "../redux/slices/moviesSlice";

const useTrendingMovies = () => {
  const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?region=IN",
      API_OPTIONS,
    );

    const json = await data.json();
    dispatch(addTrendingMovies(json.results));
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);
};

export default useTrendingMovies;
