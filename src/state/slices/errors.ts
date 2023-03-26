import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  errorMessage: string;
}

const initialState: ErrorState = {
  errorMessage: "",
};

export const errorSlice = createSlice({
  name: "errorState",

  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      let errorMessage = action.payload;
      state.errorMessage = errorMessage;
    },
  },
});

export const { setError } = errorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default errorSlice;
