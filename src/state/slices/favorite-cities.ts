import { createSlice, current } from "@reduxjs/toolkit";
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
        if (!isAlreadyInFavorites && action.payload) {
          state.favoriteCities.push(action.payload as never);
          localStorage.setItem(
            action.payload.city.id.toString(),
            JSON.stringify(action.payload)
          );
          console.log(current(state.favoriteCities));
        }
        return;
      } else if (state.favoriteCities && action.payload) {
        state.favoriteCities.push(action.payload as never);
        // localStorage.setItem(
        //   action.payload.city.id.toString(),
        //   JSON.stringify(action.payload)
        // );
      }
    },
    removeFromFavorites: (
      state,
      action: PayloadAction<CityForecastInterface | undefined>
    ) => {
      if (state.favoriteCities && action.payload) {
        const filtered = state.favoriteCities.filter(
          (city: CityForecastInterface) =>
            city.city.id !== action.payload?.city.id
        );
        state.favoriteCities = filtered;
        // localStorage.removeItem(action.payload.city.id.toString());
      }
    },
    emptyFavorites: (state) => {
      state.favoriteCities = undefined;
    },
    setFavorites: (state, action) => {
      console.log(action.payload);
      state.favoriteCities = action.payload;
      console.log(state.favoriteCities);
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  emptyFavorites,
  setFavorites,
} = citiesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default citiesSlice;
