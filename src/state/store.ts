import { configureStore } from "@reduxjs/toolkit";
import citiesSlice from "./slices/favorite-cities";
import selectedCitySlice from "./slices/selected-city";
// ...

export const store = configureStore({
  reducer: {
    cities: citiesSlice.reducer,
    selectedCity: selectedCitySlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
