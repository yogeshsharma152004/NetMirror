import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constansts";

const useMovieDetails = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const fetchAll = async () => {
      setLoading(true);
      try {
       
        const [detailRes, creditsRes, similarRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-IN`,
            API_OPTIONS,
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-IN`,
            API_OPTIONS,
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-IN&page=1&region=IN`,
            API_OPTIONS,
          ),
        ]);

        const [detail, credits, similarData] = await Promise.all([
          detailRes.json(),
          creditsRes.json(),
          similarRes.json(),
        ]);

        setMovie(detail);
        setCast(credits.cast?.slice(0, 10) || []);
        setSimilar(similarData.results?.slice(0, 10) || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [movieId]);

  return { movie, cast, similar, loading };
};

export default useMovieDetails;
