import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CityForecastInterface } from "..";

// Define a type/interface for the slice state
interface FavCitiesState {
  favoriteCities: CityForecastInterface[] | [] | undefined | never;
}

// Define the initial state using that type
const initialState: FavCitiesState = {
  favoriteCities: [],
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addToFavorites: (
      state,
      action: PayloadAction<CityForecastInterface | undefined>
    ) => {
      if (state.favoriteCities && state.favoriteCities.length > 0) {
        const isAlreadyInFavorites: object | undefined =
          state.favoriteCities.find(
            (selectedCity: CityForecastInterface) =>
              selectedCity.city.id === action.payload?.city.id
          );
        if (!isAlreadyInFavorites) {
          state.favoriteCities.push(action.payload as never);
        }
        return;
      } else if (state.favoriteCities) {
        state.favoriteCities.push(action.payload as never);
      }
    },
    removeFromFavorites: (
      state,
      action: PayloadAction<CityForecastInterface | undefined>
    ) => {
      if (state.favoriteCities) {
        const filtered = state.favoriteCities.filter(
          (city: CityForecastInterface) =>
            city.city.id !== action.payload?.city.id
        );
        state.favoriteCities = filtered;
      }
    },
    emptyFavorites: (state) => {
      state.favoriteCities = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, emptyFavorites } =
  citiesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default citiesSlice;
