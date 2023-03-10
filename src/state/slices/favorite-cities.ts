import { createSlice, current } from "@reduxjs/toolkit";
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
    | []
    | any;
}

interface PayloadInterface {
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

// Define the initial state using that type
const initialState: CounterState = {
  favoriteCities: [],
};

export const citiesSlice = createSlice({
  name: "cities",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToFavorites: (
      state: CounterState,
      action: PayloadAction<PayloadInterface>
    ) => {
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
    removeFromFavorites: (state, action) => {
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
