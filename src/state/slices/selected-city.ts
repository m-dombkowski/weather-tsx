import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CityInterface } from "..";

// Define a type for the slice state
interface SelectedCityState {
  selectedCity: CityInterface | any;
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
    setSelectedCity: (state, action: PayloadAction<CityInterface>) => {
      let selectedCityData = action.payload;
      state.selectedCity = selectedCityData;
    },
  },
});

export const { setSelectedCity } = selectedCitySlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default selectedCitySlice;
