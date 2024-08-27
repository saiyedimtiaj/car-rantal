import { baseApi } from "@/redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["booking"],
    }),
    getMyBookings: builder.query({
      query: () => ({
        url: "/bookings/my-bookings",
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetAllBookingsQuery,
} = bookingApi;
