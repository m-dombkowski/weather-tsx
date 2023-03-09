import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface CounterState {
  favoriteCities:
    | [
        {
          coord: {
            lon: number;
            lat: number;
          };
          weather: [
            {
              id: number;
              main: string;
              description: string;
              icon: string;
            }
          ];
          base: string;
          main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
          };
          visibility: number;
          wind: {
            speed: number;
            deg: number;
          };
          clouds: {
            all: number;
          };
          dt: number;
          sys: {
            type: number;
            id: number;
            country: string;
            sunrise: number;
            sunset: number;
          };
          timezone: number;
          id: number;
          name: string;
          cod: number;
        }
      ]
    | [];
}

// Define the initial state using that type
const initialState: CounterState = {
  favoriteCities: [],
};

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToFavorites: (state) => {
      //   state.value += 1;
    },
    removeFromFavorites: (state, action) => {
      state.favoriteCities.filter((city: any) => city.id !== action.payload.id);
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      //   state.value += action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, incrementByAmount } =
  counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
