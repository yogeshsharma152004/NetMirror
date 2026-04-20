import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../utils/firebase"; 
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
  setWatchlist,
} from "../redux/slices/watchlistSlice";

const useWatchlist = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector((store) => store.watchlist.movies);

  const loadWatchlist = async () => {
    const user = auth.currentUser; 
    if (!user) return;
    const snapshot = await getDocs(
      collection(db, "users", user.uid, "watchlist"),
    );
    const movies = snapshot.docs.map((doc) => doc.data());
    dispatch(setWatchlist(movies));
  };

  const addMovie = async (movie) => {
    const user = auth.currentUser; 
    if (!user) return;
    const movieData = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    };
    await setDoc(
      doc(db, "users", user.uid, "watchlist", String(movie.id)),
      movieData,
    );
    dispatch(addToWatchlist(movieData));
  };

  const removeMovie = async (movieId) => {
    const user = auth.currentUser; 
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "watchlist", String(movieId)));
    dispatch(removeFromWatchlist(movieId));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((m) => m.id === movieId);
  };

  return { loadWatchlist, addMovie, removeMovie, isInWatchlist };
};

export default useWatchlist;
