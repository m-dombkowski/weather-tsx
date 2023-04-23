import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CityForecastInterface } from "..";

// Define a type for the slice state
interface SelectedCityState {
  selectedCity: CityForecastInterface | undefined;
}

// Define the initial state using that type
const initialState: SelectedCityState = {
  selectedCity: undefined,
};

export const selectedCitySlice = createSlice({
  name: "selectedCity",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedCity: (
      state,
      action: PayloadAction<CityForecastInterface | undefined>
    ) => {
      let selectedCityData = action.payload;
      state.selectedCity = selectedCityData;
    },
    setSelectedCityName: (state, action: PayloadAction<string>) => {
      let properCityName = action.payload;
      if (state.selectedCity) {
        console.log(state.selectedCity);
        state.selectedCity.city.name = properCityName;
      }
    },
  },
});

export const { setSelectedCity, setSelectedCityName } =
  selectedCitySlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default selectedCitySlice;
