import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CityInterface } from "..";

// Define a type/interface for the slice state
interface FavCitiesState {
  favoriteCities: CityInterface[] | [] | undefined | never;
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
      action: PayloadAction<CityInterface | undefined>
    ) => {
      if (state.favoriteCities && state.favoriteCities.length > 0) {
        const isAlreadyInFavorites: object | undefined =
          state.favoriteCities.find(
            (selectedCity: CityInterface) =>
              selectedCity.id === action.payload?.id
          );
        if (!isAlreadyInFavorites && action.payload) {
          state.favoriteCities.push(action.payload as never);
          localStorage.setItem(
            action.payload.id.toString(),
            JSON.stringify(action.payload)
          );
          console.log(current(state.favoriteCities));
        }
        return;
      } else if (state.favoriteCities && action.payload) {
        state.favoriteCities.push(action.payload as never);
        // localStorage.setItem(
        //   action.payload.id.toString(),
        //   JSON.stringify(action.payload)
        // );
      }
    },
    removeFromFavorites: (
      state,
      action: PayloadAction<CityInterface | undefined>
    ) => {
      if (state.favoriteCities && action.payload) {
        const filtered = state.favoriteCities.filter(
          (city: CityInterface) => city.id !== action.payload?.id
        );
        state.favoriteCities = filtered;
        // localStorage.removeItem(action.payload.id.toString());
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
