import { baseApi } from "@/redux/api/baseApi";

const carsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCars: builder.query({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
    }),
    getSingleCar: builder.query({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
    }),
    createCar: builder.mutation({
      query: (data) => ({
        url: "/cars",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useAllCarsQuery, useCreateCarMutation, useGetSingleCarQuery } =
  carsApi;
