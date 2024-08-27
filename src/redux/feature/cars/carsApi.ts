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
      query: (params) => ({
        url: `/cars${createQueryString(params)}`,
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
    manageAllCars: builder.query({
      query: () => ({
        url: `/cars/manage-cars`,
        method: "GET",
      }),
      providesTags: ["car"],
    }),
  }),
});

export const {
  useAllCarsQuery,
  useCreateCarMutation,
  useGetSingleCarQuery,
  useManageAllCarsQuery,
} = carsApi;
