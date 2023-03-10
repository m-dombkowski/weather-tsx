import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CityInterface } from "..";

// Define a type for the slice state
interface CounterState {
  favoriteCities: CityInterface[] | [] | any;
}

// Define the initial state using that type
const initialState: CounterState = {
  favoriteCities: [],
};

export const citiesSlice = createSlice({
  name: "cities",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<CityInterface>) => {
      if (state.favoriteCities.length > 0) {
        const isAlreadyInFavorites = state.favoriteCities.find(
          (city: any) => city.id === action.payload.id
        );
        if (!isAlreadyInFavorites) {
          state.favoriteCities.push(action.payload);
        }
        return;
      } else {
        state.favoriteCities.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<CityInterface>) => {
      let filtered = state.favoriteCities.filter(
        (city: any) => city.id !== action.payload.id
      );
      state.favoriteCities = filtered;
    },
  },
});

export const { addToFavorites, removeFromFavorites } = citiesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default citiesSlice;
