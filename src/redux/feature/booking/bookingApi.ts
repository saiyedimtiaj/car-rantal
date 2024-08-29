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
    approveBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/booking-approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["booking", "car"],
    }),
    rejectBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/booking-reject/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["booking"],
    }),
    updateBooking: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/bookings/update/${id}`,
        body: payload,
        method: "PUT",
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useGetAllBookingsQuery,
  useApproveBookingMutation,
  useRejectBookingMutation,
  useUpdateBookingMutation,
} = bookingApi;
