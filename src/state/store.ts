import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./slices/errors";
import citiesSlice from "./slices/favorite-cities";
import selectedCitySlice from "./slices/selected-city";
import selectedCityAirPollutionSlice from "./slices/air-pollution";
import authSlice from "./slices/auth-state";
import favoriteCitiesDb from "./slices/favorite-cities-db";

export const store = configureStore({
  reducer: {
    cities: citiesSlice.reducer,
    selectedCity: selectedCitySlice.reducer,
    errorMessage: errorSlice.reducer,
    airPollution: selectedCityAirPollutionSlice.reducer,
    auth: authSlice,
    citiesDb: favoriteCitiesDb,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
