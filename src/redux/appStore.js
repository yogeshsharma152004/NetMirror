import userReducer  from "./slices/userSlice";
import movieReducer from "./slices/moviesSlice"
import gptReducer from "./slices/gptSlice"

import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./slices/watchlistSlice"
const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    gpt: gptReducer,
    watchlist: watchlistReducer,
  },
});

export default appStore