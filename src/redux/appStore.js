import userReducer  from "./slices/userSlice";
import movieReducer from "./slices/moviesSlice"
import gptReducer from "./slices/gptSlice"
import configReducer from "./slices/configSlice"
import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./slices/watchlistSlice"
const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    gpt: gptReducer,
    config: configReducer,
    watchlist: watchlistReducer,
  },
});

export default appStore