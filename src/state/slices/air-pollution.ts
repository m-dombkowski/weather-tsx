import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AirPollutionInterface } from "..";

// Define a type for the slice state
interface SelectedCityAirPollution {
  airPollution: AirPollutionInterface | undefined;
}

// Define the initial state using that type
const initialState: SelectedCityAirPollution = {
  airPollution: undefined,
};

export const selectedCityAirPollutionSlice = createSlice({
  name: "selectedCityAirPollution",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedCityAirPollution: (
      state,
      action: PayloadAction<AirPollutionInterface | undefined>
    ) => {
      const data = action.payload;
      state.airPollution = data;
    },
  },
});

export const { setSelectedCityAirPollution } =
  selectedCityAirPollutionSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default selectedCityAirPollutionSlice;
