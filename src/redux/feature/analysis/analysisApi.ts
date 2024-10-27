import { baseApi } from "@/redux/api/baseApi";

const analysisApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "/analysis/dashboard",
        method: "GET",
      }),
    }),
    getDashboardChart: builder.query({
      query: () => ({
        url: "/analysis/analysis",
        method: "GET",
      }),
    }),
    getRecentBooking: builder.query({
      query: () => ({
        url: "/analysis/recent-book",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetDashboardChartQuery,
  useGetRecentBookingQuery,
} = analysisApi;
