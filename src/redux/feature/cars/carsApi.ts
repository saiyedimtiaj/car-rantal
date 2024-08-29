import { baseApi } from "@/redux/api/baseApi";

// Helper function to convert an object to a query string
const createQueryString = (params: Record<string, string | undefined>) => {
  // Filter out undefined values from the params object
  const filteredParams: Record<string, string> = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined) as [
      string,
      string
    ][]
  );

  // Convert the filtered object to a query string
  const queryString = new URLSearchParams(filteredParams).toString();
  return queryString ? `?${queryString}` : "";
};

const carsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCars: builder.query({
      query: (params = {}) => ({
        url: `/cars${createQueryString(params)}`,
        method: "GET",
      }),
      providesTags: ["car"],
    }),
    getSingleCar: builder.query({
      query: (id) => ({
        url: `/cars/cars/${id}`,
        method: "GET",
      }),
      providesTags: ["car"],
    }),
    createCar: builder.mutation({
      query: (data) => ({
        url: "/cars",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["car"],
    }),
    manageAllCars: builder.query({
      query: () => ({
        url: `/cars/manage-cars`,
        method: "GET",
      }),
      providesTags: ["car"],
    }),
    updateCar: builder.mutation({
      query: ({ id, carInfo }) => {
        return {
          url: `/cars/${id}`,
          body: carInfo,
          method: "PATCH",
        };
      },
      invalidatesTags: ["car"],
    }),
    returnCarByUser: builder.mutation({
      query: (payload) => {
        return {
          url: `/cars/return`,
          body: payload,
          method: "PUT",
        };
      },
      invalidatesTags: ["car"],
    }),
    carBack: builder.mutation({
      query: (id) => {
        return {
          url: `/cars/car-back/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["car"],
    }),
    deleteCar: builder.mutation({
      query: (id) => {
        return {
          url: `/cars/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["car"],
    }),
  }),
});

export const {
  useAllCarsQuery,
  useCreateCarMutation,
  useGetSingleCarQuery,
  useManageAllCarsQuery,
  useUpdateCarMutation,
  useReturnCarByUserMutation,
  useCarBackMutation,
  useDeleteCarMutation,
} = carsApi;
