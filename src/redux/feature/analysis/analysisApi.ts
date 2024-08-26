import { baseApi } from "@/redux/api/baseApi";

const analysisApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "/analysis/dashboard",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery } = analysisApi;
