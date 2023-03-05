// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.openweathermap.org/geo/1.0/",
  }),
  endpoints: (builder) => ({
    getCityByName: builder.query<
      Promise<any>,
      { debounceSearchTerm?: string; apiKey: string }
    >({
      query: ({ debounceSearchTerm, apiKey }) =>
        `direct?q=${debounceSearchTerm}&limit=5&appid=${apiKey}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCityByNameQuery } = cityApi;
