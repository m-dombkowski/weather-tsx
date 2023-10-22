import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CityForecastInterface } from "..";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const getUserCitiesFromDb = createAsyncThunk(
  "citiesDB/getCities",
  async (ids: { city_id: number }[]) => {
    try {
      const call = await axios(
        `${baseURL}/data/2.5/group?id=${ids}&appid=${apiKey}`
      );

      return call.data.list;
    } catch (err: unknown) {
      console.error(err);
    }
  }
);

interface FavCitiesFromDbInterface {
  favoriteCities: CityForecastInterface[] | [] | undefined | never;
}

const initialState: FavCitiesFromDbInterface = {
  favoriteCities: [],
};

const favCitiesFromDbSlice = createSlice({
  name: "citiesDb",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCitiesFromDb.pending, () => {})
      .addCase(getUserCitiesFromDb.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.favoriteCities = action.payload;
          console.log(state.favoriteCities);
        }
      })
      .addCase(getUserCitiesFromDb.rejected, () => {});
  },
});

export default favCitiesFromDbSlice.reducer;
