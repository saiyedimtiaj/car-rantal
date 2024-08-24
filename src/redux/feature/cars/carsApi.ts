import { baseApi } from "@/redux/api/baseApi";

const carsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCars: builder.query({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
    }),
  }),
});

export const { useAllCarsQuery } = carsApi;
