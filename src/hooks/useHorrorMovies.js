import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constansts";
import { addHorrorMovies } from "../redux/slices/moviesSlice";
import { useEffect } from "react";

const useHorrorMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getHorrorMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?with_genres=27&language=en-IN&page=1&region=IN",
        API_OPTIONS,
      );
      const json = await data.json();
      dispatch(addHorrorMovies(json.results));
    };
    getHorrorMovies();
  }, []);
};

export default useHorrorMovies;
