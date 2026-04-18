
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchlist,
  setWatchlist,
} from "../redux/slices/watchlistSlice";

const useWatchlist = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const watchlist = useSelector((store) => store.watchlist.movies);

  // ✅ Watchlist Firebase se load karo
  const loadWatchlist = async () => {
    if (!user) return;
    const snapshot = await getDocs(
      collection(db, "users", user.uid, "watchlist"),
    );
    const movies = snapshot.docs.map((doc) => doc.data());
    dispatch(setWatchlist(movies));
  };

  // ✅ Movie add karo
  const addMovie = async (movie) => {
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

  // ✅ Movie remove karo
  const removeMovie = async (movieId) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "watchlist", String(movieId)));
    dispatch(removeFromWatchlist(movieId));
  };

  // ✅ Check karo movie watchlist mein hai ya nahi
  const isInWatchlist = (movieId) => {
    return watchlist.some((m) => m.id === movieId);
  };

  return { loadWatchlist, addMovie, removeMovie, isInWatchlist };
};

export default useWatchlist;
